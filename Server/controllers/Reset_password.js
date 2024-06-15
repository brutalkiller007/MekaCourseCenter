const User = require("../models/User");
const mail_sender = require("../utils/mail_sender");
const bcrypt = require("bcryptjs");

exports.reset_password_token = async (req, res) => {

    try{
        //Get email from the request
        const email = req.body.email;

        //check email validation
        const user = await User.findOne({email : email});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Email Not Registered. Please enter a Registered Email ID",
            })
        }

        //Token generation
        const token = crypto.randomUUID();

        //Update User in DB with reset password expiry time
        const updated_details = await User.findOneAndUpdate(
            {email : email},
            {
                token : token,
                reset_password_expiry_time : (Date.now() + 10 * 60 * 1000)
            },
            {new : true}
        )

        //Generate the URL
        const url = `http://localhost:3000/update_password/${token}`;

        //Send the mail Reset password link
        await mail_sender(email, "Reset Password Link", `Reset password Link: ${url}`);

        //return the response
        return res.status(200).json({
            success: true,
            user: updated_details,
            message: "Reset Password Link Sent Succesfully. Please Check Your Email",
        })
    }
    catch(error){   
        return res.status(500).json({
            success: false,
            detaisl: error.message,
            message: "Error Occured while Resetting Password Token. Please Try Again",
        })
    }
}

exports.reset_password = async (req, res) => {

    try{
        //Get details from the request
        const {password, confirm_password, token} = req.body;

        //confirm password check
        if(password !== confirm_password){
            return res.status(401).json({
                success: false,
                message: "Password and Confirm Password do not match",
            })
        }

        //check validation
        const user = await User.findOne({token: token});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid Token",
            })
        }

        //hash the passsword
        const hashed_password = await bcrypt.hash(password, 10);

        //Reset the password using token
        if(user.reset_password_expiry_time > Date.now()){

            const updated_user = await User.findOneAndUpdate(
                {token : token},
                {password : hashed_password},
                {new : true}
            )
            
            return res.status(200).json({
                success: true,
                user: updated_user,
                message: "Reset Password has been done Succesfully",
            })

        }
        else{
            return res.status(400).json({
                success: false,
                message: "Reset Password Link has been Expired. Please Generate new Link",
            })
        }
    }
    catch(error){   
        return res.status(500).json({
            success: false,
            detaisl: error.message,
            message: "Error Occured while Resetting Password. Please Try Again",
        })
    }
}