var mongoose = require('mongoose');

/// database settings for mongo DB
const mongoURI = 'mongodb://admin:fundooapp1@ds149040.mlab.com:49040/fundoonote';
mongoose.connect(mongoURI,{useNewUrlParser:true})
.then(()=> console.log("MongoDB connected."))
.catch(err => console.log(err))