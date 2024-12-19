import React from 'react'

import { Box, Typography } from '@mui/material';
import Sidebar from './Sidebar'
import Classes from './AdminClasses/Classes';
import Students from './AdminSudents/Students';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './DashBoard';
import NewClass from './AdminClasses/NewClass';
import EditClass from './AdminClasses/EditClass';
import Teachers from './AdminTeacher/Teachers';
import StudentDetail from './AdminSudents/StudentDetail';
import TeacherDetail from './AdminTeacher/TeacherDetail';
import ClassDetail from './AdminClasses/ClassDetail';
import ClassAnalytics from './AdminClasses/ClassAnalytics';
import CreateStudent from './AdminSudents/CreateStudent';
import CreateTeacher from './AdminTeacher/CreateTeacher';
import ProtectedRoute from './ProtectedRoute';

const AdminHomePage = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', width : 1280, color :'black' }}>
            {/* Sidebar Section */}
            <Box
                sx={{
                    width: 240, // Sidebar width
                    flexShrink: 0,
                    bgcolor: 'background.paper',
                    borderRight: '1px solid #ddd', // Optional: Sidebar border
                }}
            >
                <Sidebar/>
            </Box>

            {/* Main Content Section */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: '#f9f9f9', // Light background for content
                }}
            >
                <Routes>
                    <Route path='/' element = {<ProtectedRoute><DashBoard/></ProtectedRoute>}/>
                    <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
                    <Route path="/classes/new" element={<ProtectedRoute><NewClass /></ProtectedRoute>} />
                    <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
                    <Route path = '/students/:id' element= {<ProtectedRoute><StudentDetail/></ProtectedRoute>}/>
                    <Route path = '/classes/edit' element = {<ProtectedRoute><EditClass/></ProtectedRoute>}/>
                    <Route path = '/classes/:id' element = {<ProtectedRoute><ClassDetail/></ProtectedRoute>}/>
                    <Route path = '/teachers' element ={<ProtectedRoute><Teachers/></ProtectedRoute>}/>
                    <Route path='/teachers/:id' element = {<ProtectedRoute><TeacherDetail/></ProtectedRoute>}/>
                    <Route path = '/classes/:id/analytics' element= {<ProtectedRoute><ClassAnalytics/></ProtectedRoute>}/>
                    <Route path = '/students/create' element = {<ProtectedRoute><CreateStudent/></ProtectedRoute>}/>
                    <Route path = '/teachers/create' element = {<ProtectedRoute><CreateTeacher/></ProtectedRoute>}/>

                </Routes>
            </Box>
        </Box>
    );
}

export default AdminHomePage
