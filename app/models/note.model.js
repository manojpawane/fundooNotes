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
        createdBy : {type:mongoose.Schema.Types.ObjectId, ref:'User', default:null},
        createdOn:{
            type: Date,
            default:null
        },
        modifyBy:{type:mongoose.Schema.Types.ObjectId, ref:'User', default:null},
        
        modifyOn:{
            type: Date,
            default:null
        },
        userId : {type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
        reminder:{
            type: Date,
            default:null
        },
        color:{
            type:String,
            default:null
        },
        photo:{
            type:String,
            default:null
        },
        label:[{
            type:mongoose.Schema.Types.ObjectId, ref:'Label',
            default:null
        }]
    }
)

/// Export the models
module.exports = mongoose.model('Note', NoteSchema);