const express = require("express")
const router = express.Router()
const {contact_us} = require("../controllers/Contact_us");

router.post("/contact_us", contact_us)

module.exports = router