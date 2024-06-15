const mongoose = require("mongoose");

const cart_schema = new mongoose.Schema({
    cart_courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ],
    total_price: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Cart", cart_schema);