const userService = require('../services/user.service');
const { check, validationResult } = require('express-validator/check');
const assert = require('assert');

/**
 * new registration call from controller
 * @param  {} req
 * @param  {} res
 */
exports.user_create = function(req, res, next){
    req.assert('name', 'Name cannot be blank.').notEmpty();
    req.assert('email','Email is not valid.').isEmail();
    req.assert('email','Email cannot be blank.').notEmpty();
    req.assert('password','Password must be at least 4 characters long').len(4);
    req.sanitize('email').normalizeEmail({remove_dots:false});

    // checks for validation errors
    var errors = req.validationErrors();
    if(errors){
        return res.status(400).send(errors);
    }
    else{
        userService.user_create(req, res);
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
        userService.user_login(req, res);
    }
    
}