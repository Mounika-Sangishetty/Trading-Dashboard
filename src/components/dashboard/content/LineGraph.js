import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, Typography, Divider } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      text: "US Population Over Time",
      font: {
        size: 18,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Year",
        font: {
          size: 14,
          weight: "bold",
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      title: {
        display: true,
        text: "Population",
        font: {
          size: 14,
          weight: "bold",
        },
      },
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    },
  },
  elements: {
    point: {
      radius: 3,
      backgroundColor: "#ab47bc",     
    },
    line: {
      borderWidth: 2,
      borderColor: "#ab47bc",
      tension: 0.3,
      fill: false,
    },
  },
};

function LineGraph() {
  const [lineData, setLineData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        const json = await response.json();
        if (json && json.data && Array.isArray(json.data)) {
          const labels = json?.data?.map((item) => item.Year);
          const values = json?.data?.map((item) => item.Population);

          setLineData({
            labels: labels,
            datasets: [
              {
                label: "US Population",
                data: values,
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
        <Typography
          variant="h6"
          sx={{ margin: "10px", marginTop: "0px" }}
        >
          Line Graph of US Population over time
        </Typography>
        <Divider sx={{ margin: "10px" }}></Divider>
        <div style={{ width: "100%", height: "19rem" }}>
          {lineData && <Line options={options} data={lineData} />}
        </div>
      </CardContent>
    </Card>
  );
}

export default LineGraph;
