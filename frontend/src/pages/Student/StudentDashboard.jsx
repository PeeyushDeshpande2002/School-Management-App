import { Button, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {setUser, setLoading} from '../../redux/auth/authSlice'
import { useSnackbar } from 'notistack';
import Navbar from '../../Navbar';
import { STUDENT_API_ENDPOINT } from '../../utils/constant';
import GenericTable from '../../shared/GenericTable'
import StudentRoute from './StudentRoute';
import StudentClassDetail from './StudentClassDetail';
const StudentDashboard = () => {
  const[classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const studentClasses = async() => {
    try {
      const res = await fetch(`${STUDENT_API_ENDPOINT}`, {
        method : 'GET', 
        credentials : 'include'
      })
      if(res.ok){
        const data = await res.json();
        setClasses(data);
      }
    } catch (error) {
      console.log(error);   
    }
  }
  useEffect(()=>{
    studentClasses();
  },[]);
  const onClick = (row) => {
    console.log(row._id);
    navigate(`/student/class/${row._id}`)
  }
  const columns = [
    { field: "name", headerName: "Class Name" },
    //{ field: "teacherName", headerName: "Teacher" },
    {field : 'year', headerName:"Year"}
  ];
  return (
    <div style={{width :  1260}}>

      <Navbar/>
      <Container 
      sx={{
        height: '100vh',
        //background: 'linear-gradient(to bottom, #5f2c82, #49a09d)',
        marginTop : '5rem'
      }}>
      
      <GenericTable
      columns={columns}
      data={classes}
      onRowClick={onClick}/>
      </Container>
    </div>
    
  )
}

export default StudentDashboard
