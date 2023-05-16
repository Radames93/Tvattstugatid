import React from "react";
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

// create scheme validation
const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
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
  privacy: yup.boolean().oneOf([true], "Field must be checked"),
});

const Profile = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      privacy: false,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
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
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%", mt: "2rem" }}
        >
          <TextFields
            errors={errors}
            control={control}
            name="firstName"
            label="First Name"
          />
          <TextFields
            errors={errors}
            control={control}
            name="lastName"
            label="Last Name"
          />
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
          <CheckboxField errors={errors} control={control} name="privacy" />
          <Button
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
