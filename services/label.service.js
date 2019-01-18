const Label = require('../app/models/label.model')

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
    AddLabelForUser(req, res) {
        return new Promise(async function (resolve, reject) {
            try {
                var labelExist = await Label.findOne({
                    name: req.body.name,
                    _userId: req.body.userId
                })
                if (labelExist) {
                    resolve(res.status(400).send({ msg: 'The label name already exists' }));
                }
                else {
                    var label = new Label({
                        name: req.body.name,
                        _userId: req.body.userId
                    })
                    let labelResponse = await Label.create(label);
                    resolve(res.send(labelResponse))
                }
            } catch (error) {
                reject(error);
            }
        })
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
                var label = await Label.findOne({
                    userId: req.body.userId,
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
    update(req, res) {
        return new Promise(async function (resolve, reject) {
            try {
                var labelExist = await Label.findOne({
                    id: req.body.Id,
                    userId: req.body.userId
                })
                if (!labelExist) {
                    resolve(res.status(401).send({ msg: 'The label does not exists' }));
                }
                else {
                     labelExist.name = req.body.name
                }

                await labelExist.save(function (err) {
                    if (err) {
                        resolve( res.status(500).send({ msg: err.message }));
                    }
                    else {
                       resolve(res.status(200).send("updated successfully."))
                    }
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    /**
     *delete lebel
     *
     * @param {*} req
     * @param {*} res
     * @memberof LabelNote
     */
    async deleteLabel(req, res){
        await Label.findByIdAndDelete(req.body.Id, function(err){
           if(err){
               res.send(err)
           }
           else{
               res.status(200).send('Successfully deleted');
           }
       });
   }
}

module.exports = LabelNote
