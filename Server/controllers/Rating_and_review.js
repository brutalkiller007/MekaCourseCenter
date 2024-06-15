const Rating_and_review = require("../models/Rating_and_review");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.create_rating =  async (req, res ) => {
    try{

        const user_id = req.user.id;
        const {rating, review, course_id} = req.body;

        const course_details = await Course.findOne({
            _id : course_id,
            students_enrolled : {$elemMatch: {$eq: user_id}}
        });

        if(!course_details){
            return res.status(404).json({
                success: false,
                message: "STUDENT IS NOT ENROLLED IN THE COURSE TO GIVE RATING",
            })
        }

        const already_rated = await Rating_and_review.findOne({user: user_id, course: course_id});

        if(already_rated){
            return res.status(400).json({
                success: false,
                message: "STUDENT HAS ALREADY GIVEN THE RATING TO THE COURSE",
            })
        }

        const x = await Rating_and_review.create({
            user: user_id,
            course: course_id,
            rating: rating,
            review: review,
        })

        const updated_course = await Course.findByIdAndUpdate({_id: course_id},
            {
                $push: {
                    rating_and_reviews : x._id,
                }
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            rating_and_review: x,
            message: "Successfully created rating and review"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "Error occured while creating a Rating and Review"
        })
    }
}

exports.get_avg_rating = async (req, res) => {

    try{
        const course_id = req.body.course_id;
        
        const avg_rating = await Rating_and_review.aggregate(
            { $match: {course: new mongoose.Schema.Types.ObjectId(course_id)}},
            { $group: {_id : null, average_rating : { $avg: "$rating"}}}
        )

        //rating exists
        if(avg_rating.length > 0){
            return res.status(200).json({
                success: true,
                Average_rating: avg_rating[0].average_rating,
                message: "Average rating created Succesfully"

            })
        }

        return res.status(200).json({
            success: true,
            Average_rating: 0,
            message: "No Ratings as been alotted"

        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "Error occured while getting an average Rating"
        })
    }
}

exports.get_all_ratings = async (req, res) => {

    try{
        
        const all_rating = await Rating_and_review.find({})
                                                .populate({
                                                    path: "user",
                                                    select: "first_name last_name image"
                                                })
                                                .populate({
                                                    path: "course",
                                                    select: "course_name"
                                                })
                                                .exec();

        return res.status(200).json({
            success: true,
            ratings: all_rating,
            message: "Ratings has been returned succesfully"
        })

    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "Error occured while getting the Ratings of the course"
        })
    }
}


exports.get_course_ratings = async (req, res) => {

    try{
        const course_id = req.body.course_id;
        
        const all_rating = await Rating_and_review.find({course: course_id})
                                                .populate({
                                                    path: "user",
                                                    select: "first_name last_name image"
                                                })
                                                .populate({
                                                    path: "course",
                                                    select: "course_name"
                                                })
                                                .exec();

        return res.status(200).json({
            success: true,
            ratings: all_rating,
            message: "Ratings has been returned succesfully"
        })

    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "Error occured while getting the Ratings of the course"
        })
    }
}

