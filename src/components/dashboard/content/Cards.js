import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography, Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import { pink } from "@mui/material/colors";

const FetchCard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const postData = await response.json();
        console.log(postData, "h");
        setData(postData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(data, "p");
  return (
    <Card>
      <CardContent style={{ display: "flex", gap: "20px" }}>
        {isLoading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <>
            {Object.keys(data?.bpi).map((item, index) => (
              <Card
                key={index}
                variant="outlined"
                style={{
                  borderRadius: "10px",
                  // height: "150px",
                  minWidth: "300px",
                }}
              >
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                      columnGap: "10px",
                    }}
                  >
                    <Avatar sx={{ bgcolor: '#fec900' }}>
                      <Typography variant="h5">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: data?.bpi[item]?.symbol,
                          }}
                        />
                      </Typography>
                    </Avatar>
                    {data?.bpi[item]?.code}
                  </div>
                  <Typography variant="body2">
                    {data?.bpi[item]?.description}
                  </Typography>
                  <Divider />
                  <Typography variant="body2" style={{ marginTop: "10px" }}>
                    Rate
                  </Typography>
                  <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: data?.bpi[item]?.symbol,
                      }}
                    />
                    {data?.bpi[item]?.rate}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FetchCard;
