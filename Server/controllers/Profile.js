const User = require("../models/User");
const Profile = require("../models/Profile");
const {upload_image} = require("../utils/upload_image");
require("dotenv").config();

exports.update_profile = async (req, res) => {
    try{

        const { first_name, last_name, date_of_birth, about, gender, contact_number } = req.body;
        user_id = req.user.id;
        const user = await User.findOne({_id: user_id});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Unable to find the details of the user",
            })
        }

        console.log(date_of_birth);

        const profile_id = user.additional_details;
        const profile = await Profile.findById(profile_id);

        user.first_name = first_name;
        user.last_name = last_name;
        user.contact_number = contact_number;
        user.save();

        //UPDATE THE DETAILS
        profile.date_of_birth = date_of_birth;
        profile.about = about;
        profile.gender = gender;
        profile.contact_number = contact_number;

        await profile.save();

        const updated_user = await user.populate("additional_details");
        user.password = null;

        return res.status(200).json({
            success: true,
            updated_user: updated_user,
            message: "Profile Updated Succesfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error Occured while Updating the profile",
            details: error.message
        })
    }
}

exports.update_dp = async (req, res) => {

    try{
        const dp = req.files.display_picture;
        const id = req.user.id;

        const image = await upload_image(dp, process.env.IMAGE_FOLDER_NAME, 1000, 1000);
        console.log(image.secure_url);
        const updated_user = await User.findByIdAndUpdate({_id : id},
                                                            {image : image.secure_url},
                                                            {new: true});

        return res.status(200).json({
            success: true,
            user_details: updated_user,
            message: "Display Picture has been updated successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error Occured while updating the Display Picture",
            details: error.message
        })
    }
}

exports.get_user_details = async (req, res) => {

    try{
        user_id = req.user.id;

        const user = await User.find({_id: user_id}).populate("additional_details").exec();

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Unable to find the details of the user",
            })
        }

        return res.status(200).json({
            success: true,
            user_details: user,
            message: "User Details has been fetched succesfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error Occured while Fetching the user details",
            details: error.message
        })
    }
}
