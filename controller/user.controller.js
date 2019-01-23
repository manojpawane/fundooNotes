const userService = require('../services/user.service');


/**
 * new registration call from controller
 * @param  {} req
 * @param  {} res
 */
exports.user_create = function (req, res, next) {
    try {
        req.assert('name', 'Name cannot be blank.').notEmpty();
        req.assert('email', 'Email is not valid.').isEmail();
        req.assert('email', 'Email cannot be blank.').notEmpty();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.sanitize('email').normalizeEmail({ remove_dots: false });

        // checks for validation errors
        var errors = req.validationErrors();
        if (errors) {
            return res.status(400).send(errors);
        }
        else {
            userService.user_create(req, res);
        }
    } catch (error) {
        res.send(error)
    }
}

/**
 * POST /login
 * Sign with email and password
 * user login controller call
 * @param  {} req
 * @param  {} res
 */
exports.userlogin = function (req, res, next) {
    try {
        req.assert('email', 'Email is not valid.').isEmail();
        req.assert('email', 'Email cannot be blank.').notEmpty();
        req.assert('password', 'Password cannot be blank.').notEmpty();
        req.sanitize('email').normalizeEmail({ remove_dots: false });
        // check for validation errors
        var errors = req.validationErrors();
        if (errors) {
            return res.status(400).send(errors);
        }
        else {
            userService.user_login(req, res, next);
        }
    } catch (error) {
        res.send(error);
    }


}

/**  
 * Confirmation of token with link
 */
exports.confirmationPost = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be empty.').notEmpty();
    req.assert('token', 'Token cannot be blank.').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    //Check for validation errors
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }
    else{
        userService.confirmationPost(req, res, next);
    }
}

exports.confirmtoken = function (req, res, next) {
    userService.confirmtoken(req, res, next);
}

/**
 * Resending token request if token is expired or user can request
 */
exports.resendTokenPost = function (req, res, next) {
    req.assert('email', 'Email is not verified.').isEmail();
    req.assert('email', 'Email is not empty.').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    //check for validation error
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }
    else{
        userService.resendTokenPost(req, res, next);
    }
}

/** 
 * gets the user profile
*/
exports.getUserProfile = function(req, res, next){
    try {
        req.assert('id','Invalid user.').notEmpty();
        let errors = req.validationErrors();
        if(errors){
            res.status(400).send(errors);
        }
        else{
            userService.getUserProfile(req, res, next);
        }        
    } catch (error) {
        throw new Error(error);
    }
}

/** 
 * calls the service to send email to user with link for update the password
*/
exports.forgetPassword = function (req, res, next) {
    try {
        req.assert('email', 'Email is not valid.').isEmail();
        req.assert('email', 'Email cannot be blank.').notEmpty();
        req.sanitize('email').normalizeEmail({ remove_dots: false });
        // check for validation errors
        var errors = req.validationErrors();
        if (errors) {
            return res.status(400).send(errors);
        }
        else {
            userService.forgetPassword(req, res, next);
        }
    } catch (error) {
        res.send(error)
    }
}

/** 
 * updates the new password for forget password
*/
exports.updatePassword = function (req, res, next) {
    try {
        req.assert('password', 'Password cannot be empty').notEmpty();
        req.assert('token', 'Token cannot be empty').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            return res.status(400).send(errors);
        }
        else {
            userService.updatePassword(req, res, next);
        }
    } catch (error) {
        res.send(error)
    }
}