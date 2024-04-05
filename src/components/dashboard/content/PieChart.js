import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, CardContent, Typography, Divider } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,      
    },
    labels: {
      boxWidth: 20,
      padding: 40, 
      margin: 50, 
      font: {
        size: 12,
      },
    },
 
  }
};

function PieChart() {
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        const json = await response.json();
        if (json && json.data && Array.isArray(json.data)) {
          const labels = json.data.map((item) => item.Year);
          const populationData = json.data.map((item) => item.Population);

          setPieData({
            labels,
            datasets: [
              {
                label: "Population",
                data: populationData,
                backgroundColor: [
                  "#ba68c8",
                  "#f06292",
                  "#e57373",
                  "#64b5f6",
                  "#4db6ac",
                  "#4dd0e1",
                  "#8bc34a",
                  "#ff7070",
                  "#ffa0a0"
                ],
                hoverOffset: 4,
              },
            ],
          });
        } else {
          console.error(
            "API response does not contain expected data structure:",
            json
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ margin: "10px", marginTop: "0px" }}>
          Pie Chart to represent US Population
        </Typography>
        <Divider sx={{ margin: "10px" }}></Divider>
        <div style={{ width: "300px", height: "19rem", margin: "auto" }}>
          {pieData ? (
            <Doughnut options={options} data={pieData} />
          ) : (
            <p>Loading...</p> 
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default PieChart;
