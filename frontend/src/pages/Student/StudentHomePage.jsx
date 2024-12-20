
import React, { useEffect, useState } from 'react'

import { Route, Routes, useNavigate } from 'react-router-dom';
import StudentRoute from './StudentRoute';
import StudentClassDetail from './StudentClassDetail';
import StudentDashboard from './StudentDashboard';
import { Profile } from '../Profile';
const StudentHomePage = () => {

  return (
    <div style={{width :  1260}}>
      <Routes>
            <Route path='/' element={<StudentRoute><StudentDashboard/></StudentRoute>}/> 
            <Route path='/profile' element={<StudentRoute><Profile/></StudentRoute>}/> 
            <Route path='/class/:id' element={<StudentRoute><StudentClassDetail/></StudentRoute>}/> 
            {/* <Route path='/profile' element={<StudentRoute><Profile/></StudentRoute>}/>          */}
      </Routes>
    </div>
    
  )
}

export default StudentHomePage
