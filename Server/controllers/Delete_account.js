const User = require("../models/User");
const Profile = require("../models/Profile");

exports.delete_account = async (req, res) => {
    try{

        user_id = req.user.id;
        const user = await User.findOne({_id: user_id});
        console.log(user_id);
        
        if(!user){
            return res.status(404).json({
                success: false,
                message: "UNABLE TO FIND THE DETAILS OF THE USER TO DELETE",
            })
        }

        const profile_id = user.additional_details;

        await Profile.findByIdAndDelete(profile_id);
        await User.findByIdAndDelete(user_id);

        return res.status(200).json({
            success: true,
            message: "ACCOUNT DELETED SUCCESSFULLY",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "ERROR OCCURED WHILE DELETING THE ACCOUNT",
            details: error.message
        })
    }
}
