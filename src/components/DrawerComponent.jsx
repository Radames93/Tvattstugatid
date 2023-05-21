import React, { useState } from "react";
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { UserAuth } from "../contexts/AuthContext";

function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { user } = UserAuth();
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
        {!user ? (
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
        ) : (
          <List>
            <Avatar
              sx={{
                margin: "auto",
              }}
              alt="Remy Sharp"
            />
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/calendar">Booking</Link>
              </ListItemText>
            </ListItem>
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/logout">Logout</Link>
              </ListItemText>
            </ListItem>
          </List>
        )}
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        sx={{
          color: "white",
        }}
      >
        <MenuOutlinedIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
