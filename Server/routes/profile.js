const express = require("express");
const router = express.Router();

const {auth} = require("../middle_wares/auth");
const {delete_account} = require("../controllers/Delete_account");
const {update_profile, update_dp, get_user_details} = require("../controllers/Profile");

router.delete("/delete_account", auth, delete_account);
router.get("/get_user_details", auth, get_user_details);
router.put("/update_profile", auth, update_profile);
router.put("/update_dp", auth, update_dp);

module.exports = router;