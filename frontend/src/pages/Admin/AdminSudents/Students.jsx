import React, { useEffect, useState } from "react";
import GenericForm from "../../../shared/GenericForm";
import GenericTable from "../../../shared/GenericTable";
import { ADMIN_API_ENDPOINT } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {useSnackbar} from 'notistack'
const Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar();
  const loadStudents = async () => {
    try {
      const res = await fetch(`${ADMIN_API_ENDPOINT}/students`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data || []);
        //console.log(data);
        
      } else {
        console.error("Failed to fetch students");
        setStudents([])
      }
    } catch (error) {
      console.error("Error loading students:", error);
      setStudents([])
    }
  };

  useEffect(() => {
    loadStudents();
  }, []); // Dependency array to prevent repeated calls

  const handleDelete = async(id) => {
    //console.log(`Delete student with ID: ${id}`);
    try {
      const res = await fetch(`${ADMIN_API_ENDPOINT}/student/delete/${id}`,{
        method : 'DELETE',
         credentials : 'include'
      })
      if(res.ok){
        const data = await res.json();
        enqueueSnackbar(data.message, {variant : 'success'})
        loadStudents()
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, {variant: 'error'})
    }
  };
const onClick = (student) =>{
  navigate(`/admin/students/${student._id}`, {state : student});
}
  const columns = [
    { field: "name", headerName: "Name" },
    { field: "gender", headerName: "Gender" },
    { field: "dob", headerName: "DOB" },
    { field: "contact", headerName: "Contact" },
    { field: "feesPaid", headerName: "Fees Paid" }, // Correct casing
  ];

  return (
    <>
      <GenericTable
        title={'Students'}
        columns={columns}
        data={students}
        onDelete={handleDelete}
        actions={{delete : true}}
        onRowClick={onClick}
      />
      <Button onClick ={() => {navigate('/admin/students/create')}}>Create Student</Button>
    </>
  );
};

export default Students;
