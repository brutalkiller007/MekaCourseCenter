const mongoose = require("mongoose");

const profile_schema = new mongoose.Schema({
    
    gender: {
        type: String,
    },
    date_of_birth: {
        type: String,
    },
    about:{
        type: String,
        trim: true,
    },
    contact_number: {
        type: Number,
        trim: true,
    }
});

module.exports = mongoose.model("Profile", profile_schema);