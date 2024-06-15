const express = require("express");
const router = express.Router();

const {auth, is_student, is_instructor, is_admin} = require("../middle_wares/auth");
const { capture_payment, verify_signature, send_payment_successful_mail} = require("../controllers/Payments");


router.post("/capture_payment", auth, is_student, capture_payment);
router.post("/verify_signature", auth, is_student, verify_signature);
router.post("/send_payment_successful_mail", auth, is_student, send_payment_successful_mail)

module.exports = router;