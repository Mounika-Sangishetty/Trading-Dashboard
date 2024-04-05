import { React } from "react";
import { useState } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";

import HomeIcon from "@mui/icons-material/Home";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LanguageIcon from "@mui/icons-material/Language";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SettingsIcon from "@mui/icons-material/Settings";

export default function MenuList({open}){

    const [activeItem, setActiveItem] = useState("Home");
    
    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const menuList = [
        { icon: <HomeIcon />, name: "Home" },
        { icon: <CorporateFareIcon />, name: "Organisation" },
        { icon: <LanguageIcon />, name: "Assets" },
        { icon: <ImportExportIcon />, name: "Trade" },
        { icon: <NotificationsNoneIcon />, name: "Notifications" },
        { icon: <ContactSupportIcon />, name: "Support" },
        { icon: <SettingsIcon />, name: "Settings" },
    ];

    return(
        <List>
        {menuList.map((item, index) => (
          item.spacer ? (
            // Render a spacer if the item is marked as a spacer
            <div key={index} style={{ height: 100, }} /> 
          ) : (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              color:
                activeItem === item.name ? '#ab47bc' : "transperent",
            }}
            onClick={() => handleItemClick(item.name)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color:
                   activeItem === item.name ? '#ab47bc' : "transperent",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          )
        ))}
        </List>
    )
}