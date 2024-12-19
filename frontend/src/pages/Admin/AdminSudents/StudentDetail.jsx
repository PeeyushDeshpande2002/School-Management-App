import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Card, CardContent, Typography, Grid, Paper, Avatar, Chip } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ClassIcon from "@mui/icons-material/Class";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const StudentDetail = () => {
    const location = useLocation();
    const student = location.state;
    console.log(student);
    
    if (!student) {
        return <Typography variant="h6" align="center">No Student Data Available</Typography>;
      }
    
      return (
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight : '75vh',
          marginTop : '2rem',
          marginBottom : '2rem',
         // background: "radial-gradient(circle, #1e3c72, #2a5298)"

        }}
      >
        <Paper
          elevation={6}
          sx={{
            maxWidth: 900,
           width: "100%",
            
            borderRadius: 3,
             // Slight transparency
          }}
        >
          <Grid container >
            {/* Header Section */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              {/* <Avatar
                sx={{
                  width: 75,
                  height: 75,
                  mx: "auto",
                  mb: 1,
                  mt : 2,
                  background: "#5f2c82",
                  color: "#fff",
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 60 }} />
              </Avatar> */}
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2a5298" }}>
                {student.name}
              </Typography>
              <Chip
                label={student.role}
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
  <Typography variant="h6" sx={{ color: "#5f2c82", mb: 1 }}>
    Personal Details
  </Typography>
  <Card
  sx={{
    p: 2,
    m: 3,
    borderRadius: 2,
    background: "#f9f9f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Grid
    container
    spacing={2}
    alignItems="center"
    justifyContent="center"
    sx={{ textAlign: "center" }}
  >
    <Grid item xs={12} sm={2}>
      <Typography variant="subtitle1" color="textSecondary">
        <MailIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        Email:
      </Typography>
      <Typography variant="body1">{student.email}</Typography>
    </Grid>
    <Grid item xs={12} sm={2}>
      <Typography variant="subtitle1" color="textSecondary">
        <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        Contact:
      </Typography>
      <Typography variant="body1">{student.contact}</Typography>
    </Grid>
    <Grid item xs={12} sm={2}>
      <Typography variant="subtitle1" color="textSecondary">
        <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        Birth Date:
      </Typography>
      <Typography variant="body1">
        {new Date(student.dob).toLocaleDateString()}
      </Typography>
    </Grid>
    <Grid item xs={12} sm={2}>
      <Typography variant="subtitle1" color="textSecondary">
        Gender:
      </Typography>
      <Typography variant="body1">{student.gender}</Typography>
    </Grid>
    <Grid item xs={12} sm={2}>
      <Typography variant="subtitle1" color="textSecondary">
        Fees Paid:
      </Typography>
      <Typography variant="body1">₹{student.feesPaid}</Typography>
    </Grid>
  </Grid>
</Card>

</Grid>

  
            {/* Classes Section */}
            <Grid item xs={12}>
  <Typography variant="h6" sx={{ color: "#5f2c82", mb: 1, mt: 2 }}>
    Enrolled Classes
  </Typography>
  <Grid container spacing={2} padding={2} wrap="nowrap">
    {student.className.map((classInfo) => (
      <Grid item key={classInfo._id} xs={12} sm={6} md={3}>
        <Card
          sx={{
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
      </Grid>
    ))}
  </Grid>
</Grid>

          </Grid>
        </Paper>
      </Box>
      );
}

export default StudentDetail
