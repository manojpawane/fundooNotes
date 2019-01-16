const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LabelSchema = new Schema({
    name:{
        type:String,
        require:true,
        max:100
    },
    _userId : {type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'}
})

module.exports = mongoose.model('Label', LabelSchema);