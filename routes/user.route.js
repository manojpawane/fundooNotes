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
 * /create:
 *    post:
 *     description: create a user
 *     produces:
 *       - application/json
 *  requestBody:
 *  $ref: '#/models/user.model/PetBody'
*/
router.post('/create', user_controller.user_create);

/**
 * @swagger
 * /login:
 *    post:
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