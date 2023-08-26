const nodemailer = require('../config/nodemailer');

exports.contact = function(user, contact_mail){

    let htmlString = nodemailer.renderTemplate({user: user, contact_mail: contact_mail}, '/contact.ejs');
    nodemailer.transporter.sendMail({
        from: user.email,
        to: 'dharmeshkota123@gmail.com',
        subject: 'User from Rodic360 Contacted!',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error while sending the Mail! ', err);
            return;
        }

        console.log('Link Sent!');
    });

}