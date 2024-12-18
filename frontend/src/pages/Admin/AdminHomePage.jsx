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

const AdminHomePage = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
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
                    <Route path='/' element = {<DashBoard/>}/>
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/classes/new" element={<NewClass />} />
                    <Route path="/students" element={<Students />} />
                    <Route path = '/students/:id' element= {<StudentDetail/>}/>
                    <Route path = '/classes/edit' element = {<EditClass/>}/>
                    <Route path = '/classes/:id' element = {<ClassDetail/>}/>
                    <Route path = '/teachers' element ={<Teachers/>}/>
                    <Route path='/teachers/:id' element = {<TeacherDetail/>}/>
                    <Route path = '/classes/:id/analytics' element= {<ClassAnalytics/>}/>
                    <Route path = '/students/create' element = {<CreateStudent/>}/>
                    <Route path = '/teachers/create' element = {<CreateTeacher/>}/>

                </Routes>
            </Box>
        </Box>
    );
}

export default AdminHomePage
