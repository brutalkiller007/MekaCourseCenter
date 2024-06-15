import toast from "react-hot-toast";
import { api_connector } from "../apiConnector";
import { payments } from "../apis";
import { set_payment_loading } from "../../Slices/courseSlice";
import { clear_cart, remove_course_from_cart } from "./Cart";

function load_script(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        };

        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buy_courses(courses, token, user_details, dispatch, navigate, flag){
    const toast_id = toast.loading("LOADING....");

    try{
        const script = load_script("https://checkout.razorpay.com/v1/checkout.js");

        if(!script){
            toast.error("RAZOR PAY SDK FAILED TO LOAD. PLEADE CHECK YOUR INTERNET CONNECTION.")
            return false;
        }

        const order_response = await api_connector("POST", payments.CAPTURE_PAYMENT, {courses: courses}, {Authorization: `Bearer ${token}`});

        console.log(order_response);

        if(!order_response.data.success){
            throw new Error(order_response.data.message);
        }

        const options = {
            key : process.env.RAZOR_PAY_KEY_ID,
            currency : order_response.data.order_response.currency,
            amount: `${order_response.data.order_response.amount}`,
            order_id: order_response.data.order_response.id,
            name: "MEKA'S_STUDY_NOTION",
            description: "Thank You for purchasing the Course",
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ARazorpay_logo.webp&psig=AOvVaw39WvEC3fIFAgDl-gz4cBeR&ust=1717867921971000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNjXweqCyoYDFQAAAAAdAAAAABAE",
            prefill: {
                name: `${user_details.first_name} ${user_details.last_name}`,
                email: user_details.email
            },
            handler: async function(response){

                await verify_payment({...response, courses}, token, dispatch, navigate); 
                await send_payment_success_mail(response, order_response.data.order_response.amount, token);

                if(flag !== undefined){
                    dispatch(remove_course_from_cart(flag.cart_id, flag.course_id, flag.total, token))
                }
                else{
                    dispatch(clear_cart(user_details.cart._id, token));
                }
            }
        }

        const payment_object = new window.Razorpay(options);

        payment_object.open();
        payment_object.on("payment.failure", function(response){
            toast.error("OOPS!! PAYMENT FAILED");
            console.log(response.error);
        })
    }
    catch(error){
        console.log("PAYMENT API ERROR....", error);
        toast.error(error.response.data.message || "PAYMENT API ERROR");
    }
    toast.dismiss(toast_id);
}

async function send_payment_success_mail(response, amount, token){
    
    try {
		await api_connector("POST", payments.SEND_PAYMENT_SUCCESSFUL_MAIL,{
            amount: amount,
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id
        } ,
        {Authorization: `Bearer ${token}`});
        

	} catch (error) {
		toast.error(error.response.data.message);
	}

}

async function verify_payment(body_data, token, dispatch, navigate){
    const toast_id = toast.loading("VERIFYING PAYMENT.....");
    dispatch(set_payment_loading(true));
    try{
        const response = await api_connector("POST", payments.VERIFY_SIGNATURE, body_data, {Authorization: `Bearer ${token}`});

        if (!response.data.success) {
			throw new Error(response.data.message);
		}

        toast.success("PAYMENT SUCCESSFUL. REGISTRATION TO THE COURSES DONE SUCCESFULLY.");
        navigate("/dashboard/enrolled_courses");
    }
    catch(error){
        toast.error(error.response.data.message)
        console.log(error);
    }
    toast.dismiss(toast_id);
    dispatch(set_payment_loading(false));
}