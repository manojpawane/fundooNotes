const Label = require('../app/models/label.model')
const User = require('../app/models/user.model');

/**
 * class for label creation, updation, read, deletion
 *
 * @class LabelNote
 */
class LabelNote {
    constructor() {

    }

    /**
     *Add label
     *
     * @param {*} req
     * @param {*} res
     * @returns
     * @memberof LabelNote
     */
    async AddLabelForUser(req, res) {
        try {
            var user = await User.findOne({
                _id: req.body.userId
            })
            if (user) {
                var labelExist = await Label.findOne({
                    name: req.body.name,
                    userId: req.body.userId
                })
                if (labelExist) {
                    res.status(400).send({ msg: 'The label name already exists' });
                }
                else {
                    var label = new Label({
                        name: req.body.name,
                        userId: req.body.userId
                    })
                    let labelResponse = await Label.create(label);
                    res.send(labelResponse)
                }
            }
            else {
                res.status(401).send('Invalid User');
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    /**
     * get label
     *
     * @param {*} req
     * @param {*} res
     * @memberof LabelNote
     */
    async get(req, res) {

        try {
            var label = await Label.find({
                userId: req.params.userId,
            })
            if (label) {
                res.status(200).send(label);
            }
            else {
                res.status(401).send('Label Not found');
            }
        } catch (error) {
            res.send(error)
        }

    }

    /**
     *update label
     *
     * @param {*} req
     * @param {*} res
     * @returns
     * @memberof LabelNote
     */
    async update(req, res) {
        try {
            var labelExist = await Label.findOne({
                _id: req.body.Id,
                userId: req.body.userId
            })
            if (!labelExist) {
                res.status(401).send({ msg: 'The label does not exists' });
            }
            else {
                labelExist.name = req.body.name
                await labelExist.save(function (err) {
                    if (err) {
                        res.status(500).send({ msg: err.message });
                    }
                    else {
                        res.status(200).send("updated successfully.")
                    }
                })
            }
        } catch (error) {
            throw new Error(error);
        }

    }

    /**
     *delete lebel
     *
     * @param {*} req
     * @param {*} res
     * @memberof LabelNote
     */
    async deleteLabel(req, res) {
        try {
            await Label.findByIdAndDelete(req.params.Id, function (err) {
                if (err) {
                    res.send(err)
                }
                else {
                    res.status(200).send('Successfully deleted');
                }
            });
        }
        catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = LabelNote
