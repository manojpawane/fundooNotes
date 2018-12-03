/// database settings for mongo DB
const mongoURI = 'mongodb://admin:admin123@ds043457.mlab.com:43457/productapp';
mongoose.connect(mongoURI,{useNewUrlParser:true})
.then(()=> console.log("MongoDB connected."))
.catch(err => console.log(err))