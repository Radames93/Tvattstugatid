import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";

const Profile = () => {
  const [inputValues, setInputValue] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //handle submit updates
  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  const checkValidation = () => {
    let errors = validation;

    //first Name validation
    if (!inputValues.fName.trim()) {
      errors.fName = "First name is required";
    } else {
      errors.fName = "";
    }
    //last Name validation
    if (!inputValues.lName.trim()) {
      errors.lName = "Last name is required";
    } else {
      errors.lName = "";
    }

    // email validation
    const emailCond =
      "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
    if (!inputValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!inputValues.email.match(emailCond)) {
      errors.email = "Please ingress a valid email address";
    } else {
      errors.email = "";
    }

    //password validation
    const cond1 = "/^(?=.*[a-z]).{6,20}$/";
    const cond2 = "/^(?=.*[A-Z]).{6,20}$/";
    const cond3 = "/^(?=.*[0-9]).{6,20}$/";
    const password = inputValues.password;
    if (!password) {
      errors.password = "password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be longer than 6 characters";
    } else if (password.length >= 20) {
      errors.password = "Password must shorter than 20 characters";
    } else if (!password.match(cond1)) {
      errors.password = "Password must contain at least one lowercase";
    } else if (!password.match(cond2)) {
      errors.password = "Password must contain at least one capital letter";
    } else if (!password.match(cond3)) {
      errors.password = "Password must contain at least a number";
    } else {
      errors.password = "";
    }

    //matchPassword validation
    if (!inputValues.confirmPassword) {
      errors.confirmPassword = "Password confirmation is required";
    } else if (inputValues.confirmPassword !== inputValues.Password) {
      errors.confirmPassword = "Password does not match confirmation password";
    } else {
      errors.password = "";
    }

    setValidation(errors);
  };

  useEffect(() => {
    checkValidation();
  }, [inputValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "20px",
          textAlign: "center",
          mb: 4,
        }}
      >
        Register Form
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid xs={12} sm={6}>
            <TextField
              name="fName"
              type="text"
              variant="outlined"
              color="secondary"
              label="First Name"
              id="fName"
              onChange={(e) => handleChange(e)}
              value={inputValues.fName}
              fullWidth
              required
            />
            {validation.fName && <p>{validation.fName}</p>}
            {validation.fName && console.log(validation)}
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="lName"
              type="text"
              variant="outlined"
              color="secondary"
              label="Last Name"
              id="lName"
              onChange={(e) => handleChange(e)}
              value={inputValues.lName}
              fullWidth
              required
            />
            {validation.lName && <p>{validation.lName}</p>}
            {validation.lName && console.log(validation)}
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="email"
              type="email"
              variant="outlined"
              color="secondary"
              label="Email"
              id="email"
              onChange={(e) => handleChange(e)}
              value={inputValues.email}
              fullWidth
              required
            />
            {validation.email && <p>{validation.email}</p>}
            {validation.email && console.log(validation)}
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="password"
              type="password"
              variant="outlined"
              color="secondary"
              label="Password"
              id="password"
              onChange={(e) => handleChange(e)}
              value={inputValues.password}
              fullWidth
              required
            />
            {validation.password && <p>{validation.password}</p>}
            {validation.password && console.log(validation)}
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="confirmPassword"
              type="password"
              variant="outlined"
              color="secondary"
              label="Confirm Password"
              id="confirmPassword"
              onChange={(e) => handleChange(e)}
              value={inputValues.confirmPassword}
              fullWidth
              required
            />
            {validation.confirmPassword && <p>{validation.confirmPassword}</p>}
            {validation.confirmPassword && console.log(validation)}
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox />}
              label="I Agree to Terms and Privacy Policy"
            />
          </Grid>
          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            sx={{ mb: 4 }}
          >
            Register
          </Button>
          <Typography>
            Already have an account? <Link to="/">Login Here</Link>
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
};
export default Profile;
