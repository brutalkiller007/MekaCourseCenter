const node_mailer = require("nodemailer");
require("dotenv").config();

const mail_sender = async (email, title, body) => {
    console.log(email, body);
    try{
        let transporter = node_mailer.createTransport(
            {
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            }
        )

        let info = await transporter.sendMail({
            from: 'StudyNotion || RAM',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })

        console.log(info);
        return info;

    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = mail_sender;