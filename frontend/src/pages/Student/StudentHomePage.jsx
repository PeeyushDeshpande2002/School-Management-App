import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setUser, setLoading} from '../../redux/auth/authSlice'
import { useSnackbar } from 'notistack';
import Navbar from '../../Navbar';
import { STUDENT_API_ENDPOINT } from '../../utils/constant';
import GenericTable from '../../shared/GenericTable'
const StudentHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{enqueueSnackbar} = useSnackbar();
  const { user, loading } =  useSelector((store) => store.auth);
  const[classes, setClasses] = useState([]);
  const logoutHandler = async () => { 
    try {
      const res = await fetch("http://localhost:8000/api/user/logout", {
        methods: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(setUser(null));
        enqueueSnackbar(data.message, { variant: "success" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Logout failed!", { variant: "error" });
    }
  };
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
  },[])
  const columns = [
    { field: "name", headerName: "Class Name" },
    { field: "teacherName", headerName: "Teacher" },
    {field : 'year', headerName:"Year"}
  ];
  return (
    <div>
      <Navbar onLogout={logoutHandler}/>
      <GenericTable
      columns={columns}
      data={classes}
      onRowClick={()=>{}}/>
    </div>
  )
}

export default StudentHomePage
