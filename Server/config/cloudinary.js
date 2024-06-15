const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cloudinary_connect = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })

        console.log("Cloudinary connection is succesfull");
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = cloudinary_connect;