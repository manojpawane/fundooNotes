const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/// validation for email
var validateEmail = function(email){
    var re =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

/// user schema as a model
let UserSchema = new Schema(
    {
        name : {
            type:String,
            required: true,
            max:100
        },
        email:{
            type:String,
            required:'Email address cant be blank',
            validate:[validateEmail,'Please enter valid email address. '],
            index:{unique:true , dropDups: true}
        },
        password:{
            type:String, 
            required:[true, 'Password cannot be left blank'],
        },
        isVerified:{
            type:Boolean,
            default:false
        }
    }
)

/// Export the models
module.exports = mongoose.model('User', UserSchema);