import React from 'react'
import { useLocation } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Grid, Paper, Avatar, Chip } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ClassIcon from "@mui/icons-material/Class";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const TeacherDetail = () => {
    const location = useLocation();
    const teacher = location.state;
    if (!teacher) {
        return (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No Teacher Data Available
          </Typography>
        );
      }
  return (
    <Box
      sx={{
        display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight : '75vh',
          marginTop : '5rem',
          marginBottom : '2rem',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 900,
          width: "100%",
          p: 4,
          borderRadius: 3,
          background: "#ffffffcc", // Slight transparency
        }}
      >
        <Grid container spacing={3}>
          {/* Header Section */}
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 2,
                background: "#5f2c82",
                color: "#fff",
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2a5298" }}>
              {teacher.name}
            </Typography>
            <Chip
              label={teacher.role}
              sx={{
                mt: 1,
                fontWeight: "bold",
                background: "#49a09d",
                color: "#fff",
              }}
            />
          </Grid>

          {/* Personal Details */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: "#5f2c82", mb: 1, fontWeight: "bold" }}>
              Personal Details
            </Typography>
            <Card sx={{ p: 3, borderRadius: 2, background: "#f9f9f9" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <MailIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    Email:
                  </Typography>
                  <Typography variant="body1">{teacher.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    Contact:
                  </Typography>
                  <Typography variant="body1">{teacher.contact}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    Date of Birth:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(teacher.dob).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <AttachMoneyIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    Salary:
                  </Typography>
                  <Typography variant="body1">₹{teacher.salary}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Classes Taught Section */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: "#5f2c82", mb: 1, fontWeight: "bold" }}>
              Classes Taught
            </Typography>
            {teacher.teachClasses.map((classInfo) => (
              <Card
                key={classInfo._id}
                sx={{
                  my: 2,
                  p: 2,
                  borderRadius: 2,
                  background: "linear-gradient(to right, #6a11cb, #2575fc)",
                  color: "#fff",
                }}
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <ClassIcon sx={{ fontSize: 40 }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {classInfo.name}
                    </Typography>
                    <Typography variant="body2">Year: {classInfo.year}</Typography>
                    <Typography variant="body2">
                      Students Enrolled: {classInfo.student.length}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default TeacherDetail
