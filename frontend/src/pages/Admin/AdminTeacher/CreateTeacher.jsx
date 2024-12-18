import React from 'react'
import { USER_API_ENDPOINT } from '../../../utils/constant';
import GenericForm from '../../../shared/GenericForm';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateTeacher = () => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar()
  const createTeacher = async(formData) =>{
    console.log(formData);
    const transformedData = {
        name : formData.name,
        role : 'Teacher',
        contact : formData.contact,
        gender : formData.gender,
        email : formData.email,
        password : formData.password,
        salary : formData.salary
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
           // console.log(data);
           enqueueSnackbar(data.message, { variant: "success" });
            navigate('/admin/teachers')
            
        }
    } catch (error) {
        console.log(error);
        
    }
  }
  const fields = [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'salary', label: 'Salary', type: 'number', required: true },
    { name: 'gender', label: 'Gender', type: 'text', required: true },
    { name: 'contact', label: 'Contact', type: 'text', required: true },
    //{ name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true }
  ];
  return (
    <div>
      <GenericForm
      title={'Create Teacher'}
      fields={fields}
      onSubmit={createTeacher}/>
    </div>
  )
}

export default CreateTeacher
