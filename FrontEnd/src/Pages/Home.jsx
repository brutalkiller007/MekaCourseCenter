import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../Components/Home_Page/HighlightText";
import banner from "../Assets/Images/banner.mp4";
import TypingAnimation from "../Components/Home_Page/TypingAnimation";
import bg_home from "../Assets/Images/bghome.svg";
import time_line_img from "../Assets/Images/TimelineImage.png";
import Timeline from "../Components/Home_Page/Timeline";
import logo1 from "../Assets/TimeLineLogo/Logo1.svg";
import logo2 from "../Assets/TimeLineLogo/Logo2.svg";
import logo3 from "../Assets/TimeLineLogo/Logo3.svg";
import logo4 from "../Assets/TimeLineLogo/Logo4.svg";
import pic1 from "../Assets/Images/Know_your_progress.svg";
import pic2 from "../Assets/Images/Compare_with_others.svg";
import pic3 from "../Assets/Images/Plan_your_lessons.svg";
import instructor_img from "../Assets/Images/Instructor.png";
import Footer from "../Components/Common/Footer";
import ReviewSlider from "../Components/Common/ReviewSlider";
import toast from "react-hot-toast";

const Home = () => {
    
    useEffect(() => {
        toast.success("IT MAY TAKE SOME TIME TO LOAD FOR EVERY PAGE. PLEASE COOPERATE WITH THIS ISSUE", {duration: 5000})
    }, []);
    return(
        <div className=""> 
            {/* SECTION 1 */}
            <section className="bg-richblack-900">

                <div className="flex flex-col text-white w-11/12 mx-auto items-center justify-between gap-6">

                    <Link to={"/signup"}>
                        <div className="flex bg-richblack-800 py-2 rounded-full px-8 gap-2 text-pure-greys-300 mt-6 group hover:scale-95 font-bold
                                transition-all duration-200 hover:bg-richblack-900 text-[16px]">
                            <p>Become an Instructor </p>
                            <FaArrowRight/>
                        </div>
                    </Link>

                    <h1 className="text-4xl font-bold text-center">Empower Your Future with <HighlightText text={"Coding Skills"}/></h1>

                    <p className="w-[85%] text-[18px] text-pure-greys-300 text-center">With our online coding courses, you can learn at your own pace, from anywhere in the world,
                     and get access to a wealth of resources, including hands-on projects, quizzes, and personalized 
                     feedback from instructors.
                    </p>

                    <div className="flex justify-evenly gap-6">

                        <Link to={"/signup"}>
                            <button className="bg-yellow-100 py-3 px-5 rounded-md text-black font-bold text-[16px] transition-all 
                                duration-200 hover:scale-95">Learn More</button>
                        </Link>

                        <Link to={"/login"}>
                            <button className="flex py-3 px-5 rounded-md gap-2 text-white hover:scale-95 font-bold
                                transition-all duration-200 text-[16px] bg-richblack-800">Book a Demo</button>
                        </Link>
                    
                    </div>

                    <div className="lg:w-4/5 sm:w-full my-5">
                        <video muted loop autoPlay> <source src={banner} type="video/mp4"/></video>
                    </div>

                </div>

            </section>

            {/* SECTION 2 */}
            <section className="bg-richblack-900 ">

                <div className="md:w-10/12 w-11/12 mx-auto flex flex-col p-7">
                    
                    <div className="lg:flex lg:gap-10 mb-5 justify-between lg:flex-row">
                        <div className="flex flex-col gap-8 lg:w-[50%] sm:w-full mb-8">
                            <h1 className="text-4xl font-bold text-white">Unlock your <HighlightText text={"coding potential"}/> with our online courses.</h1>

                            <p className="text-[18px] text-pure-greys-300 font-bold">Our courses are designed and taught by industry experts who have years of experience
                             in coding and are passionate about sharing their knowledge with you.</p>

                            <div className="flex gap-6 items-center justify-start">
                                <Link to={"/signup"} className="">
                                    <button className="bg-yellow-100 py-3 px-5 rounded-md text-black font-bold text-[16px] transition-all 
                                        duration-200 hover:scale-95">
                                        Try it Yourself
                                    </button>
                                </Link>

                                <Link to={"/login"}>
                                    <button className="flex py-3 px-5 rounded-md gap-2 text-white hover:scale-95 font-bold
                                        transition-all duration-200 text-[16px] bg-richblack-800">Learn More</button>
                                </Link>
                            </div>
                            
                        </div>

                        <div className="md:w-[50%]">
                            <TypingAnimation color={true}></TypingAnimation>
                        </div>
                    </div>

                    <div className="lg:flex lg:flex-row-reverse gap-10 mt-[50px] lg:mt-0 items-stretch ">

                        <div className="flex flex-col gap-8 lg:w-[50%] mb-8 ">
                            <h1 className="text-4xl font-bold text-white">Start <HighlightText text={"coding in seconds"}/></h1>

                            <p className="text-[18px] text-pure-greys-300 font-bold">Go ahead, give it a try. Our hands-on learning environment means you'll be writing real 
                            code from your very first lesson.</p>

                            <div className="flex gap-6 items-center justify-start">
                                <Link to={"/signup"} className="">
                                    <button className="bg-yellow-100 py-3 px-5 rounded-md text-black font-bold text-[16px] transition-all 
                                        duration-200 hover:scale-95">
                                        Continue lesson
                                    </button>
                                </Link>

                                <Link to={"/login"}>
                                    <button className="flex py-3 px-5 rounded-md gap-2 text-white hover:scale-95 font-bold
                                        transition-all duration-200 text-[16px] bg-richblack-800">Learn More</button>
                                </Link>
                            </div>
                            
                        </div>

                        <div className="lg:w-[50%]">
                            <TypingAnimation color={false}></TypingAnimation>
                        </div>
                    </div>
                    
                </div>
            </section>
            
            {/* SECTION 3 */}
            <section>
                <div className="w-11/12 lg:w-10/12 relative mx-auto h-[350px] gap-[75px]">

                    <div className="w-full absolute flex">
                        <img src={bg_home} alt="bg_home" className="lg:w-1/3 md:w-1/2"></img>
                        <img src={bg_home} alt="bg_home" className="lg:w-1/3 md:w-1/2 md:block hidden"></img>
                        <img src={bg_home} alt="bg_home" className="lg:w-1/3 lg:block hidden"></img>
                    </div>

                    <div className="flex justify-center top-[120px] gap-6 relative z-10">

                        <Link to={"/signup"}>
                            <button className="bg-yellow-100 py-3 px-5 rounded-md text-black font-bold text-[16px] transition-all 
                                duration-200 hover:scale-95">Explore Full Catalog</button>
                        </Link>

                        <Link to={"/login"}>
                            <button className="flex py-3 px-5 rounded-md gap-2 text-white hover:scale-95 font-bold
                                transition-all duration-200 text-[16px] bg-richblack-800">Learn More</button>
                        </Link>
                    
                    </div>

                </div>

                <div className="w-11/12 lg:w-10/12 relative mx-auto md:flex gap-6 my-6">
                    <h1 className="text-4xl font-bold md:w-1/2 mb-4"> Get the skills you need for a <HighlightText text={"job that is in demand"}/></h1>

                    <div className="flex flex-col gap-8 md:w-1/2">
                        <p className=" text-[18px] text-black font-bold text-xl">The modern StudyNotion is the dictates its own terms. Today,
                         to be a competitive specialist requires more than professional skills.
                        </p>

                        <Link to={"/signup"}>
                            <button className="bg-yellow-100 py-3 px-5 rounded-md text-black font-bold text-[16px] transition-all 
                                duration-200 hover:scale-95">Learn More</button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SECTION 4 */}
            <section className="my-[25px]">

                <div className="w-11/12 lg:w-10/12 mx-auto lg:flex mt-[100px]">

                    <div className="lg:w-2/5 flex flex-col justify-center my-auto">
                        <Timeline img={logo1} title={"Leadership"} description={"Fully committed to the success company"}></Timeline>
                        <Timeline img={logo2} title={"Responsibility"} description={"Students will always be our top priority"}></Timeline>
                        <Timeline img={logo3} title={"Flexibility"} description={"The ability to switch is an important skills"}></Timeline>
                        <Timeline img={logo4} title={"Solve the problem"} description={"Code your way to a solution"}></Timeline>
                    </div>

                    <div className="lg:w-3/5">
                        <img src={time_line_img} alt="time_line_img"></img>
                    </div>
                </div>
            </section>

            {/* SECTION 5 */}
            <section>
                <div className="w-11/12 lg:w-10/12 mx-auto mt-[100px] flex flex-col gap-4 items-center mb-[50px]">
                    <h1 className="text-3xl font-bold">Your swiss knife for <HighlightText text={"learning any language"}/></h1>

                    <p className="lg:w-[65%] text-[18px] text-black text-center font-semibold">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, 
                    custom schedule and more.
                    </p>
                    
                    <div className="md:flex gap-2 md:flex-row">
                        <img src={pic1} alt="Know_your_progress.svg" width={400} className="lg:-mr-32"></img>
                        <img src={pic2} alt="Compare_with_others.svg" width={400} className="lg:-mr-32"></img>
                        <img src={pic3} alt="Plan_your_lessons.svg" width={400} className="hidden lg:block"></img>
                    </div>

                    <Link to={"/signup"}>
                            <button className="bg-yellow-100 py-3 px-5 rounded-md text-black font-bold text-[16px] transition-all 
                                duration-200 hover:scale-95">Learn More</button>
                    </Link>
                </div>
            </section>

            {/* SECTION 6*/}
            <section className="bg-richblack-900 p-10">
                <div className="w-11/12 lg:w-10/12 flex lg:flex-row flex-col gap-6 justify-evenly mx-auto">
                    <img src={instructor_img} alt="instructor_image" width={500}></img>

                    <div className="lg:w-[400px] flex flex-col my-auto gap-6">
                        <h1 className="text-3xl text-white font-bold">Become an <HighlightText text={"Instructor"}/></h1>

                        <p className="text-pure-greys-300 md:mb-10">Instructors from around the world teach millions of students on StudyNotion.
                         We provide the tools and skills to teach what you love.</p>

                        <Link to={"/signup"}>
                            <button className="bg-yellow-100 py-3 w-full rounded-md text-black font-bold text-[16px] transition-all 
                                duration-200 hover:scale-95">Search Teaching Today</button>
                        </Link>
                    </div>
                </div>
            </section>

            <div className="bg-richblack-900 text-white">

                <div className="w-11/12 lg:3/4 mx-auto">
                    <h1 className="font-bold text-center text-2xl">Rating and Reviews of our Courses from Other Learners</h1>
                    <ReviewSlider all_ratings={true}/>
                </div>

            </div>

            <Footer>

            </Footer>
        </div>
    )
}

export default Home;