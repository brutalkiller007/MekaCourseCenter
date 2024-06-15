const mongoose = require("mongoose");

const course_schema = new mongoose.Schema({
    
    course_name: {
        type: String,
        trim: true,
        required: true,
    },
    course_description: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    what_you_will_learn: {
        type: String,
    },
    course_content: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }
    ],
    rating_and_reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rating_and_review",
        }
    ],
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    students_enrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    tag: {
        type: [String],
        required: true,
    },
    instructions: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    },
    total_lectures: {
        type: Number
    },
    created_at: {
        type: Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("Course", course_schema);