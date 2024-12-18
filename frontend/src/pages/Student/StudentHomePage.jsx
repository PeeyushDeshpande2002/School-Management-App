import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setUser, setLoading} from '../../redux/auth/authSlice'
import { useSnackbar } from 'notistack';
const StudentHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{enqueueSnackbar} = useSnackbar();
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
  return (
    <div>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  )
}

export default StudentHomePage
