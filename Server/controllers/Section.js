const Section = require("../models/Section");
const Course = require("../models/Course");

exports.create_section = async (req, res) => {
    try{
        //get details
        const {section_name, course_id} = req.body;

        if(!section_name || !course_id){
            return res.status(404).json({
                success: false,
                message: "Missing details to create a section",
            })
        }

        const course = await Course.find({_id : course_id});
        
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Unable to find the Course",
            })
        }

        const created_section = await Section.create({section_name: section_name});

        const new_course = await Course.findByIdAndUpdate(
            course_id,
            {
                $push: {
                    course_content: created_section._id
                }
            },
            {new : true}
        ).populate({
            path:"course_content",
            populate:{
                path: "sub_section",
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section created succesfully",
            updated_course: new_course
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error Occured while creating a Section",
            details: error.message
        })
    }
}


exports.update_section = async (req, res) => {
    try{
        //get details
        const {section_name, section_id, course_id} = req.body;

        if(!section_name || !section_id || !course_id){
            return res.status(404).json({
                success: false,
                message: "Missing details to update a section",
            })
        }

        const section = await Section.find({_id : section_id});
        
        if(!section){
            return res.status(404).json({
                success: false,
                message: "Unable to find the Section to update",
            })
        }

        const updated_section = await Section.findByIdAndUpdate(section_id, {section_name: section_name}, {new: true});

        const updated_course = await Course.findById({_id : course_id})
        .populate({
            path:"course_content",
            populate:{
                path: "sub_section",
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section updated succesfully",
            updated_course: updated_course
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error Occured while updating a Section",
            details: error.message
        })
    }
}


//delete subsection
exports.delete_section = async (req, res) => {
    try{
        //get details
        const {section_id, course_id} = req.body;

        if(!section_id || !course_id){
            return res.status(404).json({
                success: false,
                message: "Missing details to delete a section",
            })
        }

        const course = await Course.find({_id : course_id});
        
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Unable to find the Course",
            })
        }

        const new_course = await Course.findByIdAndUpdate(
            course_id,
            {
                $pull: {
                    course_content: section_id
                }
            },
            {new : true}
        ).populate({
            path:"course_content",
            populate:{
                path: "sub_section",
            }
        }).exec();

        await Section.findByIdAndDelete(section_id);

        return res.status(200).json({
            success: true,
            message: "Section deleted succesfully",
            updated_course: new_course
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error Occured while deleting a Section",
            details: error.message
        })
    }
}