import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Avatar, Grid, Divider } from "@mui/material";

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

  return (
    <Card>
      <CardContent>
        {isLoading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {Object.keys(data?.bpi).map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "5px", columnGap: "10px" }}>
                      <Avatar sx={{ bgcolor: '#fec900' }}>
                        <Typography variant="h5">
                          <span dangerouslySetInnerHTML={{ __html: data?.bpi[item]?.symbol }} />
                        </Typography>
                      </Avatar>
                      {data?.bpi[item]?.code}
                    </div>
                    <Typography variant="body2">{data?.bpi[item]?.description}</Typography>
                    <Divider />
                    <Typography variant="body2" style={{ marginTop: "10px" }}>Rate</Typography>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                      <span dangerouslySetInnerHTML={{ __html: data?.bpi[item]?.symbol }} />
                      {data?.bpi[item]?.rate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default FetchCard;
