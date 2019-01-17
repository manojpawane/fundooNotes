const NoteService = require('../services/note.service')

class NoteController{
    constructor(){
    }
    AddNote(req, res){
            try {
                var noteService = new NoteService();
                req.assert('title', 'Title cannot be empty').notEmpty();
                req.assert('content', 'Content cannot be empty').notEmpty();
                req.assert('userId', 'User authentication failed').notEmpty()
                var errors = req.validationErrors();
                if(errors){
                    res.status(400).send(errors);
                }
                else{
                    noteService.AddNoteSer(req, res);
                }
            } catch (error) {
                res.send(error);
            }
    }

    updateNote(req, res){
        try {
            var noteService = new NoteService();
            req.assert('title', 'Title cannot be empty').notEmpty();
            req.assert('content', 'Content cannot be empty').notEmpty();
            req.assert('userId', 'User authentication failed').notEmpty()
            var errors = req.validationErrors();
            if(errors){
                res.status(400).send(errors);
            }
            else{
                noteService.updateNote(req, res);
            }
        } catch (error) {
            res.send(error);
        }
    }

    getNoteById(req, res){
        try {
            var noteservice = new NoteService();
            req.assert('id', 'Note cannot be empty').notEmpty();
            if(errors){
                res.status(400).send(errors);
            }
            else{
                noteservice.getNotebyId(res, res);
            }
        } catch (error) {
            res.send(error);
        }
    }

    getNote(req, res){
        try {
            var noteService = new NoteService();
            req.assert('userId', 'user Id cannot be empty').notEmpty();
            var errors = req.validationErrors();
            if(errors){
                res.status(400).send(errors);
            }
            else{
                noteService.getNote(req, res);
            }
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports.NoteController = NoteController
