const mongoose = require("mongoose");

const section_schema = new mongoose.Schema({
    
    section_name: {
        type: String,
    },
    sub_section: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Sub_section",
        }
    ]
    
});

module.exports = mongoose.model("Section", section_schema);