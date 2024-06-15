import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from './Pages/Home';
import { NavBar } from './Components/Common/NavBar';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ResetPassword from './Pages/ResetPassword';
import UpdatePassword from './Pages/UpdatePassword';
import VerifyOtp from './Pages/VerifyOtp';
import { Dashboard } from './Pages/Dashboard';
import ProtectedRoute from './Components/Common/ProtectedRoute';
import MyProfile from './Pages/MyProfile';
import Settings from './Pages/Settings/Settings';
import AddCourse from './Pages/AddCourse/AddCourse';
import MyCourses from './Pages/MyCourses/MyCourses';
import { EditCourse } from './Pages/EditCourse';
import { useSelector } from 'react-redux';
import Catalog from './Pages/Catalog/Catalog';
import CoursePage from './Pages/CoursePage/CoursePage';
import Cart from './Pages/Cart';
import EnrolledCourses from './Pages/EnrolledCourses';
import ViewCourse from './Pages/ViewCourse';
import VideoPlayer from './Pages/ViewCourse/VideoPlayer';
import InstructorDashboard from './Pages/InstructorDashboard/InstructorDashboard';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import PageNotFound from './Pages/PageNotFound';

function App() {

  const {user_details} = useSelector((state) => state.profile);
  return (
    <div className="App">
        <NavBar/>

        <div className='w-screen h-[3.5rem] bg-richblack-5'>

        </div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>

          <Route path='/reset_password' 
            element= {<ResetPassword/>}
          />

          <Route path='/catalog/:category_name' 
            element= {<Catalog/>}
          />

          <Route path='/course/:course_id' 
            element= {<CoursePage/>}
          />        

          <Route path='/update_password/:id' 
            element= {<UpdatePassword/>}
          />

          <Route path='/verify_otp' 
            element= {<VerifyOtp/>}
          />

          <Route path='/about' 
            element= {<AboutUs/>}
          />

          <Route path='/contact' 
            element= {<ContactUs/>}
          />

          <Route path='*' element={<PageNotFound/>}/>
          <Route
              element= {
                  <ProtectedRoute>
                      <Dashboard/>
                  </ProtectedRoute>
              }>


              <Route path='dashboard/my_profile' element={<MyProfile/>}/>
              <Route path='dashboard/settings' element={<Settings/>}/>
              
              {
                user_details?.account_type === "Student" && (
                  <>
                    <Route path='dashboard/cart' element={<Cart/>}/>
                    <Route path='dashboard/enrolled_courses' element={<EnrolledCourses/>}/>
                  </>
                )
              }
            
              {
                 user_details?.account_type === "Instructor" && (
                  <>
                    <Route path='dashboard/add_course' element={<AddCourse/>}/>
                    <Route path='dashboard/my_courses' element={<MyCourses/>}/>
                    <Route path='dashboard/edit_course/:id' element={<EditCourse/>}/>
                    <Route path='dashboard/instructor' element={<InstructorDashboard/>}/>
                    
                  </>
                 )
              }
              
          </Route>

          <Route element={
            <ProtectedRoute>
                <ViewCourse/>
            </ProtectedRoute>
          }>

            <Route path='view_course/:course_id/section/:section_id/sub_section/:sub_section_id' element={<VideoPlayer/>}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
