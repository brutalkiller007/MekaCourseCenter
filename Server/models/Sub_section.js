const mongoose = require("mongoose");

const sub_section_schema = new mongoose.Schema({
    
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    video_url:{
        type: String,
    },
    duration:{
        type: Number,
    }
});

module.exports = mongoose.model("Sub_section", sub_section_schema);