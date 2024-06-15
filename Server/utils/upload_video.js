const cloudinary = require("cloudinary").v2;

exports.upload_video = async (file, folder) => {
    const options = {folder};

    options.resource_type = "video";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}