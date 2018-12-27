const express = require('express');
const cors = require('cors');
const user_controller = require('../controller/user.controller');
expressValidator = require('express-validator');
const router = express.Router();

router.use(cors());
process.env.SECRET_KEY = 'secret';

//router.use(express.bodyParser());
router.use(expressValidator()); 

/**
 * @swagger
 * /create:
 *    post:
 *      description: This should register user
 */
router.post('/create', user_controller.user_create);

/**
 * @swagger
 * /login:
 *    post:
 *      description: This should login user
 */
router.post('/login', user_controller.userlogin);

/**  
 * route for token confirmation
 */
// router.post('/confirmation', user_controller.confirmationPost);

/**
 * Route to check whether token is present
 */
// router.get('/confirmation', user_controller.confirmtoken);

// router.get('/confirmation:token', user_controller.confirmtoken)
/**  
 * route to resend a new confirmation token
 */
// router.post('/resend', user_controller.resendTokenPost);

module.exports = router;