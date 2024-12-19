import React, { useEffect, useState } from 'react'
import GenericForm from '../../../shared/GenericForm';
//import { fetchTeachers } from './classAPifetched';
import { ADMIN_API_ENDPOINT, CLASS_API_ENDPOINT } from '../../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const NewClass = () => {
    const[teachers, setTeachers] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate(); 
    const loadTeachers = async() =>{
        const res =  await fetch(`${ADMIN_API_ENDPOINT}/teachers`,{
            method : 'GET',
            credentials : 'include',
          })
        if(res.ok){
          const data = await res.json();
          setTeachers(data)
          console.log(data); 
        }
      }
      useEffect(() => {
          loadTeachers();
        }, []);
        const handleSubmit = async(data) =>{
           //console.log(data);
            try {
                const res = await fetch(`${CLASS_API_ENDPOINT}/create`, {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body : JSON.stringify(data),
                    credentials : 'include',
                
                });
                if(res.ok){
                    const data = await res.json();
                    enqueueSnackbar('Class created successfully', { variant: "success" });
                    navigate('/admin/classes');
                }
            } catch (error) {
                console.log(error);
                enqueueSnackbar("Something went wrong!", { variant: "error" });
            }
        }
        
        const fields = [
            { name: 'name', label: 'Class Name', type: 'text' },
            { name: 'teacher', label: 'Teacher', type: 'select', options: teachers.map(t => ({ id: t._id, label: `${t.name}` })) },
            //{ name: 'student', label: 'Students', type: 'select', options: students.map(s => ({ id: s.id, label: s.name })) },
            {name : 'year', label : 'Year', type : 'text'},
            {name : 'maxCount', label : 'Maximum Count of Students', type : 'number'}
        ]
  return (
    <div>
      <GenericForm 
      title={'Create New Class'}
      fields={fields}
      onSubmit={handleSubmit}/>
    </div>
  )
}

export default NewClass
