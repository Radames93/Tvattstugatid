import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <ListItem onClick={() => setOpenDrawer(false)}>
          <ListItemText>Stäng</ListItemText>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
            <ClearOutlinedIcon />
          </IconButton>
        </ListItem>
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/">Login</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/profile">Create Profile</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuOutlinedIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
