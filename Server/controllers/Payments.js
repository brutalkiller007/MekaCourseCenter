const {instance} = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const Course_progress = require("../models/Course_progress");
const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();
const mail_sender = require("../utils/mail_sender");
const { payment_success_mail } = require("../Mail/payment_success_mail");
const { course_enrollment_email } = require("../Mail/course_enrollment_email");


exports.capture_payment = async (req, res) => {

    const {courses} = req.body;
    const user_id = req.user.id;

    const uid = new mongoose.Types.ObjectId(user_id);

    if(courses.length === 0 || !courses){
        return res.status(404).json({
            success: false,
            message: "NO COURSE IS SELECTED"
        })
    }
    let total = 0;

    for(const course_id of courses){
        let course;

        try{
            course = await Course.findById(course_id);

            if(!course){
                return res.status(400).json({
                    success: false,
                    message: "UNABLE TO FIND THE COURSE"
                })
            }

            if(course.students_enrolled.includes(uid)){
                return res.status(400).json({
                    success: false,
                    message: "USER ALREADY REGISTERED IN ONE OF THE COURSE"
                })
            }

            total += course.price;
        }
        catch(error){
            return res.status(500).json({
                success: false,
                details: error.message,
                message: "ERROR OCCURED WHILE VALIDATING THE COURSES"
            })
        }
    }
    const options = {
        amount : total * 100,
        currency : "INR",
        receipt : (Math.random() * Date.now()).toString()
    }

    try{
        const order_response = await instance.orders.create(options);
        console.log(order_response);
        
        return res.status(200).json({
            success: true,
            order_response: order_response
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE CREATING ORDER RESPONSE"
        })
    }
}

exports.verify_signature = async (req, res) => {

    const razorpay_order_id = req.body.razorpay_order_id;
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_signature = req.body.razorpay_signature;

    const courses = req.body.courses;
    const user_id = req.user.id;

    if(!razorpay_order_id, !razorpay_payment_id, !razorpay_signature, !courses, !user_id){
        return res.status(500).json({
            success: false,
            message: "PAYMENT VERIFICATION FAILED"
        })
    }

    let body = razorpay_order_id + '|' + razorpay_payment_id;

    const hash = crypto.createHmac("sha256", process.env.RAZOR_PAY_KEY_SECRET)
                        .update(body.toString())
                        .digest("hex");
                    
    if(hash === razorpay_signature){
        await enroll_student(courses, user_id, res);

        res.status(200).json({
            success: true,
            message: "PAYMENT VERIFIED"
        })
    }
    else{
        res.status(500).json({
            success: false,
            message: "PAYMENT VERIFICATION FAILED"
        })
    }
}

const enroll_student = async (courses, user_id, res) => {

    if(!courses || !user_id){
        return res.status(400).json({
            success: false,
            message: "PLEASE PROVIDE USER ID AND COURSES"
        })
    }

    for(const course_id of courses){
        try{

            const course = await Course.findByIdAndUpdate(course_id,
                {
                    $push : {
                        students_enrolled: user_id
                    }
                }, {new: true});
            
            if(!course){
                res.status(404).json({
                    success: false,
                    message: "COURSE NOT FOUND"
                })
            }

            const course_progress = await Course_progress.create({
                user_id: user_id,
                course_id : course_id,
                completed_videos: []
            })

            const enrolled_student = await User.findByIdAndUpdate(user_id, 
                {
                    $push: {
                        courses: course_id,
                        course_progress: course_progress._id
                    },
                },
                {new : true});

            const email_response = await mail_sender(enrolled_student.email, `Successfully enrolled into ${course.course_name}`, 
                            course_enrollment_email(course.course_name, `${enrolled_student.first_name} ${enrolled_student.last_name}`));
        }
        catch(error){
            return res.status(500).json({
                success: false,
                datails: error.message,
                message: 'ERROR OCCURED WHILE ENROLLING THE STUDENT INTO THE COURSE'
            })
        }
    }
}

exports.send_payment_successful_mail = async (req, res) => {

    const {order_id, payment_id, amount} = req.body;
    const user_id = req.user.id;

    if(!order_id || !payment_id || !amount || !user_id){
        return res.status(400).json({
            success: false,
            message: "PLEASE PROVIDE ALL THE DETAILS",
        })
    }
    try{
        const enrolled_student = await User.findById(user_id);

        const mail_response = await mail_sender(enrolled_student.email, "PAYMENT RECEIVED", 
                        payment_success_mail(`${enrolled_student.first_name} ${enrolled_student.last_name}`, amount /100, order_id, payment_id));

    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE SENDING PAYMENT SUCCESSFUL MAIL"
        })
    }
}