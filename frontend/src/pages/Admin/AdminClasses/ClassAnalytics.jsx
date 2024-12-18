import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { CLASS_API_ENDPOINT } from "../../../utils/constant";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ClassAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isMonthly, setIsMonthly] = useState(true);
  const params = useParams();
  const classId = params.id;

  const fetchAnalytics = async () => {
    try {
      const queryParams = new URLSearchParams({ month, year }).toString();
      const response = await fetch(`${CLASS_API_ENDPOINT}/${classId}/analytics?${queryParams}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [month, year]);

  if (!analyticsData) {
    return <p>Loading...</p>;
  }

  const pieDataGender = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender Distribution",
        data: [analyticsData.maleCount, analyticsData.femaleCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const barDataGender = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender Count",
        data: [analyticsData.maleCount, analyticsData.femaleCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const pieDataFeesSalary = {
    labels: ["Fees", "Salary"],
    datasets: [
      {
        label: "Fees vs Salary",
        data: [analyticsData.totalFees, analyticsData.totalSalary],
        backgroundColor: ["#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const barDataFeesSalary = {
    labels: ["Fees", "Salary"],
    datasets: [
      {
        label: "Monthly Amount",
        data: isMonthly
          ? [analyticsData.totalFees, analyticsData.totalSalary]
          : [analyticsData.totalFees * 12, analyticsData.totalSalary * 12],
        backgroundColor: ["#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", maxHeight : '75vh', margin: "0 auto", marginTop : '' }}>
      <div style={{ display: "flex", justifyContent: "space-around",  }}>
        {/* Make Pie and Bar charts smaller by setting width and height */}
        <div style={{ width: "200px", height: "200px" }}>
          <Pie data={pieDataGender} />
        </div>
        <div style={{ width: "350px", height: "350px" }}>
          <Bar data={barDataGender} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", }}>
        <div style={{ width: "200px", height: "200px" }}>
          <Pie data={pieDataFeesSalary} />
        </div>
        <div style={{ width: "300px", height: "300px" }}>
          <Bar data={barDataFeesSalary} />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <label>
          View:
          <select onChange={(e) => setIsMonthly(e.target.value === "monthly")}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>
        <label>
          Month:
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default ClassAnalytics;
