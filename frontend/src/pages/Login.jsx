import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import GenericForm from '../shared/GenericForm';
import { USER_API_ENDPOINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {setUser, setLoading} from '../redux/auth/authSlice'
import { Container } from '@mui/material';
const Login = () => {
  const location = useLocation();
  const role = location.state;
  const fields = [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
  ];
  const { user, loading } = useSelector((store) => store.auth);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleFormSubmit = async(data) => {
    dispatch(setLoading(true));
    const form = {
      email : data.email,
      password : data.password,
      role : role
    }
    console.log(form);
    
   try {
    const response = await fetch(`${USER_API_ENDPOINT}/login`, {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: 'include',
    });
    if(response.ok){
      const data = await response.json();
        dispatch(setUser(data.user));
        enqueueSnackbar(data.message, { variant: "success" });
        navigate(`/${role}`, { replace: true });
    }
    else {
      // Handle error responses here
      const errorData = await response.json(); // Parse the response body
      enqueueSnackbar(errorData.message, { variant: "error" });
    }
   } catch (error) {
    console.log(error);
    enqueueSnackbar(error.message, { variant: "error" });
   }finally{
    dispatch(setLoading(false));
   }
  };
  useEffect(() => {
    // Redirect to the appropriate page if the user is already logged in
    if (user) {
      navigate(`/${user.role}`, { replace: true });
    }
  }, [user, navigate]);

  return (
    <Container 
    maxWidth = 'xl'
    sx={{
      height: '100vh',
      width : 1280,
      margin : 0,
      padding : 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom, #5f2c82, #49a09d)',
    }}>
    <GenericForm
      title="Login"
      fields={fields}
      onSubmit={handleFormSubmit}
    />
    </Container>
  );
}

export default Login
