const userService = require('../services/user.service');

/**
 * new registration call from controller
 * @param  {} req
 * @param  {} res
 */
exports.user_create = function(req, res){
    userService.user_create(req, res);
}

/**
 * user login controller call
 * @param  {} req
 * @param  {} res
 */
exports.userlogin  = function(req, res){
    userService.user_login(req, res);
}