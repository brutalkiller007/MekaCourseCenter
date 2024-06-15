const Category = require("../models/Category");
const Course = require("../models/Course");

exports.create_category = async (req, res) => {
    try{

        //get details
        const {name, description} = req.body;

        //check all fields are not empty
        if(!name || !description){
            return res.status(401).json({
                success: false,
                message: "ALL FIELDS ARE MANDATORY TO FILL."
            })
        }

        //tag creation in DB
        const category = await Category.create({
            name : name,
            description: description,
        })

        return res.status(200).json({
            success: true,
            message: "CATEGORY HAS BEEN CREATED SUCCESSFULLY",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE CREATING THE CATEGORY",
        })
    }
}

exports.get_all_categories = async (req, res) => {

    try{
        const all_category = await Category.find({}, {name : true, description: true});

        return res.status(200).json({
            success: true,
            categories: all_category,
            message: "ALL CATEGORIES RETURNED SUCCESSFULLY",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED OBTAINING ALL THE AVAILABLE CATEGORY",
        })
    }
}

exports.get_page = async (req, res) => {
    
    try{
        
        const {category_id} = req.body;

        const selected_category = await Category.findById(category_id).populate({
            path : "courses",
            match: {status : "Published"},
            populate: [
                {path: "rating_and_reviews"},
                {path: "instructor"}
            ]
        }).exec();

        if(!selected_category){
            return res.status(404).json({
                success: false,
                message: "SELECTED CATEGORY COURSES NOT FOUND"
            })
        }

        const different_category = await Category.findOne({ _id: { $ne: category_id}}).populate({
            path : "courses",
            match: {status : "Published"},
            populate: [
                {path: "rating_and_reviews"},
                {path: "instructor"}
            ]
        }).exec();


        if(!different_category){
            return res.status(404).json({
                success: false,
                message: "DIFFERENT CATEGORY COURSES NOT FOUND"
            })
        }

        const all_courses = await Course.find({status: "Published"}).populate([
            {path: "rating_and_reviews"},
            {path: "instructor"}
        ]).exec()

        const top_courses = all_courses.sort((a, b) => b.students_enrolled.length - a.students_enrolled.length).slice(0,10);

        return res.status(200).json({
            success: true,
            selected_category: selected_category,
            different_category: different_category,
            top_courses : top_courses,
            message: "PAGE DETAILS HAS BEEN RETURNED SUCCESFULLY"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED OBTAINING THE DETAILS FOR THE PAGE",
        })
    }
}