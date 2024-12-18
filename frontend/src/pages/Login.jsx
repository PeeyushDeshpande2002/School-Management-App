import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import GenericForm from '../shared/GenericForm';
import { USER_API_ENDPOINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {setUser, setLoading} from '../redux/auth/authSlice'
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
  // useEffect(()=>{
  //   if(user && user.role == role){
  //     navigate('/')
  // }})
  const handleFormSubmit = async(data) => {
    ;
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
        navigate(`/${role}`);
    }
   } catch (error) {
    console.log(error);
    enqueueSnackbar("Login failed!", { variant: "error" });
   }finally{
    dispatch(setLoading(false));
   }
  };

  return (
    <GenericForm
      title="Login"
      fields={fields}
      onSubmit={handleFormSubmit}
    />
  );
}

export default Login
