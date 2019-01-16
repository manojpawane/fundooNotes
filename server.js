var express = require('express');
const swaggerDoc = require('./swaggerDoc');
var bodyParser = require('body-parser');
var cors = require('cors');
var dataBase = require('./config/database.config');
var user = require('./routes/user.route');
var label = require('./routes/Label.route');
var expressValidator = require('express-validator');

/// initializing express app
const app = express();

let port = process.env.PORT || 5000;

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
swaggerDoc(app);
app.use('/user',user);
app.use('/label',label);
    app.listen(port, ()=>{
        console.log('Server is running at the port: '+port);
    })

    dataBase.mongoose;

    