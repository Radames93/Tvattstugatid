import React from "react";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
const CalendarBooking = () => {
  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are log out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          sx={{
            color: "#121212",
            fontSize: "20px",
            textAlign: "center",
            my: 2,
          }}
        >
          Do you want to sign out
        </Typography>
        <Button
          type="submit"
          color="secondary"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Grid>
    </Container>
  );
};

export default CalendarBooking;
