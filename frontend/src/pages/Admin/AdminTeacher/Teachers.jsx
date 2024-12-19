import React, { useEffect, useState } from "react";
import GenericTable from "../../../shared/GenericTable";
import { ADMIN_API_ENDPOINT } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar()
  const loadTeachers = async () => {
    try {
      const res = await fetch(`${ADMIN_API_ENDPOINT}/teachers`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTeachers(data);
        console.log(data);
        
      } else {
        console.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []); // Dependency array to prevent repeated calls

  const handleDelete = async(id) => {
    console.log(`Delete student with ID: ${id}`);
    // Implement delete logic
    try {
      const res = await fetch(`${ADMIN_API_ENDPOINT}/teacher/delete/${id}`, {
        method : 'DELETE',
        credentials : 'include'
      })
      if(res.ok){
        const data = await res.json();
        enqueueSnackbar(data.message, {variant : 'success'})
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, {variant : 'error'});
      loadTeachers();
    }
  };
  const onClick = (teacher) => {
    navigate(`/admin/teachers/${teacher._id}`, {state : teacher})
  }
  const columns = [
    { field: "name", headerName: "Name" },
    { field: "gender", headerName: "Gender" },
    //{ field: "dob", headerName: "DOB" },
    { field: "contact", headerName: "Contact" },
    { field: "salary", headerName: "Salary" }, // Correct casing
    // { field: "teachClasses", headerName: "Classes" },
  ];

  return (
    <>
      <GenericTable
        title={'Teachers'}
        columns={columns}
        data={teachers}
        onDelete={handleDelete}
        actions={{delete : true}}
        onRowClick={onClick}
      />
      <Button onClick = {()=>{navigate('/admin/teachers/create')}}>Create Teacher</Button>
    </>
  );
};

export default Teachers;
