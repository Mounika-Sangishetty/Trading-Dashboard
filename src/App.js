import { React } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import CssBaseline from "@mui/material/CssBaseline";
import { DarkModeProvider } from "./components/globalcontext/DarkModeProvider";

export default function App() {
  return (
    <DarkModeProvider>
      <CssBaseline />
      <Dashboard />     
    </DarkModeProvider>
  );
}
