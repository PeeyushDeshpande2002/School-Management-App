import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CLASS_API_ENDPOINT } from "../../../utils/constant";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Avatar,
  Chip,
  Button,
} from "@mui/material";

import GenericTable from "../../../shared/GenericTable";
import { useSnackbar } from "notistack";
const ClassDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const{enqueueSnackbar} = useSnackbar();
  const [singleClass, setSingleClass] = useState();
  const getClass = async () => {
    try {
      const res = await fetch(`${CLASS_API_ENDPOINT}/${params.id}`, {
        method: "GET",
        credentials: "include",
      });
      console.log(res);

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setSingleClass(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClass();
  }, []);
  const handleDelete = async(studentId) => {
    try {
      console.log(studentId);
      
      const res = await fetch(
        `${CLASS_API_ENDPOINT}/${params.id}/student/${studentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
  
      if (res.ok) {
        const data = await res.json();
        console.log(data.message);
        // const updatedStudents = singleClass.student.filter(
        //   (student) => student._id !== studentId
        // );
        // setSingleClass({ ...singleClass, student: updatedStudents });
        getClass();
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  const columns = [
    { field: "name", headerName: "Name" },
    { field: "gender", headerName: "Gender" },
    { field: "dob", headerName: "DOB" },
    { field: "contact", headerName: "Contact" },
    { field: "feesPaid", headerName: "Fees Paid" }, // Correct casing
  ];
  return (
    <div>
      {singleClass ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: "100vh",
            marginTop: "2rem",
            marginBottom: "2rem",
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
            <Grid container>
              {/* Header Section */}
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginTop: "1rem",
                    color: "#2a5298",
                  }}
                >
                  {singleClass.name}
                </Typography>
                <Chip
                  label={singleClass.year}
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
                  Class Details
                </Typography>
                <Card sx={{ p: 1, borderRadius: 2, background: "#f9f9f9" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1" color="textSecondary">
                        Teacher :
                      </Typography>
                      <Typography variant="body1">
                        {singleClass.teacher.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1" color="textSecondary">
                        Student Count:
                      </Typography>
                      <Typography variant="body1">
                        {singleClass.student.length}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} smm={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          navigate(`/admin/classes/${params.id}/analytics`)
                        }
                      >
                        Get Class Analysis
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* Classes Section */}
              <Grid item xs={12} marginBottom={"2rem"}>
                <Typography variant="h6" sx={{ color: "#5f2c82", mb: 1 }}>
                  Enrolled Students
                </Typography>
                <GenericTable
                  columns={columns}
                  data={singleClass.student}
                  onDelete={handleDelete}
                  actions={{ delete: true }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ) : (
        <h1>No class Found</h1>
      )}
    </div>
  );
};

export default ClassDetail;
