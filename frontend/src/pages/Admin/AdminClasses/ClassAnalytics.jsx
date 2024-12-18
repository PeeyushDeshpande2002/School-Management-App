import React, { useState, useEffect } from "react";
import { Box, Typography, ToggleButtonGroup, ToggleButton, TextField, MenuItem, Button, Grid } from "@mui/material";
import { Pie, Bar,  } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useParams } from "react-router-dom";
import { CLASS_API_ENDPOINT } from "../../../utils/constant";
// ChartJS.register(...registerables);
const ClassAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [viewType, setViewType] = useState("monthly"); // 'monthly' or 'yearly'
  const params = useParams();
  const classId = params.id;
  const fetchAnalytics = async () => {
    try {
      const queryParams = new URLSearchParams({ month, year }).toString();
      const response = await fetch(`${CLASS_API_ENDPOINT}/${classId}/analytics?${queryParams}`,{
        credentials : 'include'
      });
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [month, year, viewType]);

  if (!analyticsData) return <Typography>Loading...</Typography>;

  // Chart Data Configurations
  const genderPieData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender Ratio",
        data: [analyticsData.maleCount, analyticsData.femaleCount],
        backgroundColor: ["#42a5f5", "#f06292"],
      },
    ],
  };

  const genderBarData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Students",
        data: [analyticsData.maleCount, analyticsData.femaleCount],
        backgroundColor: ["#42a5f5", "#f06292"],
      },
    ],
  };

  const feesSalaryPieData = {
    labels: ["Total Fees", "Total Salary"],
    datasets: [
      {
        label: "Fees vs Salary",
        data: [analyticsData.totalFees, analyticsData.totalSalary],
        backgroundColor: ["#66bb6a", "#ff7043"],
      },
    ],
  };

  const feesSalaryBarData = {
    labels: ["Fees", "Salary"],
    datasets: [
      {
        label: viewType === "monthly" ? "Monthly Amount" : "Yearly Amount",
        data: [analyticsData.totalFees, analyticsData.totalSalary],
        backgroundColor: ["#66bb6a", "#ff7043"],
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Class Analytics
      </Typography>

      {/* Gender Analysis */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Gender Ratio (Pie Chart)
          </Typography>
          <Pie data={genderPieData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Gender Ratio (Bar Graph)
          </Typography>
          <Bar data={genderBarData} />
        </Grid>
      </Grid>

      {/* Fees and Salary */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          View Options
        </Typography>
        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={(e, newValue) => setViewType(newValue || viewType)}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="monthly">Monthly</ToggleButton>
          <ToggleButton value="yearly">Yearly</ToggleButton>
        </ToggleButtonGroup>

        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
          {viewType === "monthly" && (
            <Grid item xs={6}>
              <TextField
                label="Select Month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                fullWidth
                select
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          <Grid item xs={6}>
            <TextField
              label="Select Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              select
            >
              {Array.from({ length: 10 }, (_, i) => (
                <MenuItem key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={fetchAnalytics}>
              Refresh Data
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Fees vs Salary (Pie Chart)
            </Typography>
            <Pie data={feesSalaryPieData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Fees vs Salary (Bar Graph)
            </Typography>
            <Bar data={feesSalaryBarData} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ClassAnalytics;
