const express = require("express");
const router = express.Router();

const {auth, is_student, is_instructor, is_admin} = require("../middle_wares/auth");
const {create_rating, get_avg_rating, get_all_ratings, get_course_ratings} = require("../controllers/Rating_and_review");
const {create_category, get_all_categories, get_page} = require("../controllers/Category");
const {create_section, update_section, delete_section} = require("../controllers/Section");
const {create_subsection, update_subsection, delete_subsection} = require("../controllers/Sub_section");
const {create_course, edit_course, delete_course, get_all_courses, get_course_details, 
        get_instructor_courses, get_enrolled_courses, get_view_course_details, get_instructor_dashboard_details} = require("../controllers/Course");
const {add_course_to_cart, remove_course_from_cart, clear_cart, get_cart_courses} = require('../controllers/Cart');
const {update_course_progress} = require("../controllers/Course_progress");

router.post("/create_section", auth, is_instructor, create_section);
router.post("/update_section", auth, is_instructor, update_section);
router.delete("/delete_section", auth, is_instructor, delete_section);

router.post("/create_subsection", auth, is_instructor, create_subsection);
router.post("/update_subsection", auth, is_instructor, update_subsection);
router.delete("/delete_subsection", auth, is_instructor, delete_subsection);


router.post("/create_course", auth, is_instructor, create_course);
router.post("/edit_course", auth, is_instructor, edit_course);
router.get("/get_all_courses", get_all_courses);
router.post("/get_course_details", get_course_details);
router.get("/get_instructor_courses", auth, is_instructor, get_instructor_courses);
router.get("/get_enrolled_courses", auth, is_student, get_enrolled_courses);
router.post("/get_view_course_details", auth, is_student, get_view_course_details);
router.delete("/delete_course", auth, is_instructor, delete_course);
router.get("/get_instructor_dashboard_details", auth, is_instructor, get_instructor_dashboard_details);

router.post("/create_rating", auth, is_student, create_rating);
router.get("/get_avg_rating", get_avg_rating);
router.get("/get_all_ratings", get_all_ratings);
router.post("/get_course_ratings", get_course_ratings);

router.post("/create_category", auth, is_admin, create_category);
router.get("/get_all_categories", get_all_categories);
router.post("/get_page", get_page);

router.post("/add_course_to_cart", auth, is_student, add_course_to_cart);
router.post("/remove_course_from_cart", auth, is_student, remove_course_from_cart);
router.post("/clear_cart", auth, is_student, clear_cart);
router.post("/get_cart_courses", auth, is_student, get_cart_courses);

router.post("/update_course_progress", auth, is_student, update_course_progress);

module.exports = router;