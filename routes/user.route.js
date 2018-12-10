const express = require('express');
const router = express.Router();
const cors = require('cors');
const user_controller = require('../controller/user.controller');

router.use(cors());

process.env.SECRET_KEY = 'secret';

/**
 * route to call controller for user registration
 * @param  {} '/create'
 * @param  {} user_controller.user_create
 */
router.post('/create', user_controller.user_create);

/**
 * route for calling login 
 * @param  {} '/login'
 * @param  {} user_controller.userlogin
 */
router.post('/login', user_controller.userlogin);

/**  
 * route for token confirmation
 */
router.post('/confirmation', user_controller.confirmationPost);

/**  
 * route to resend a new confirmation token
 */
router.post('/resend', user_controller.resendTokenPost);

module.exports = router;