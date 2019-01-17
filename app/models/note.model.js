const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/// user schema as a model
let NoteSchema = new Schema(
    {
        title : {
            type:String,
            required: true,
            max:100
        },
        content:{
            type:String,
            required:'true',
        },
        noteType:{
            type:String,
            enum:['isNote', 'isArchive','isTrashed'],
            default:'isNote'
        },
        isPinned:{
            type:Boolean,
            default:false
        },
        createdBy : {type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
        createdOn:{
            type:Date
        },
        userId : {type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
        reminder:{
            type:Date
        },
        color:{
            type:String
        },
        photo:{
            type:String
        },
        label:{
            type:mongoose.Schema.Types.ObjectId, ref:'Label'
        }
    }
)

/// Export the models
module.exports = mongoose.model('Note', NoteSchema);