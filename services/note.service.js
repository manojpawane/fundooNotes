"use strict";
const Note = require('../app/models/note.model')
const User = require('../app/models/user.model')

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
                    createdOn: Date.now(),
                    userId: req.body.userId,
                    color: req.body.color,
                    label: req.body.label
                }
            );

            var noteAddResponse = await Note.create(note);
            res.send((noteAddResponse));
        } catch (error) {
            throw new Error(error);
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
                _id: req.body._id
            })
            if (noteExist) {
                noteExist.title = req.body.title,
                    noteExist.content = req.body.content,
                    noteExist.noteType = req.body.noteType,
                    noteExist.isPinned = req.body.isPinned,
                    noteExist.modifyBy = req.body.userId,
                    noteExist.modifyOn = Date.now();
                    noteExist.color = req.body.color,
                    noteExist.label = req.body.label

            let data =  await noteExist.save(async function (err) {
                    if (err) {
                        return res.status(500).send({ msg: err.message });
                    }
                    else {
                        var note = await Note.findOne({
                            _id: req.body._id
                        })
                        return res.status(200).send(note);
                    }
                })
            }
            else {
                res.status(401).send('Invalid Note.');
            }


        } catch (error) {
            throw new Error(error)
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
                _id: req.params.Id
            })
            if (noteExist) {
                res.send(noteExist);
            }
            else {
                res.status(401).send('Invalid Note');
            }
        } catch (error) {
            throw new Error(error);
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
                _id: req.params.userId
            })
            if (user) {
                var notes = await Note.find({
                    userId: req.params.userId
                })
                if (notes) {
                    res.send(notes)
                }
                else {
                    res.status(401).send('no notes available with user');
                }
            }
            else {
                res.send('Invalid user');
            }
        } catch (error) {
            throw new Error(error);
        }

    }

    /**
     * Deletes the note by id
     *
     * @param {*} req
     * @param {*} res
     * @memberof NoteService
     */
    async deleteNote(req, res) {
        try {
            await Note.findByIdAndDelete(req.params.Id, function (err) {
                if (err) {
                    res.send(err)
                }
                else {
                    res.status(200).send('Successfully deleted');
                }
            });
        } catch (error) {
            throw new Error(error)
        }
    }
}


module.exports = NoteService