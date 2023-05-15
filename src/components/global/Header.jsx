import React from "react";
import Logo from "../../assets/logo.svg";
import Toolbar from "@mui/material/Toolbar";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import DrawerComponent from "../DrawerComponent";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      <Toolbar
        style={{
          display: "flex",
          marginLeft: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="img"
          sx={{
            width: 200,
            cursor: "pointer",
          }}
          alt="Logo"
          src={Logo}
        />
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "300px",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
                "&:hover": {
                  color: "yellow",
                  borderBottom: "1px solid white",
                },
              }}
            >
              Login
            </Link>
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
                "&:hover": {
                  color: "yellow",
                  borderBottom: "1px solid white",
                },
              }}
            >
              Create Profile
            </Link>
          </Box>
        )}
      </Toolbar>
    </Box>
  );
};

export default Header;
