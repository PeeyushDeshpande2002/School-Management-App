import React, { useEffect, useState } from "react";
import { ADMIN_API_ENDPOINT, CLASS_API_ENDPOINT } from "../../../utils/constant";
import { Box, Button } from "@mui/material";
import GenericTable from "../../../shared/GenericTable";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([])
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const loadClasses = async () => {
    try {
      const res =await fetch(`${CLASS_API_ENDPOINT}`, {
        method: "GET",
          credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
       
        const transformedData = data.map((classItem) => ({
          id: classItem._id,
          name: classItem.name,  // Class name
          teacherName: classItem.teacher.name,  // Teacher name
          studentCount: classItem.student.length,  // Number of students
        }));
        //console.log(transformedData);
        setClasses(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
    
  };
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
  const loadStudents = async() => {
    const res = await fetch(`${ADMIN_API_ENDPOINT}/students`, {
        method : 'GET',
        credentials : 'include'
      })
    if(res.ok){
      const data = await res.json();
      setStudents(data)
    }
  }
  useEffect(() => {
    loadClasses();
    loadTeachers();
    loadStudents();
  }, []);
  const columns = [
    { field: "name", headerName: "Class Name" },
    { field: "teacherName", headerName: "Teacher" },
    { field: "studentCount", headerName: "Students" },
  ];
  const handleDelete = async(row) => {
    try {
      const res = await fetch(`${CLASS_API_ENDPOINT}/delete/${row}`, {
        method : 'DELETE',
        credentials : 'include'
      })
      if(res.ok){
        const data = await res.json();
        enqueueSnackbar(data, {variant : 'success'}); 
        loadClasses();
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  const handleEdit = (row) => {
    navigate('/Admin/classes/edit', {state : {teachers, students, row}});
  };
  const onClick = (row) => {
    //console.log(row);
    
    navigate(`/admin/classes/${row.id}`);
  }
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <h2>Classes</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/Admin/classes/new")}
        >
          New Class
        </Button>
      </Box>
      <GenericTable
        columns={columns}
        data={classes}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onRowClick={onClick}
      />
    </Box>
  );
};

export default Classes;
