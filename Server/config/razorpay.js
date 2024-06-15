const RazorPay = require("razorpay");
require("dotenv").config();

exports.instance = new RazorPay({
    key_id : process.env.RAZOR_PAY_KEY_ID,
    key_secret : process.env.RAZOR_PAY_KEY_SECRET
})