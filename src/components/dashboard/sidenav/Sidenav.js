import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from '@mui/icons-material/Menu';
import WaterDropTwoToneIcon from '@mui/icons-material/WaterDropTwoTone';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import MenuList from "./MenuList";
import SearchMenu from "./SearchMenu";
import useMediaQuery from '@mui/material/useMediaQuery';

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
  const [open, setOpen] = useState(false);
  const isSmallerScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isLargerScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

  useEffect(() => {
    if (isSmallerScreen) {
      setOpen(false); // Close drawer for smaller screens
    } else if (isLargerScreen) {
      setOpen(true); // Open drawer for larger screens
    }
  }, [isSmallerScreen, isLargerScreen]);

  const handleDrawerState = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerState} style={{ margin: '0px 10px' }}> 
          <MenuIcon />
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '1.5rem' }}>
          <WaterDropTwoToneIcon sx={{ color: '#ab47bc', fontSize: '3rem' }} />
          <Typography variant="h6" sx={{ color: '#ab47bc', marginBottom: '-0.35em' }} noWrap>CarbonCell</Typography>
        </div>
      </DrawerHeader>
      <Divider/>
      <SearchMenu/>
      <MenuList open={open} />
      <Card sx={{ maxWidth: 395 }} style={{marginTop: '1rem'}}>
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
