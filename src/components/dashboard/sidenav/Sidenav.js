import React from "react";
import { useState } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import MuiDrawer from "@mui/material/Drawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from '@mui/icons-material/Menu';
import WaterDropTwoToneIcon from '@mui/icons-material/WaterDropTwoTone';
import AcUnitIcon from "@mui/icons-material/AcUnit";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import MenuList from "./MenuList";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenav() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerState = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" open={open}>

      <DrawerHeader>
        <IconButton onClick={handleDrawerState} sx={{ marginRight: 'auto' }}> {/* This pushes everything else to the right */}
          <MenuIcon />
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <WaterDropTwoToneIcon sx={{ color: '#add24d', fontSize: '3rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
            <Typography variant="h6" sx={{ color: '#add24d', marginBottom: '-0.35em' }} noWrap>Carbon</Typography>
            <Typography variant="h6" sx={{ color: '#add24d' }} noWrap>Cell</Typography>
          </div>
        </div>
      </DrawerHeader>

      <Divider/>

      <MenuList open={open} />
      
      <Card sx={{ maxWidth: 395, }} className="navBottomCard">
        <CardHeader
          avatar={
            <Avatar
              sx={{
                width: 24,
                height: 24,
                marginLeft: "5px",
                marginRight: "10px",
              }}
            >
              B
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Broklyn Simmons"
          subheader="brooklyn@simm.com"
        />
      </Card>
    </Drawer>
  );
}
