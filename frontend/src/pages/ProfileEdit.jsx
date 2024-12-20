import { useSnackbar } from 'notistack';
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import GenericForm from '../shared/GenericForm';
import Navbar from '../Navbar';
import { Container } from '@mui/material';
import {STUDENT_API_ENDPOINT} from '../utils/constant';
import { TEACHER_API_ENDPOINT } from '../utils/constant';
const ProfileEdit = () => {
    const {user} = useSelector((store)=>store.auth);
    const {enqueueSnackbar} = useSnackbar();
    const location = useLocation();
    const{profile} = location.state;
    //console.log(profile);
    const navigate = useNavigate();
    const updateProfile = async (data) => {
      console.log(data);
      
        try {
          const res = await fetch(
            `${user.role === "Student" ? STUDENT_API_ENDPOINT : TEACHER_API_ENDPOINT}/update/${user._id}`,
            {
              method: "POST",
              credentials: "include",
              headers : {
                'Content-Type' : 'application/json'
              },
              body : JSON.stringify(data)
            }
          );
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            
            enqueueSnackbar(data.message, {variant: 'success'})
            navigate(`/${user.role}/profile`)
          }
        } catch (error) {
          console.error("Error fetching profile details:", error);
        }
      };
      const studentFields = [
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'gender', label: 'Gender', type: 'text', required: true },
        { name: 'dob', label: 'DOB', type: 'text', required: true },
        { name: 'contact', label: 'Contact', type: 'text', required: true },
        //{ name: 'name', label: 'Name', type: 'text', required: true },
        //{ name: 'password', label: 'Password', type: 'password', required: true }
      ]
      const teacherFields = [
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'salary', label: 'Salary', type: 'number', required: true },
        { name: 'gender', label: 'Gender', type: 'text', required: true },
        { name: 'contact', label: 'Contact', type: 'text', required: true },
        //{ name: 'name', label: 'Name', type: 'text', required: true },
        //{ name: 'password', label: 'Password', type: 'password', required: true }
      ]
      let fields;
      if(user.role === 'Student')fields = studentFields;
      else fields = teacherFields
  return (
    <div style={{width :  1260}}>
    <Navbar/>
    <Container 
    sx={{
      height: '100vh',
     
      background: 'white',
        margin : '2rem'
    }}>
    
    <GenericForm
      title={`Edit ${user.role}`}
      onSubmit={updateProfile}
      fields={fields}
      defaultValues={profile}/>
    </Container>
  </div>
  )
}

export default ProfileEdit
