import React from "react";
import { useDarkMode } from "../globalcontext/DarkModeProvider";
import { IconButton } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <IconButton onClick={toggleDarkMode}  sx={{marginRight:'10px'}}>
      {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export { DarkModeToggle };