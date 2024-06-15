const BASE_URL = process.env.REACT_APP_BASE_URL

export const auth = {
    SEND_OTP : BASE_URL + "/auth/send_otp",
    LOGIN : BASE_URL + "/auth/login",
    RESET_PASSWORD_TOKEN : BASE_URL + "/auth/reset_password_token",
    RESET_PASSWORD : BASE_URL + "/auth/reset_password",
    SIGNUP : BASE_URL + "/auth/signup",
    CHANGE_PASSWORD : BASE_URL + "/auth/change_password",
}

export const categories = {
    GET_CATEGORIES : BASE_URL + "/course/get_all_categories",
    GET_PAGE : BASE_URL + "/course/get_page"
}

export const profile = {
    UPDATE_DP : BASE_URL + "/profile/update_dp",
    UPDATE_INFO : BASE_URL + "/profile/update_profile",
    DELETE_ACCOUNT : BASE_URL + "/profile/delete_account"
}

export const course = {
    CREATE_COURSE : BASE_URL + "/course/create_course",
    EDIT_COURSE : BASE_URL + "/course/edit_course",
    GET_INSTRUCTOR_COURSES : BASE_URL + "/course/get_instructor_courses",
    DELETE_COURSE : BASE_URL + "/course/delete_course",
    GET_COURSE_DETAILS : BASE_URL + "/course/get_course_details",
    GET_ENROLLED_COURSES : BASE_URL + "/course/get_enrolled_courses",
    GET_VIEW_COURSE_DETAILS : BASE_URL + "/course/get_view_course_details",
    GET_INSTRUCTOR_DASHBOARD_DETAILS : BASE_URL + "/course/get_instructor_dashboard_details"
}

export const section = {
    CREATE_SECTION : BASE_URL + "/course/create_section",
    UPDATE_SECTION : BASE_URL + "/course/update_section",
    DELETE_SECTION : BASE_URL + "/course/delete_section"
}

export const sub_section = {
    CREATE_SUB_SECTION : BASE_URL + "/course/create_subsection",
    UPDATE_SUB_SECTION : BASE_URL + "/course/update_subsection",
    DELETE_SUB_SECTION : BASE_URL + "/course/delete_subsection"
}

export const payments = {
    CAPTURE_PAYMENT : BASE_URL + "/payment/capture_payment",
    VERIFY_SIGNATURE : BASE_URL + "/payment/verify_signature",
    SEND_PAYMENT_SUCCESSFUL_MAIL : BASE_URL + "/payment/send_payment_successful_mail"
}

export const cart = {
    ADD_TO_CART : BASE_URL + "/course/add_course_to_cart",
    REMOVE_FROM_CART : BASE_URL + "/course/remove_course_from_cart",
    CLEAR_CART: BASE_URL + "/course/clear_cart",
    GET_CART_COURSES: BASE_URL + "/course/get_cart_courses"
}

export const course_progress = {
    UPDATE_COURSE_PROGRESS : BASE_URL + "/course/update_course_progress"
}

export const rating_and_reviews = {
    ADD_RATING_AND_REVIEW : BASE_URL + "/course/create_rating",
    GET_COURSE_RATINGS : BASE_URL + "/course/get_course_ratings",
    GET_ALL_RATINGS : BASE_URL + "/course/get_all_ratings",
}

export const contact_us = {
    CONTACT_US : BASE_URL + "/contact_us"
}