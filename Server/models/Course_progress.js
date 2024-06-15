const mongoose = require("mongoose");

const course_progress_schema = new mongoose.Schema({
    
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    course_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    completed_videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sub_section",
        }
    ]
});

module.exports = mongoose.model("Course_progress", course_progress_schema);