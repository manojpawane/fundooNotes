const User = require('../app/models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');


/**
 * New user registration
 * @param  {} req
 * @param  {} res
 */
exports.user_create =async function(req, res){
    let user = new User(
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
    );

    /// checks if user exist
    var userExist = await User.findOne({
        email:req.body.email
    })

    try {
        /// checks if user exist if not then encrypt the password and add the user into database
        if(!userExist){
           await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10), null,async function(err, hash){
                if(err){
                    throw err
                }
                else{
                    user.password = hash
                }
                /// user call to create new user
                let userRegisteredResponse = await User.create(user);
                res.send({status: userRegisteredResponse.name + ' ' + 'registered'})
            })
        }
        else{
            res.send('User already exists. ');
        }
    } catch (error) {
        res.send(error);
    }
}

/**
 * User login business logic
 * @param  {} req
 * @param  {} res
 */
exports.user_login = async function(req, res){
    try {
        var userExist = await User.findOne(
            {
                email:req.body.email
            }
        )    
        /// checks if user exist
        if(userExist){
            /// if exist just match encrypted password which we get from data with enter password
            if(bcrypt.compareSync(req.body.password, userExist.password)){
                console.log(userExist.password);
                const payload = {
                    _id:userExist._id,
                    email:userExist.email,
                    name:userExist.name
                }

                /// jwt token is generated on successful login and send as response
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn:1440
                })
                
                res.send(token);
            }
        }
        else{
            res.send('User does not exist');
        }    
    } catch (error) {
        res.send(error)
    }
}