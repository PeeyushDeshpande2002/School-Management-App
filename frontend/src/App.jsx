import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Homepage from './components/pages/Homepage'; // Adjust path if needed
import './App.css'
import Homepage from './pages/HomePage';
import Login from './pages/Login';
import ChooseUser from './pages/ChooseUser';
import AdminHomePage from './pages/Admin/AdminHomePage';
import StudentHomePage from './pages/Student/StudentHomePage';
import TeacherHomePage from './pages/Teacher/TeacherHomePage';
import StudentClassDetail from './pages/Student/StudentClassDetail'
import { Profile } from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import TeacherClassDetail from './pages/Teacher/TeacherClassDetail';
import ProtectedRoute from './pages/Admin/ProtectedRoute';
import TeacherRoute from './pages/Teacher/TeacherRoute';
import StudentRoute from './pages/Student/StudentRoute';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path='/role' element= {<ChooseUser/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path = '/admin/*' element = {<AdminHomePage/>}/>
            <Route path = '/student' element = {<StudentRoute><StudentHomePage/></StudentRoute>}/>
            <Route path = '/student/class/:id' element = {<StudentRoute><StudentClassDetail/></StudentRoute>}/>
            <Route path = '/teacher' element = {<TeacherRoute><TeacherHomePage/></TeacherRoute>}/>
            <Route path='/teacher/class/:id' element = {<TeacherRoute><TeacherClassDetail/></TeacherRoute>}/>
            <Route path = '/teacher/profile' element = {<TeacherRoute><Profile/></TeacherRoute>}/>
            <Route path = '/student/profile' element = {<StudentRoute><Profile/></StudentRoute>}/>
            {/* <Route path = '/student/profile/edit' element = {<ProfileEdit/>}/> */}
            <Route path = '/profile/edit' element = {<ProfileEdit/>}/>
        </Routes>
    </Router>
);
}

export default App
