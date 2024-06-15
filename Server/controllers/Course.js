const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Course_progress = require("../models/Course_progress");
const {upload_image} = require("../utils/upload_image");
require("dotenv").config();

exports.create_course = async (req, res) => {

    try{

        //get the details
        let {name, course_description, what_you_will_learn, price, cat, instructions : _instructions, tags : _tags} = req.body;
        const thumbnail = req.files.thumbnail_image;

        const tags = JSON.parse(_tags);
        const instructions = JSON.parse(_instructions);

        console.log(name, course_description, what_you_will_learn, price, cat);

        //Validation
        if(!name || !course_description || !what_you_will_learn || !price || !cat || !thumbnail || !instructions || !tags){
            return res.status(400).json({
                success: false,
                message: "ALL FIELDS ARE MANDATORY TO FILL"
            })
        }

        //Instructor details
        //TODO
        const user_id = req.user.id;
        const instructor_details = await User.findById(user_id);

        if(!instructor_details){
            return res.status(404).json({
                success: false,
                message: "INVALID INSTRUCTOR DETAILS"
            })
        }

        //tag validity
        const category = await Category.findById(cat);
        if(!category){
            return res.status(404).json({
                success: false,
                message: "INVALID CATEGORY DETAILS"
            })
        }

        //Upload image to cloudinary
        const thumbnail_image = await upload_image(thumbnail, process.env.IMAGE_FOLDER_NAME);

        //Upload course to the Database
        const new_course = await Course.create({
            course_name: name,
            course_description: course_description,
            instructor: instructor_details._id,
            what_you_will_learn: what_you_will_learn,
            price: price,
            category: category._id,
            thumbnail: thumbnail_image.secure_url,
            instructions: instructions,
            tag: tags,
            status: "Draft",
            total_lectures: 0
        })

        //Add the course into the instructor user
        await User.findByIdAndUpdate(
            {_id: instructor_details.id},
            {
                $push: {
                    courses: new_course._id,
                }
            },
            {new: true}
        )

        //Update the Tag with the course id in the Data Base
        await Category.findByIdAndUpdate(
            {_id: category._id},
            {
                $push: {
                    courses: new_course._id,
                }
            },
            {new: true}
        )
        
        return res.status(200).json({
            success: true,
            course: new_course,
            message: "COURSE CREATED SUCCESSFULLY"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE CREATING THE COURSE"
        })
    }
}


exports.edit_course = async (req, res) => {
    try{
        //get the details
        let {name, course_description, what_you_will_learn, price, cat, instructions : _instructions, tags : _tags, course_id, status, total_lectures} = req.body;

        const course = await Course.findById(course_id);

        if(name !== undefined)
            course.course_name = name

        if(course_description !== undefined)
            course.course_description = course_description

        if(what_you_will_learn !== undefined)
            course.what_you_will_learn = what_you_will_learn;

        if(price !== undefined)
            course.price = price;

        if(status !== undefined)
            course.status = status;

        if(total_lectures !== undefined)
            course.total_lectures = total_lectures;

        if(cat !== undefined){
            const old_category = await Category.findByIdAndUpdate(course.category,
                {
                    $pull : {
                        courses: course_id
                    }
                })

            if(!old_category){
                return res.status(404).json({
                    success: false,
                    message: "INVALID OLD CATEGORY DETAILS"
                })
            }

            const category = await Category.findByIdAndUpdate(cat, 
                {
                    $push : {
                        courses: course_id
                    }
                })
            
            if(!category){
                return res.status(404).json({
                    success: false,
                    message: "INVALID NEW CATEGORY DETAILS"
                })
            }
        }

        if(req.files && req.files.thumbnail_image !== undefined){
            const thumbnail = req.files.thumbnail_image;

            const thumbnail_image = await upload_image(thumbnail, process.env.IMAGE_FOLDER_NAME);
            course.thumbnail = thumbnail_image.secure_url;
        }

        if(_tags !== undefined){
            const tags = JSON.parse(_tags);
            course.tag = tags;
        }

        if(_instructions !== undefined){
            const instructions = JSON.parse(_instructions);
            course.instructions = instructions;
        }

        const updated_course = await course.save();
        console.log(updated_course);
        return res.status(200).json({
            success: true,
            updated_course: updated_course,
            message: "COURSE EDITED SUCCESSFULLY"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE COURSE"
        })
    }
}

