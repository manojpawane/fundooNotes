const userService = require('../services/user.service');
var expressValidator = require('express-validator')
const {check ,validationResult, validationErrors } = require('express-validator/check');


/**
 * new registration call from controller
 * @param  {} req
 * @param  {} res
 */
exports.user_create = function(req, res, next){
    try {
    req.assert('name', 'Name cannot be blank.').notEmpty();
    req.assert('email','Email is not valid.').isEmail();
    req.assert('email','Email cannot be blank.').notEmpty();
    req.assert('password','Password must be at least 4 characters long').len(4);
    req.sanitize('email').normalizeEmail({remove_dots:false});

    console.log('Test 1');
    // checks for validation errors
    var errors = req.validationErrors();
    if(errors){
        console.log('Test 2');
        return res.status(400).send(errors);
    }
    else{
        console.log('Test 1');
        userService.user_create(req, res);
    }    
    } catch (error) {
        console.log(error);
        console.log('testing catch block');
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
exports.userlogin  = function(req, res, next){
    req.assert('email','Email is not valid.').isEmail();
    req.assert('email','Email cannot be blank.').notEmpty();
    req.assert('password', 'Password cannot be blank.').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots:false});

    // check for validation errors
    var errors = req.validationErrors();
    if(errors){
        return res.status(400).send(errors);
    }
    else{
        userService.user_login(req, res, next);
    }
    
}

/**  
 * Confirmation of token with link
 */
exports.confirmationPost = function(req, res, next){
    userService.confirmationPost(req, res, next);
}

/**
 * Resending token request if token is expired or user can request
 */
exports.resendTokenPost = function(req, res, next){
    userService.resendTokenPost(req, res, next);
}