const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

    try{
        //Get mail id from the request
        const {email, password} = req.body;
        //If details are not filled
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "ALL FIELDS ARE MANDATORY, PLEASE TRY AGAIN",
            })
        };

        //Get user entry from database
        let user = await User.findOne({email: email})
        .populate("additional_details")
        .populate("cart");
        
        console.log(user);
        if(!user){
            return res.status(401).json({
                success: false,
                message: "USER NOT REGISTERED, PLEASE SIGN UP FIRST",
            })
        }

        //Checking Password
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email : user.email,
                id : user._id,
                account_type : user.account_type,
            }

            //token creation
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: "2h",
            });
            
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            //Cookie creation
            return res.cookie("token", token, {
                expire: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }).status(200).json({
                success: true,
                user: user,
                message: "LOGGED IN SUCCESSFULLY",
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "INVALID PASSWORD. PLEASE TRY AGAIN",
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE LOGGING IN. PLEASE TRY AGAIN",
        })
    }
}