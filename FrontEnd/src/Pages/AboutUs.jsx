import React from 'react'
import HighlightText from '../Components/Home_Page/HighlightText';
import pic1 from "../Assets/Images/aboutus1.webp";
import pic2 from "../Assets/Images/aboutus2.webp";
import pic3 from "../Assets/Images/aboutus3.webp";
import picture from "../Assets/Images/FoundingStory.png";
import { Link } from 'react-router-dom';
import ContactUsForm from '../Components/Common/ContactUsForm';
import Footer from '../Components/Common/Footer';

export default function AboutUs() {
    return (
        <div className='text-white'>
            <div className='bg-richblack-700 relative'>
                <div className='lg:w-3/5 mx-auto relative top-14 w-11/12 flex flex-col gap-4'>
                    <h1 className="text-3xl font-bold text-center">Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"}/></h1>

                    <p className='text-center text-[18px] text-pure-greys-300'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, 
                        leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </div>

                <div className='flex gap-5 justify-center relative top-20 px-5'>
                    <img src={pic1} alt=''></img>
                    <img src={pic2} className='hidden md:block' alt=''></img>
                    <img src={pic3} className='hidden lg:block' alt=''></img>
                </div>
            </div>

            <div className='bg-richblack-900'>

                <div className='h-28 w-full'></div>

                <h1 className="text-2xl font-bold text-center text-pure-greys-300 lg:w-9/12 w-11/12 mx-auto mb-[100px]">We are passionate about revolutionizing the way we learn. Our innovative
                    platform <HighlightText text={" combines technology"}/>, 
                    <span className="bg-gradient-to-r from-[#FF7F50] to-[#FFD700] text-transparent bg-clip-text">expertise </span>
                    and community to create an
                    <span className="bg-gradient-to-r from-[#FF7F50] to-[#FFD700] text-transparent bg-clip-text"> unparalleled educational experience.</span>
                </h1>

                <div className='flex lg:flex-row flex-col gap-5 w-5/6 mx-auto mb-16'>
                    <div className='lg:w-1/2 my-auto lg:px-10'>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#833AB4] via-[#e70b0b] to-[#f6a32f] text-transparent bg-clip-text mb-4">Our Founding Story</h1>

                        <p className='text-[14px] text-pure-greys-300 mb-2'>
                            Our e-learning platform was born out of a shared vision and passion for transforming education. It 
                            all began with a group of educators, technologists, and lifelong learners who recognized the need for 
                            accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>

                        <p className='text-[14px] text-pure-greys-300'>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional 
                            education systems. We believed that education should not be confined to the walls of a classroom or restricted 
                            by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from 
                            all walks of life to unlock their full potential.
                        </p>
                    </div>

                    <img src={picture} alt='' className='lg:px-10'></img>
                </div>

                <div className='flex lg:flex-row flex-col gap-5 w-5/6 mx-auto justify-between pb-16'>
                    <div className='lg:w-1/2 my-auto lg:px-10'>
                        <h1 className="mb-4 text-2xl font-bold bg-gradient-to-r from-[#FF7F50] to-[#FFD700] text-transparent bg-clip-text">Our Vision</h1>

                        <p className='text-[14px] text-pure-greys-300'>
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. 
                            Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content,
                            fostering a dynamic and interactive learning experience.
                        </p>
                    </div>

                    <div className='lg:w-1/2 my-auto lg:px-10'>
                        <h1 className='mb-4 text-2xl font-bold'><HighlightText text={"Our Mission"}/></h1>

                        <p className='text-[14px] text-pure-greys-300'>
                            our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, 
                            and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through
                            forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>

                <div className='bg-richblack-700'>
                    <div className='flex justify-around lg:w-3/4 w-11/12 mx-auto'>
                        <div className='py-5 flex flex-col items-center'>
                            <h1 className='text-xl font-bold'>10K</h1>
                            <p className='text-[14px] text-pure-greys-300'>Active Students</p>
                        </div>

                        <div className='py-5 flex flex-col items-center'>
                            <h1 className='text-xl font-bold'>20+</h1>
                            <p className='text-[14px] text-pure-greys-300'>Mentors</p>
                        </div>


                        <div className='py-5 flex flex-col items-center'>
                            <h1 className='text-xl font-bold'>400+</h1>
                            <p className='text-[14px] text-pure-greys-300'>Courses</p>
                        </div>


                        <div className='py-5 flex flex-col items-center'>
                            <h1 className='text-xl font-bold'>50+</h1>
                            <p className='text-[14px] text-pure-greys-300'>Awards</p>
                        </div>
                    </div>
                </div>

                <div className='py-16 bg-richblack-900 lg:w-3/4 w-11/12 mx-auto flex flex-col items-center gap-4'>
                    <h1 className="text-3xl font-bold text-center text-pure-greys-300 lg:w-9/12 w-11/12 mx-auto">World-Class Learning for
                        <HighlightText text={" Anyone, Anywhere"}/>, 
                    </h1>

                    <p className='text-center text-[18px] text-pure-greys-300'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable,
                     job-relevant online learning to individuals and organizations worldwide.
                    </p>

                    <Link to={"/login"} className='p-3 bg-yellow-100 text-black font-bold rounded-md'>Learn More</Link>
                </div>

                <div className='pb-16 w-11/12 mx-auto'>
                    
                    <div className='mb-4'>
                        <h1 className='text-xl font-bold text-center '>Get in Touch</h1>
                        <p className='text-center text-[14px] text-pure-greys-300'>We'd love to here for you, Please fill out this form.</p>
                    </div>
                    <ContactUsForm/>
                </div>

            </div>

            <Footer/>
        </div>
    )
}
