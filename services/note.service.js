"use strict";
const Note = require('../app/models/note.model')

class NoteService {
    constructor() {

    }

    /**
     * Add new Note
     *
     * @param {*} req
     * @param {*} res
     * @memberof NoteService
     */
    async AddNoteSer(req, res) {
        try {
            let note = new Note(
                {
                    title: req.body.title,
                    content: req.body.content,
                    noteType: req.body.noteType,
                    isPinned: req.body.isPinned,
                    createdBy: req.body.userId,
                    createdOn: Date.UTC(),
                    _userId: req.body.userId,
                    color: req.body.color,
                    label: req.body.label
                }
            );

            var noteAddResponse = await Note.create(note);
            res.send((noteAddResponse));
        } catch (error) {
            res.send(error)
        }
    }

    /**
     * updates existing note
     *
     * @param {*} req
     * @param {*} res
     * @memberof NoteService
     */
    async updateNote(req, res) {
        try {
            var noteExist = await Note.findOne({
                _id: req.body.id
            })
            if (noteExist) {
                noteExist = new Note(
                    {
                        title: req.body.title,
                        content: req.body.content,
                        noteType: req.body.noteType,
                        isPinned: req.body.isPinned,
                        createdBy: req.body.userId,
                        createdOn: Date.UTC(),
                        _userId: req.body.userId,
                        color: req.body.color,
                        label: req.body.label
                    }
                );
            }
            else {
                res.status(401).send('Invalid Note.');
            }

            await note.save(function (err) {
                if (err) {
                    return res.status(500).send({ msg: err.message });
                }
                else {
                    return res.status(200).send("updated successfully.");
                }
            })
            res.send((noteAddResponse));
        } catch (error) {
            res.send(error)
        }
    }

    /**
     *  Get note by Id
     *
     * @param {*} req
     * @param {*} res
     * @memberof NoteService
     */
    async getNotebyId(req, res) {
        try {
            var noteExist = await Note.findOne({
                _id: req.body.id
            })
            if (noteExist) {
                res.send(noteExist);
            }
            else {
                res.status(401).send('Invalid Note');
            }
        } catch (error) {
            res.send(error)
        }
    }

    /**
     * Gets notes by user id
     *
     * @param {*} req
     * @param {*} res
     * @memberof NoteService
     */
    async getNote(req, res) {
        try {
            var user = await User.findOne({
                _id:req.body.userId
            })
            if(user){
                var notes = await Note.find({
                    userId: req.body.userId
                })
                if (notes) {
                    res.send(notes)
                }
                else {
                    res.status(401).send('no notes available with user');
                }   
            }
            else{
                res.send('Invalid user');
            } 
        } catch (error) {
            res.send(error)
        }

    }

    /**
     * Deletes the note by id
     *
     * @param {*} req
     * @param {*} res
     * @memberof NoteService
     */
    async deleteNote(req, res){
        var deletedNote = await Note.findByIdAndDelete(req.body.id, function(err){
            if(err){
                res.send(err)
            }
            else{
                res.status(200).send('Successfully deleted');
            }
        });
    }   
}


module.exports = NoteService