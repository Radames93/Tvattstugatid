import React from "react";
import Logo from "../../assets/logo.png";
import Toolbar from "@mui/material/Toolbar";
import { Box, useTheme, useMediaQuery, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import DrawerComponent from "../DrawerComponent";
import { UserAuth } from "../../contexts/AuthContext";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = UserAuth();

  return (
    <Box
      sx={{
        padding: "10px",
        backgroundColor: "#000000",
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
            {!user ? (
              <>
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
              </>
            ) : (
              <>
                <Link
                  to="/calendar"
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
                  Booking
                </Link>
                <Link
                  to="/logout"
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
                  Logout
                </Link>
                <Avatar alt="Remy Sharp" />
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </Box>
  );
};

export default Header;
