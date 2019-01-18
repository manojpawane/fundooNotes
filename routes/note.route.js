var express = require('express');
const cors = require('cors');
const NoteController = require('../controller/note.controller')
const router = express.Router();
expressValidator = require('express-validator');

router.use(cors());
router.use(expressValidator()); 

var noteController = new NoteController.NoteController();
router.post('/createNote', noteController.AddNote);
router.post('/updateNote', noteController.updateNote);
router.get('/getNoteById/:Id', noteController.getNoteById);
router.get('/getNote/:userId',noteController.getNote);
router.delete('/deleteNote/:Id',noteController.deleteNote);

module.exports = router;