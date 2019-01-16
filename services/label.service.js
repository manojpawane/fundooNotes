"use strict";
const Label = require('../app/models/label.model')

class LabelNote {
    constructor() {

    }

    AddLabelForUser(req, res){
        console.log('tesiting in add label method');
        return new Promise(async function(resolve, reject){
            try {
                var labelNote = new LabelNote();
                var iddata = labelNote.parseJWT(req.body.token)
                console.log(iddata)
                var labelExist = await Label.findOne({
                    name:req.body.name,
                    _userId:req.body.id
                })
                if(labelExist){
                    resolve(res.status(400).send({msg:'The label name already exists'}));
                }
                else{
                    var label = new Label({
                        name:req.body.name
                    })
                    let labelResponse = await Label.create(label);
                    console.log(labelResponse);
                    resolve(res.send(labelResponse))
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = LabelNote
