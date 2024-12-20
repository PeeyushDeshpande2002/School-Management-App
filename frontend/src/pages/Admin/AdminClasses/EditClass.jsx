import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Chip,
  IconButton,
} from "@mui/material";
import { CLASS_API_ENDPOINT } from "../../../utils/constant";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import {  useSnackbar } from "notistack";

const EditClass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const { teachers: initialTeachers, students: initialStudents, row } = location.state;
  const[teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

useEffect(()=>{
  const filteredTeachers = initialTeachers.filter((teacher) =>
    !teacher.teachClasses.some((cls) => cls._id === row.id)
  );
  setTeachers(filteredTeachers);

  const studentsInClass = initialStudents.filter((student) =>
    student.className.some((cls) => cls._id === row.id)
  );
  setSelectedStudents(studentsInClass);
  
  const remainingStudents = initialStudents.filter((student) =>
    !student.className.some((cls) => cls._id === row.id)
  );
  setStudents(remainingStudents);
},[row.id, initialTeachers, initialStudents])




  const [formData, setFormData] = useState({
    name: row?.name || "",
    teacher: row?.teacher?._id || "",
    year: row?.year || "",
    classId: row?.id || "",
  });

  const maxStudents = row.maxCount; // Replace with actual max count from your requirements

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleAddStudent = (studentId) => {
    if (selectedStudents.length >= maxStudents) {
      alert("Cannot add more students. Maximum limit reached.");
      return;
    }
    const selectedStudent = students.find((s) => s._id === studentId);
    setSelectedStudents([...selectedStudents, selectedStudent]);
    setStudents(students.filter((s) => s._id !== studentId));
  };

  const handleRemoveStudent = (studentId) => {
    const removedStudent = selectedStudents.find((s) => s._id === studentId);
    setStudents([...students, removedStudent]);
    setSelectedStudents(selectedStudents.filter((s) => s._id !== studentId));
  };
 // console.log(selectedStudents);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        studentId: selectedStudents.map((s) => s._id),
      };

      const res = await fetch(`${CLASS_API_ENDPOINT}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        navigate("/Admin/classes");
        enqueueSnackbar(data.message, {variant : "success"});
      } else {
        const errorData = await res.json(); // Parse the response body
        enqueueSnackbar(errorData.message, { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
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
            {teachers.map((teacher) => (
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
              {students.map((student) => (
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
