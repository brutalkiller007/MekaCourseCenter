const User = require("../models/User");
const bcrypt = require("bcryptjs");
const mail_sender = require("../utils/mail_sender");
const { update_password } = require("../Mail/Update_password");

exports.change_password = async (req, res) => {

    try{
        //Get details from the request
        const { old_password, new_password} = req.body;
        const id = req.user.id;

        console.log(old_password);
        //If details are not filled
        if(!id || !new_password || !old_password){
            return res.status(403).json({
                success: false,
                message: "ALL FIELDS ARE MANDATORY, PLEASE TRY AGAIN",
            })
        };

        //Get user entry from database
        let user = await User.findOne({_id : id});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "USER NOT REGISTERED, PLEASE SIGN UP FIRST",
            })
        }

        //Checking Password
        if(await bcrypt.compare(old_password, user.password)){

            //Hash new password
            const hashed_password = await bcrypt.hash(new_password, 10);

            const new_user = await User.findByIdAndUpdate(
                {_id : user._id},
                {password: hashed_password},
                {new : true}
            )

            try{
                const mail_response = await mail_sender(user.email, "Response to Change in Password Request", update_password(user.email, `${user.first_name} ${user.last_name}`));;
                console.log("Password Change Request mail sent successfully");
            }
            catch(error){
                console.log("Error while sending mail : ", error);
                throw error;
            }
            
            return res.status(200).json({
                success: true,
                user: new_user,
                message: "PASSWORD CHANGED SUCCESFULLY",
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "OLD PASSWORD DO NOT MATCH YOUR ACCOUNT PASSWORD. PLEASE TRY AGAIN",
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE CHANGING PASSWORD. PLEASE TRY AGAIN",
        })
    }
}