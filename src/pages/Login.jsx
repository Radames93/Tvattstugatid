import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import TextFields from "../components/TextFields";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { pawdRegExp } from "../utils";
import { UserAuth } from "../contexts/AuthContext";

// create scheme validation
const schema = yup.object({
  email: yup.string().required("Email is required").email(),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      pawdRegExp,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
});
const Login = () => {
  const [display, setDisplay] = useState(false);
  const { login } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);
    try {
      setError("");
      setLoading(true);
      await login(data.email, data.password);
      setDisplay(true);
      if (display === true) {
        navigate("/calendar");
      } else {
        setError("Failed to Sign In");
      }
      setLoading(false);
      reset();
    } catch {
      console.log("error");
    }
  }

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
          Log In
        </Typography>
        {error}
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%", mt: "2rem" }}
        >
          <TextFields
            errors={errors}
            control={control}
            name="email"
            label="Email"
          />
          <TextFields
            errors={errors}
            control={control}
            name="password"
            label="Password"
          />
          <Button
            disabled={loading}
            type="submit"
            color="secondary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
        <Typography>
          Do you need an account? <Link to="/profile">Sign up Here</Link>
        </Typography>
      </Grid>
    </Container>
  );
};
export default Login;
