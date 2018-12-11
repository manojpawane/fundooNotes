const User = require('../app/models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var eventEmitter = require('../Events/events')
var Token = require('../app/models/token.model')

/**
 * New user registration
 * @param  {} req
 * @param  {} res
 */
exports.user_create = async function (req, res) {
    console.log('Test service 1');
    /// checks if user exist
    var userExist = await User.findOne({
        email: req.body.email
    })

    try {
        /// checks if user exist if not then encrypt the password and add the user into database
        if (!userExist) {
            console.log('Test service 2');
            let user = new User(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
            );

            await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10), null, async function (err, hash) {
                if (err) {
                    throw err
                }
                else {
                    user.password = hash
                }
                console.log('Test service 3');
                /// user call to create new user
                let userRegisteredResponse = await User.create(user);
                var token = await new Token({ _userId: userRegisteredResponse._id, token: crypto.randomBytes(16).toString('hex') });
                await token.save(async function (err) {
                    if (err) {
                        console.log('Test service 4');
                        return res.status(500).send({ msg: err.message });
                    }
                    else{
                        console.log('Test service 12');
                        let subject = 'Account verification Token';
                        let text = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '\n';
                        var resp = await eventEmitter.emit('sendEmail', subject, user, text)
                        console.log('respo:'+resp);
                        res.send(resp);
                    }
                })
            })
        }
        else {
            res.status(400).send({ msg: 'The email address you entered is already associated with another account.' })
        }
    } catch (error) {
        console.log('Inside service catch block');
        console.log(error);
        res.send(error);
    }
}

/**
 * User login business logic
 * @param  {} req
 * @param  {} res
 */
exports.user_login = async function (req, res) {
    try {
        var userExist = await User.findOne(
            {
                email: req.body.email
            }
        )
        /// checks if user exist
        if (userExist) {
            /// if exist just match encrypted password which we get from data with enter password
            if (bcrypt.compareSync(req.body.password, userExist.password)) {
                if (!userExist.isVerified) {
                    return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' });
                }
                const payload = {
                    _id: userExist._id,
                    email: userExist.email,
                    name: userExist.name
                }

                /// jwt token is generated on successful login and send as response
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })

                res.send(token);
            }
            else {
                return res.status(401).send({ msg: 'Invalid email or password.' });
            }
        }
        else {
            return res.status(401).send({ msg: 'The email address ' + req.body.email + 'is not associated with any account. Double-check your email address and try again.' })
        }
    } catch (error) {
        res.send(error)
    }
}


/**
 * POST /confirmation */
 exports.confirmationPost = function(req, res){
     req.assert('email', 'Email is not valid').isEmail();
     req.assert('email','Email cannot be empty.').notEmpty();
     req.assert('token','Token cannot be blank.').notEmpty();
     req.sanitize('email').normalizeEmail({remove_dots:false});

     //Check for validation errors
     var errors = req.validationErrors();
     if(errors){
         return res.status(400).send(errors);
     }

    Token.findOne({token:req.body.token}, function(err, token){
        if(!token){
            return res.status(400).send({type:'not-verified', msg:'We are unable to find valid token, your token may have been expired.'})
        }

        User.findOne({
            email:req.body.email,
            _id:token._userId
        }, function(err, user){
            if(!user){
                return res.status(400).send({msg:'We are unable to find the user for this token'})
            }
            if(user.isVerified){
                return res.status(400).send({type:'already verified',msg:'User is already verified.'})
            }

            user.isVerified = true;
            user.save(function(err){
                if(err){
                    return res.status(500).send({msg:err.message});
                }
                return res.status(200).send("Account has been verified please login.");
            })
        })
    })
 }

 /** 
  * Resend token logic
  */
 exports.resendTokenPost = function(req, res){
     req.assert('email','Email is not verified.').isEmail();
     req.assert('email','Email is not empty.').notEmpty();
     req.sanitize('email').normalizeEmail({remove_dots:false});

     //check for validation error
     var errors = req.validationErrors();
     if(errors){
         return res.status(400).send(errors);
     }
     User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            // Send the email
            else{
                let subject = 'Account verification Token';
                let text = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n';
                var resp = eventEmitter.emit('sendEmail', subject, user, text);
                res.send(resp);
            }
        });
    });
 }
