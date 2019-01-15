"use strict";
const Label = require('../app/models/label')

class Label {
    constructor() {

    }

    AddLabel(name){
        return new Promise(async function(resolve, reject){
            try {
                var labelExist = await Label.findOne({
                    name:name
                })
                if(labelExist){
                    resolve('Label already exists');
                }
                else{
                    let label = new Label({
                        name:name
                    })
                    
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}