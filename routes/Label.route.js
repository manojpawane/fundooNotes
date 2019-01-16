var express = require('express');
const cors = require('cors');
const Label_Controller = require('../controller/label.controller');
const router = express.Router();
expressValidator = require('express-validator');

router.use(cors());
router.use(expressValidator()); 

var label_controller = new Label_Controller.Label_Controller();
router.post('/addlabel', label_controller.AddLabel)

module.exports = router;