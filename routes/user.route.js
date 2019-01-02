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
 * definitions:
 *   User:
 *     properties:
 *       name:
 *         type: String
 *       email:
 *         type: String
 *       password:
 *         type: String
 */
/**
 * @swagger
 * user/create:
 *   post:
 *     tags:
 *       - Create
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/create', user_controller.user_create);

/**
 * @swagger
 * /login:
 *    post:
 *     tags:
 *       - Login   
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
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