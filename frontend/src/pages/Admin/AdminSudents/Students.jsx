import React, { useEffect, useState } from "react";
import GenericForm from "../../../shared/GenericForm";
import GenericTable from "../../../shared/GenericTable";
import { ADMIN_API_ENDPOINT } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate()
  const loadStudents = async () => {
    try {
      const res = await fetch(`${ADMIN_API_ENDPOINT}/students`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
        console.log(data);
        
      } else {
        console.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []); // Dependency array to prevent repeated calls

  const handleDelete = (id) => {
    console.log(`Delete student with ID: ${id}`);
    // Implement delete logic
  };

  const handleEdit = (id) => {
    console.log(`Edit student with ID: ${id}`);
    // Implement edit logic
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
        onEdit={handleEdit}
        onRowClick={onClick}
      />
    </>
  );
};

export default Students;
