const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LabelSchema = new Schema({
    name:{
        type:String,
        require:true,
        max:100
    }
})

module.exports = mongoose.model('Label', LabelSchema);