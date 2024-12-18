import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper, MenuItem, Chip, IconButton } from "@mui/material";
import { CLASS_API_ENDPOINT } from "../../../utils/constant";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";

const EditClass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { teachers: initialTeachers, students: initialStudents, row } = location.state;
    console.log(row);
    
  const [teachers, setTeachers] = useState(initialTeachers || []);
  const [students, setStudents] = useState(initialStudents || []);
  const [selectedStudents, setSelectedStudents] = useState(row?.student || []);
  const [formData, setFormData] = useState({
    
    name: row?.name || "",
    teacher: row?.teacher?._id || "",
    year: row?.year || "",
    classId: row?.id || "",
  });

  // Handle input changes for text fields and dropdowns
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a student to the selected list and remove it from the dropdown
  const handleAddStudent = (studentId) => {
    const selectedStudent = students.find((s) => s._id === studentId);
    setSelectedStudents([...selectedStudents, selectedStudent]);
    setStudents(students.filter((s) => s._id !== studentId));
  };

  // Remove a student from the selected list and add it back to the dropdown
  const handleRemoveStudent = (studentId) => {
    const removedStudent = selectedStudents.find((s) => s._id === studentId);
    setStudents([...students, removedStudent]);
    setSelectedStudents(selectedStudents.filter((s) => s._id !== studentId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const payload = {
        ...formData,
        studentId: selectedStudents.map((s) => s._id), // Send array of student IDs
      };
  
      console.log("Payload:", payload);
  
      const res = await fetch(`${CLASS_API_ENDPOINT}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });
  
      if (res.ok) {
        console.log("Response:", await res.json());
        navigate("/Admin/classes");
      } else {
        console.error("Failed to update class:", res.statusText);
      }
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #5f2c82, #49a09d)",
        px: 2,
      }}
    >
      <Paper elevation={4} sx={{ p: 4, maxWidth: 500, width: "100%", borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Class
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Class Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />

          <TextField
            label="Teacher"
            name="teacher"
            select
            value={formData.teacher}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {teachers?.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                {teacher.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Add Students</Typography>
            <TextField
              select
              fullWidth
              margin="normal"
              variant="outlined"
              value=""
              onChange={(e) => handleAddStudent(e.target.value)}
              label="Select a student to add"
            >
              {students && students.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  {student.name}
                </MenuItem>
              ))}
            </TextField>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Selected Students
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {selectedStudents.map((student) => (
                <Chip
                  key={student._id}
                  label={student.name}
                  onDelete={() => handleRemoveStudent(student._id)}
                  deleteIcon={<DeleteIcon />}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditClass;
