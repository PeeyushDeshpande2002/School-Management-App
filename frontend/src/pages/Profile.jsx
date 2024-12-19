import { useSelector } from "react-redux";
import { STUDENT_API_ENDPOINT, TEACHER_API_ENDPOINT } from "../utils/constant";
import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  Card,
  Chip,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const getProfileDetails = async () => {
    try {
      const res = await fetch(
        `${
          user.role === "Student" ? STUDENT_API_ENDPOINT : TEACHER_API_ENDPOINT
        }/${user._id}/detail`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <div style={{ width: 1280, height: "100vh", backgroundColor: "white" }}>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "75vh",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            maxWidth: 600,
            width: "100%",
            borderRadius: 3,
            p: 4,
            background: "#ffffffcc",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "#2a5298", mb: 3 }}
          >
            {profile.name}
          </Typography>
          <Chip
            label={profile.role}
            sx={{
              mb: 3,
              fontWeight: "bold",
              background: "#49a09d",
              color: "#fff",
            }}
          />
          <Typography variant="h5" sx={{ color: "#5f2c82", mb: 2 }}>
            Personal Details
          </Typography>
          <Card sx={{ p: 2, background: "#f9f9f9", borderRadius: 2, mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MailIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                Email: {profile.email}
              </Grid>
              <Grid item xs={12} sm={6}>
                <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                Contact: {profile.contact}
              </Grid>

              {user && user.role === "Student" && (
                <Grid item xs={12} sm={6}>
                  <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  Birth Date: {new Date(profile.dob).toLocaleDateString()}
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                {user.role === "Student" ? (
                  <>Fees Paid: ₹{profile.feesPaid}</>
                ) : (
                  <>Salary: ₹{profile.salary}</>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                Gender: {profile.gender}
              </Grid>
            </Grid>
          </Card>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "#fff",
                fontWeight: "bold",
              }}
              onClick={() => {
                navigate(`/profile/edit`, { state: { profile } });
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};
