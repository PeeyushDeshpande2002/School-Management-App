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
        </Routes>
    </Router>
);
}

export default App
