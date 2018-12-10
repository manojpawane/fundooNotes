var events = require('events');
var eventEmitter = new events.EventEmitter();
var nodemailer = require('nodemailer');

/// Create event handler
var sendEmail = function(subject, user, text){
    var transporter = nodemailer.createTransport({
        service:'Sendgrid',
        auth:{
            user:process.env.SENDGRID_USERNAME,
            pass:process.env.SENDGRID_PASSWORD
        }
    });

    var mailOptions = {
        from:'fundoonote@mail.com',
        to:user.email,
        subject:subject,
        text:text, 
    }

    transporter.sendMail(mailOptions, function(err){
        if(err){
            return err.message
        }
        else{
            return 'Verfication mail has been sent to ' + user.email + '.';
        }
    });
}

/// Assign the event handler to an event
eventEmitter.on('sendEmail', sendEmail);

module.exports = eventEmitter;