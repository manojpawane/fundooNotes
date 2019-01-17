const Label = require('../app/models/label.model')

class LabelNote {
    constructor() {

    }

    AddLabelForUser(req, res){
        return new Promise(async function(resolve, reject){
            try {
                var labelExist = await Label.findOne({
                    name:req.body.name,
                    _userId:req.body.userId
                })
                if(labelExist){
                    resolve(res.status(400).send({msg:'The label name already exists'}));
                }
                else{
                    var label = new Label({
                        name:req.body.name,
                        _userId:req.body.userId
                    })
                    let labelResponse = await Label.create(label);
                    resolve(res.send(labelResponse))
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = LabelNote
