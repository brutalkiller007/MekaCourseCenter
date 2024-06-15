const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim : true,
    },
    last_name: {
        type: String,
        required: true,
        trim : true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    contact_number: {
        type: Number,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    account_type: {
        type: String,
        required: true,
        enum: ["Admin", "Student", "Instructor"],
    },
    additional_details: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ],
    image: {
        type: String,
    },
    token: {
        type: String,
    },
    reset_password_expiry_time: {
        type: Date,
    },
    course_progress : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course_progress",
        }
    ],
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
    }
});

module.exports = mongoose.model("User", user_schema);