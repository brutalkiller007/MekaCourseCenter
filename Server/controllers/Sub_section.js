const Section = require("../models/Section");
const Sub_section = require("../models/Sub_section");
const {upload_video} = require("../utils/upload_video");
const Course = require("../models/Course");

exports.create_subsection = async (req, res) => {
    try{
        //get details
        const {title, description, section_id} = req.body;
        const video = req.files.video_file;
        
        if(!title || !section_id || !description){
            return res.status(404).json({
                success: false,
                message: "MISSING DETAILS TO CREATE A SUB-SECTION",
            })
        }

        const section = await Section.find({_id : section_id});

        if(!section){
            return res.status(404).json({
                success: false,
                message: "UNABLE TO FIND THE SECTION",
            })
        }

        const upload_details = await upload_video(video, process.env.VIDEO_FOLDER_NAME);
        console.log(upload_details);
        const created_sub_section = await Sub_section.create({title: title,
                                                                description: description,
                                                                video_url: upload_details.secure_url,
                                                                duration: upload_details.duration
                                                            });

        const updated_section = await Section.findByIdAndUpdate(
            section_id,
            {
                $push: {
                    sub_section: created_sub_section._id
                }
            },
            {new : true}
        )
        .populate("sub_section").exec();

        return res.status(200).json({
            success: true,
            message: "SUB-SECTION CREATED SUCCESSFULLY",
            updated_section: updated_section
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "ERROR OCCURED WHILE CREATING A SUB-SECTION",
            details: error.message
        })
    }
}


//update section
exports.update_subsection = async (req, res) => {
    try{
        //get details
        const {title, description, sub_section_id} = req.body;

        const sub_section = await Sub_section.findById(sub_section_id);
        
        if(!sub_section){
            return res.status(404).json({
                success: false,
                message: "UNABLE TO FIND THE SUB-SECTION",
                details: error.message
            })
        }
        if(title !== undefined)
            sub_section.title = title;

        if(description !== undefined)
            sub_section.description = description;

        if(req.files && req.files.video_file !== undefined){
            const video = req.files.video_file;
            const upload_details = await upload_video(video, process.env.FOLDER_NAME);

            sub_section.video_url = upload_details.secure_url;
            sub_section.duration = upload_details.duration;
        }

        await sub_section.save();
        console.log(sub_section);
        
        return res.status(200).json({
            success: true,
            message: "SUB-SECTION UPDATED SUCCESSFULLY",
            updated_subsection: sub_section
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "ERROR OCCURED WHILE UPDATING A SUB-SECTION",
            details: error.message
        })
    }
}


//delete sub-section
exports.delete_subsection = async (req, res) => {
    try{
        //get details
        const {sub_section_id, section_id} = req.body;
        
        const updated_section = await Section.findByIdAndUpdate(section_id,
                                                {
                                                    $pull: {
                                                        sub_section : sub_section_id
                                                    }
                                                },
                                                {new: true}).populate("sub_section").exec();

        if(!updated_section){
            return res.status(404).json({
                success: false,
                message: "UNABLE TO FIND THE SECTION",
            })
        }

        await Sub_section.findByIdAndDelete(sub_section_id);

        return res.status(200).json({
            success: true,
            message: "SUB-SECTION DELETED SUCCESSFULLY",
            updated_section: updated_section
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "ERROR OCCURED WHILE DELETING A SUB-SECTION",
            details: error.message
        })
    }
}