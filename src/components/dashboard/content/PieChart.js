import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card, CardContent } from "@mui/material";

ChartJS.register(
  ArcElement,
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
      display: true,
      text: "US Population Over Time",
      font: {
        size: 18,
        weight: "bold",
      },
    },
    labels: {
        boxWidth: 20, // Width of colored box
        padding: 20, // Padding between each legend item
        margin: 50, // Margin around legend is not directly available, you can use padding instead.
        font: {
          size: 14, // Font size for the text
        },
    },
  },
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
            datasets: [{
              label: 'Population',
              data: populationData,
              backgroundColor: labels.map(() => getRandomColor()), // random colors for each slice
              hoverOffset: 4
            }]
          });
        } else {
          console.error("API response does not contain expected data structure:", json);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to generate random colors for the pie chart slices
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <Card>
      <CardContent>
        <div style={{ width: "300px", height: "300px" }}>
          {pieData ? (
            <Pie options={options} data={pieData} />
          ) : (
            <p>Loading...</p> // Show loading text while the data is being fetched
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default PieChart;
