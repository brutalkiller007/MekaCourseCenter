const Cart = require("../models/Cart");

exports.add_course_to_cart = async (req, res) => {
    try{
        //TODO
        const {cart_id, course_id, updated_total} = req.body;

        if (!cart_id || !course_id || updated_total === undefined) {
            return res.status(400).json({
                success: false,
                message: "MISSING REQUIRED FIELDS"
            });
        }

        const new_cart = await Cart.findByIdAndUpdate(cart_id,
            {
                $push:{
                    cart_courses: course_id
                },
                total_price: updated_total
            }, {new: true});

        if (!new_cart) {
            return res.status(404).json({
                success: false,
                message: "CART NOT FOUND"
            });
        }

        return res.status(200).json({
            success: true,
            new_cart: new_cart,
            message: "COURSE ADDED SUCCESSFULLY TO CART"
         })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE ADDING COURSE TO CART"
        })
    }
}

exports.remove_course_from_cart = async (req, res) => {
    try{
        //TODO
        const {cart_id, course_id, updated_total} = req.body;

        if (!cart_id || !course_id || updated_total === undefined) {
            return res.status(400).json({
                success: false,
                message: "MISSING REQUIRED FIELDS"
            });
        }

        const new_cart = await Cart.findByIdAndUpdate(cart_id,
            {
                $pull:{
                    cart_courses: course_id
                },
                total_price: updated_total
            }, {new: true});

        if (!new_cart) {
            return res.status(404).json({
                success: false,
                message: "CART NOT FOUND"
            });
        }

        return res.status(200).json({
            success: true,
            new_cart: new_cart,
            message: "COURSE REMOVED SUCCESSFULLY TO CART"
         })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE REMOVING COURSE FROM CART"
        })
    }
}

exports.clear_cart = async (req, res) => {
    try{
        //TODO
        const {cart_id} = req.body;

        const new_cart = await Cart.findByIdAndUpdate(cart_id,
            {
                cart_courses: [],
                total_price: 0
            }
            , {new: true});

        return res.status(200).json({
            success: true,
            new_cart: new_cart,
            message: "CART CLEARED SUCCESSFULLY"
         })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE CLEARING THE CART"
        })
    }
}

exports.get_cart_courses = async (req, res) => {

    try{
        
        const {cart_id} = req.body;
        if(!cart_id){
            return res.status(400).json({
                success: false,
                message: "MISSING REQUIRED FIELDS"
            });
        }

        const cart = await Cart.findOne({_id : cart_id})
                                .populate({
                                    path: "cart_courses",
                                    populate: {
                                        path: "category"
                                    }
                                }).exec();

        if(!cart){
            return res.status(404).json({
                success: false,
                message: "CART NOT FOUND"
            });
        }

        return res.status(200).json({
            success: true,
            cart: cart,
            message: "CART FOUND SUCCESSFULLY"
         })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING THE CART DETAILS"
        })
    }
}