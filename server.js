var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var dataBase = require('./config/database.config');
var user = require('./routes/user.route');
var expressValidator = require('express-validator');

/// initializing express app
const app = express();
let port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use('/user',user);

    app.listen(port, ()=>{
        console.log('Server is running at the port: '+port);
    })

    dataBase.mongoose;

