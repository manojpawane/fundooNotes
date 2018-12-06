const User = require('../app/models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');


/**
 * New user registration
 * @param  {} req
 * @param  {} res
 */
exports.user_create =async function(req, res){
   

    /// checks if user exist
    var userExist = await User.findOne({
        email:req.body.email
    })

    try {
        /// checks if user exist if not then encrypt the password and add the user into database
        if(!userExist){
            let user = new User(
                {
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                }
            );
            
           await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10), null,async function(err, hash){
                if(err){
                    throw err
                }
                else{
                    user.password = hash
                }
                /// user call to create new user
                let userRegisteredResponse = await User.create(user);
                res.send({status: userRegistered.Response.name + ' ' + 'registered'})
            })
        }
        else{
            res.status(400).send({msg:'The email address you entered is already associated with another account.'})
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
exports.user_login = async function(req, res, next){
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
                if(!userExist.isVerified){
                    return res.status(401).send({type:'not-verified', msg:'Your account has not been verified.'});
                }
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
            else{
                return res.status(401).send({msg:'Invalid email or password.'});
            }
        }
        else{
            return res.status(401).send({msg:'The email address '+ req.body.email + 'is not associated with any account. Double-check your email address and try again.'})
        }    
    } catch (error) {
        res.send(error)
    }
}