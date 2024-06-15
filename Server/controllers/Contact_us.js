const {contact_form} = require("../Mail/contact_form");
const mail_sender = require("../utils/mail_sender");
require("dotenv").config();

exports.contact_us = async (req, res) => {
    const {first_name, last_name, email, phone_number, message } = req.body;

    try{
        console.log(req.body);
        const email_response = await mail_sender(email, "YOUR MESSAGE SENT SUCCESSFULLY", contact_form(first_name, last_name, email, phone_number, message));
        const send_mail = await mail_sender(process.env.RECEIVER_MAIL, "YOU RECEIVED A MESSAGE", message);

        return res.status(200).json({
            success: true,
            message: "MAIL SENT SUCCESSFULLY"
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE SENDING MAIL TO CONTROLLER"
        })
    }
}