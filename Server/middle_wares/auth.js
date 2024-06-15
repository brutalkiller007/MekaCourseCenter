const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {

    try{
        //Extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        console.log(req.body);
        //Check token Presence
        if(!token){
            return res.status(401).json({
                success: false,
                message: "TOKEN IS MISSING",
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            console.log(decode);
            req.user = decode;
        }
        catch(error){

            //Token verification failed
            return res.status(401).json({
                success: false,
                message: "LOGIN TIME EXPIRED. PLEASE LOGIN AGAIN",
            })
        }

        next();
    }
    catch(error){
        return res.status(500).json({
            status: false,
            message: "SOMETHING WENT WRONG WHILE VALIDATING TOKEN",
        })
    }
}

//VALIDATING WHETHER THE USER IS A STUDENT
exports.is_student = async(req, res, next) => {
    try{
        if(req.user.account_type !== "Student"){
            return res.status(401).json({
                success: true, 
                message: "THIS IS A PROTECTED ROUTE FOR STUDENT ONLY"
            })
        }

        next();
    }
    catch(error){
        return res.status(500).json({
            success: true,
            details: error.message,
            message: "ERROR OCCURED WHILE VALIDATING THE ROLE OF THE USER"
        })
    }
}

//VALIDATING WHETHER THE USER IS A INSTRUCTOR
exports.is_instructor = async(req, res, next) => {
    try{
        if(req.user.account_type !== "Instructor"){
            return res.status(401).json({
                success: true, 
                message: "THIS IS A PROTECTED ROUTE FOR INSTRUCTOR ONLY"
            })
        }

        next();
    }
    catch(error){
        return res.status(500).json({
            success: true,
            details: error.message,
            message: "ERROR OCCURED WHILE VALIDATING THE ROLE OF THE USER"
        })
    }
}

//VALIDATING WHETHER THE USER IS A ADMIN
exports.is_admin = async(req, res, next) => {
    try{
        if(req.user.account_type !== "Admin"){
            return res.status(401).json({
                success: true, 
                message: "THIS IS A PROTECTED ROUTE FOR ADMIN ONLY"
            })
        }

        next();
    }
    catch(error){
        return res.status(500).json({
            success: true,
            details: error.message,
            message: "ERROR OCCURED WHILE VALIDATING THE ROLE OF THE USER"
        })
    }
}