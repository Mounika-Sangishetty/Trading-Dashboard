import React from "react";
import { Box } from "@mui/material";
import MainContent from "./content/MainContent";
import Sidenav from "./sidenav/Sidenav";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidenav />
      <MainContent />
    </Box>
  );
}
