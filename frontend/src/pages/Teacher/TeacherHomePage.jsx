import { Button, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setUser, setLoading} from '../../redux/auth/authSlice'
import { useSnackbar } from 'notistack';
import Navbar from '../../Navbar';
import { STUDENT_API_ENDPOINT, TEACHER_API_ENDPOINT } from '../../utils/constant';
import GenericTable from '../../shared/GenericTable'
const TeacherHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{enqueueSnackbar} = useSnackbar();
  const { user, loading } =  useSelector((store) => store.auth);
  const[classes, setClasses] = useState([]);
  
  const teacherClasses = async() => {
    try {
      const res = await fetch(`${TEACHER_API_ENDPOINT}`, {
        method : 'GET', 
        credentials : 'include'
      })
      if(res.ok){
        const data = await res.json();

        setClasses(data.classesWithStudentCount);
      }
    } catch (error) {
      console.log(error);   
    }
  }
  useEffect(()=>{
    teacherClasses();
  },[])
  const columns = [
    { field: "name", headerName: "Class Name" },
    { field: "studentCount", headerName: "Student Count" },
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
      onRowClick={()=>{}}/>
      </Container>
    </div>
    
  )
}

export default TeacherHomePage
