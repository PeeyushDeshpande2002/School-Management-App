import React from 'react'
import { USER_API_ENDPOINT } from '../../../utils/constant';
import GenericForm from '../../../shared/GenericForm';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateStudent = () => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar()
  const createStudent = async(formData) =>{
    console.log(formData);
    const transformedData = {
        name : formData.name,
        role : 'Student',
        contact : formData.contact,
        dob : formData.dob,
        gender : formData.gender,
        email : formData.email,
        password : formData.password,
        feesPaid : formData.feesPaid
    }
    try {
        const res = await fetch(`${USER_API_ENDPOINT}/register`,{
            method : 'POST', 
            credentials : 'include',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(transformedData)
        });
        if(res.ok){
            const data = await res.json();
            console.log(data.message);
            
           enqueueSnackbar(data.message, { variant: "success" });
            navigate('/admin/students')
            
        }
    } catch (error) {
        console.log(error);
        
    }
  }
  const fields = [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'gender', label: 'Gender', type: 'text', required: true },
    { name: 'dob', label: 'DOB', type: 'text', required: true },
    { name: 'contact', label: 'Contact', type: 'text', required: true },
    { name: 'feesPaid', label: 'Fee', type: 'number', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true }
  ];
  return (
    <div>
      <GenericForm
      title={'Create Student'}
      fields={fields}
      onSubmit={createStudent}/>
    </div>
  )
}

export default CreateStudent
