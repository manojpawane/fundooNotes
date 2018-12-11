var events = require('events');
var eventEmitter = new events.EventEmitter();
var nodemailer = require('nodemailer');

/// Create event handler
var sendEmail = function (subject, user, text) {
    return new Promise(async function(resolve, reject){
        try {
            console.log('Test events');
            var transporter = await nodemailer.createTransport({
                host: 'smtp.mail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'fundoonote@mail.com',
                    pass: 'Manoj@1234'
                }
            });

            var mailOptions = await {
                from: 'fundoonote@mail.com',
                to: user.email,
                subject: subject,
                text: text,
            }
            console.log(user.email);
          transporter.sendMail(mailOptions, function (error, info) {
              console.log('111111');
                if (error) {
                    console.log('inside error')
                    console.log(error);
                    resolve(error.message) 
                }
                else {
                    console.log(info.response);
                    console.log('testi');
                    resolve('Verfication mail has been sent to ' + user.email + '.');
                }
            });
        } catch (error) {
            console.log('inside catch block');
            console.log(error);
            reject(error)
        }
    })
        
}

/// Assign the event handler to an event
eventEmitter.on('sendEmail', sendEmail);

module.exports = eventEmitter;