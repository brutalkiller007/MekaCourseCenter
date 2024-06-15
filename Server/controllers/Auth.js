const User = require("../models/User");
const Otp = require("../models/Otp");
const Profile = require("../models/Profile");
const Cart = require("../models/Cart")
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");

//SEND_OTP 
exports.send_otp = async (req, res) => {

    try{
        //extract email from the request
        console.log(req.body);
        const email = req.body.email;
        console.log(email);
        //checking whether user exists
        const user = await User.findOne({email: email});

        //User already exists
        if(user){
            return res.status(401).json({
                success: false,
                message: "USER ALREADY EXISTS",
            })
        }
        console.log(user);
        //Generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })

        //Checks OTP is present or not
        var existing_otp = await Otp.findOne({otp : otp});

        //Genarate OTP until it is unique
        while(existing_otp){
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })

            var existing_otp = await Otp.findOne({otp : otp});
        }
        console.log(otp);
        //OTP Entry in DB
        const otp_entry = await Otp.create({email, otp});
        
        return res.status(200).json({
            success: true,
            message: "OTP SENT SUCCESSFULLY",
            otp_entry,
        })
    }
    catch(error){

        console.log("Error While sending Otp", error);

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE SENDING OTP",
        })
    }
}

exports.sign_up = async (req, res) => {
    try{
        
        //Get User Details
        const {
            first_name,
            last_name, 
            email, 
            password,
            confirm_password,
            contact_number,
            account_type,
            otp
        } = req.body;

        console.log(first_name,
            last_name, 
            email, 
            password,
            confirm_password,
            contact_number,
            account_type,
            otp);

        //checking all details are filled
        if(!first_name || !last_name || !email || !password || !confirm_password || !otp){
            return res.status(403).json({
                success: false,
                message: "SOME REQUIRED DETAILS ARE EMPTY",
            })
        }

        //check whether email is valid
        const existing_user = await User.findOne({email : email});
        if(existing_user){
            return res.status(400).json({
                success: false,
                message: "USER IS ALREADY REGISTERED",
            })
        }

        //Finding the most recent OTP
        const recent_otp = await Otp.find({email: email}).sort({created_at : -1}).limit(1);

        if(!recent_otp){
            //OTP not found

            return res.status(400).json({
                success: false,
                message: "OTP NOT FOUND"
            });
        }
        else if(Number(otp) !== recent_otp[0].otp){
            //Wrong Otp Entered

            return res.status(403).json({
                success: false,
                message: "INVALID OTP ENTERED"
            });
        }

        //Hash Password
        const hashed_pass = await bcrypt.hash(password, 10);

        //Entry in DataBase
        const profile = await Profile.create({
            gender: null,
            date_of_birth: null,
            about: null,
            contact_number: contact_number,
        })

        const cart = await Cart.create({
            cart_courses: []
        })
        
        const user = await User.create({
            first_name,
            last_name,
            email,
            contact_number : Number(contact_number),
            password: hashed_pass,
            account_type,
            additional_details: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${first_name} ${last_name}`,
            cart: cart._id
        })

        return res.status(200).json({
            success: true,
            message: "USER REGISTERED SUCCESSFULLY",
            user,
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            message: error.message,
            details: "ERROR DURING SIGN UP PROCESS",
        })
    }
}