const mongoose = require("mongoose");

const category_schema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ]
});

module.exports = mongoose.model("Category", category_schema);