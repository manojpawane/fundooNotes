const NoteService = require('../services/note.service')

/**
 *
 *
 * @class NoteController
 */
class NoteController{
    constructor(){
    }
    /**
     * add notes
     *
     * @param {*} req
     * @param {*} res
     * @memberof NoteController
     */
    AddNote(req, res){
            try {
                var noteService = new NoteService();
                req.assert('title', 'Title cannot be empty').notEmpty();
                req.assert('content', 'Content cannot be empty').notEmpty();
                req.assert('userId', 'User authentication failed').notEmpty()
                let errors = req.validationErrors();
                if(errors){
                    res.status(400).send(errors);
                }
                else{
                    noteService.AddNoteSer(req, res);
                }
            } catch (error) {
                throw new Error(error);
            }
    }

    /**
     *update notes
     *
     * @param {*} req
     * @param {*} res
     * @memberof NoteController
     */
    updateNote(req, res){
        try {
            var noteService = new NoteService();
            console.log(req.body);
            req.assert('title', 'Title cannot be empty').notEmpty();
            req.assert('content', 'Content cannot be empty').notEmpty();
            req.assert('userId', 'User authentication failed').notEmpty();
            req.assert('_id','Invalid card number').notEmpty();
            let errors = req.validationErrors();
            if(errors){
                throw new Error(errors[0].msg)     
            }
            else{
                noteService.updateNote(req, res);
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    /**
     *get notes by id
     *
     * @param {*} req
     * @param {*} res
     * @memberof NoteController
     */
    getNoteById(req, res){
        try {
            var noteservice = new NoteService();
            req.assert('Id', 'Note cannot be empty').notEmpty();
            let errors = req.validationErrors();
            if(errors){
                res.status(400).send(errors);
            }
            else{
                noteservice.getNotebyId(req, res);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     *get  notes by user id
     *
     * @param {*} req
     * @param {*} res
     * @memberof NoteController
     */
    getNote(req, res){
        try {
            var noteService = new NoteService();
            req.assert('userId', 'user Id cannot be empty').notEmpty();
            let errors = req.validationErrors();
            if(errors){
                res.status(400).send(errors);
            }
            else{
                noteService.getNote(req, res);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * delete notes
     *
     * @param {*} req
     * @param {*} res
     * @memberof NoteController
     */
    deleteNote(req, res){
        try {
            var noteService = new NoteService();
            req.assert('Id','Invalid request').notEmpty();
            let errors = req.validationErrors();
            if(errors){
                res.status(400).send(errors);
            }
            else{
                noteService.deleteNote(req, res);
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports.NoteController = NoteController
