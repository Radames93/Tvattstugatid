import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TextFields from "../components/TextFields";
import CheckboxField from "../components/CheckboxField";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { pawdRegExp } from "../utils";
import { useAuth } from "../contexts/AuthContext";

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
const Profile = () => {
  const { register, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setError("");
      setLoading(true);
      await register(data.email, data.password);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
    reset();
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
          Register Form
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
          <TextFields
            errors={errors}
            control={control}
            name="confirmPassword"
            label="Confirm Password"
          />
          <Button
            disabled={loading}
            type="submit"
            color="secondary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
        <Typography>
          Already have an account? <Link to="/">Login Here</Link>
        </Typography>
      </Grid>
    </Container>
  );
};
export default Profile;