exports.delete_course = async (req, res) => {
    try{
        //TODO
        const course_id = req.body.course_id;
        const instructor_id = req.user.id;

        console.log("delete", course_id, instructor_id);
        const instructor = await User.findByIdAndUpdate(instructor_id,
            {
                $pull : {
                    courses : course_id
                }
            },
            {new : true});

        if(!instructor){
            return res.status(404).json({
                success: false,
                message: "INSTRUCTOR DETAILS NOT FOUND"
            })
        }
        console.log("delete");
        await Course.findByIdAndDelete(course_id);

        return res.status(200).json({
            success: true,
            message: "COURSE DELETED SUCCESSFULLY"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE DELETING THE COURSES"
        })
    }
}

exports.get_all_courses = async (req, res) => {
    try{
        //TODO
        const all_courses = await Course.find({},{
                            course_name: true,
                            price: true,
                            thumbnail: true,
                            instructor: true,
                            rating_and_reviews: true,
                            students_enrolled: true
                         });

        return res.status(200).json({
            success: true,
            course: all_courses,
            message: "COURSE CREATED SUCCESSFULLY"
         })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING ALL THE COURSES"
        })
    }
}

exports.get_course_details = async (req, res) => {
    try{
        const {course_id} = req.body;

        const course = await Course.find({_id: course_id})
                                    .populate({
                                        path: "instructor",
                                        populate: {
                                            path:"additional_details",
                                        }
                                    })
                                    .populate("rating_and_reviews")
                                    .populate({
                                        path:"course_content",
                                        populate:{
                                            path: "sub_section",
                                        }
                                    }).exec();

        if(!course){
            return res.status(400).json({
                success: false,
                message: "UNABLE TO FIND THE DETAILS OF THE COURSE",
            })
        }

        return res.status(200).json({
            success: true,
            course_details: course,
            message: "COURSE DETAILS SENT SUCCESSFULLY"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING DATA OF THE COURSE"
        })
    }
}

exports.get_instructor_courses = async (req, res) => {
    try{
        //TODO
        const instructor_id = req.user.id;

        const all_courses = await Course.find({
            instructor: instructor_id
        }).sort({created_at: -1});

        return res.status(200).json({
            success: true,
            all_courses: all_courses,
            message: "INSTRUCTOR COURSES FETCHED SUCCESSFULLY"
         })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING THE INSTRUCTOR COURSES"
        })
    }
}

exports.get_enrolled_courses = async (req, res) => {
    try{
        //TODO
        const user_id = req.user.id;

        const all_courses = await User.findOne({_id: user_id}).populate({
            path : "course_progress",
            populate: {
                path : "course_id",
                populate: {
                    path : "course_content",
                    populate: {
                        path: "sub_section"
                    }
                }
            }
        })
        .exec();

        return res.status(200).json({
            success: true,
            all_courses: all_courses.course_progress,
            message: "ENROLLED COURSES FETCHED SUCCESSFULLY"
         })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING THE ENROLLED COURSES"
        })
    }
}

exports.get_view_course_details = async (req, res) => {
    try{
        //TODO
        const course_id = req.body.course_id;
        const user_id = req.user.id;

        const course = await Course.findOne({_id: course_id})
        .populate({
            path: "instructor",
            populate:{
                path: "additional_details"
            }
        })
        .populate({
            path: "course_content",
            populate:{
                path: "sub_section"
            }
        }).exec();

        const course_progress = await Course_progress.findOne({
            course_id: course_id,
            user_id: user_id
        })

        const completed_videos = course_progress.completed_videos;

        return res.status(200).json({
            success: true,
            completed_videos: completed_videos,
            course_details: course,
            section_details: course.course_content,
            message: "COMPLETE DATa FETCHED SUCCESSFULLY"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING THE COURSE DETAILS"
        })
    }
}

exports.get_instructor_dashboard_details = async (req, res) => {
    try{
        //TODO
        const instructor_id = req.user.id;

        const all_courses = await Course.find({
            instructor: instructor_id
        });

        let total_students_count = 0;
        let total_amount_generated = 0;
        const course_data = all_courses.map((course) => {

            const students_count = course.students_enrolled.length;
            const amount_generated = course.students_enrolled.length * course.price;
            total_students_count += students_count;
            total_amount_generated += amount_generated;

            return {
                _id: course._id,
                course_name: course.course_name,
                course_description: course.course_description,
                thumbnail: course.thumbnail,
                students_count,
                amount_generated,
            }

        })
        return res.status(200).json({
            success: true,
            total_students_count: total_students_count,
            total_amount_generated: total_amount_generated,
            course_data: course_data,
            message: "COMPLETE DATA FETCHED SUCCESSFULLY"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING THE COURSE DETAILS"
        })
    }
}

