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
import { Profile } from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path='/role' element= {<ChooseUser/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path = '/admin/*' element = {<AdminHomePage/>}/>
            <Route path = '/student' element = {<StudentHomePage/>}/>
            <Route path = '/teacher' element = {<TeacherHomePage/>}/>
            <Route path = '/teacher/profile' element = {<Profile/>}/>
            <Route path = '/student/profile' element = {<Profile/>}/>
            {/* <Route path = '/student/profile/edit' element = {<ProfileEdit/>}/> */}
            <Route path = '/profile/edit' element = {<ProfileEdit/>}/>
        </Routes>
    </Router>
);
}

export default App
