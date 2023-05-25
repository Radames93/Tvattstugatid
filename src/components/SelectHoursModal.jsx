import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { UserAuth } from "../contexts/AuthContext";
import uuid from "react-uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ({ handleClose, open, handleOpen, changeMessage }) {
  const [value, setValue] = useState("");
  const unique_id = uuid();
  const [title, setTitle] = useState("");
  const { user } = UserAuth();
  const email = user.email;
  let data = {};

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log({ value });
  };

  const handleReset = () => {
    data = {};
    console.log(data);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    data = {
      unique_id,
      title,
      email,
      value,
    };
    changeMessage(data);
    console.log(data);
    setTimeout(function () {
      handleReset();
    }, 15000);
    handleClose();
  };

  return (
    <>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form" onSubmit={onSubmit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Number of the room or name
            </Typography>
            <TextField
              placeholder="number or room or name"
              id="outlined-basic"
              sx={{
                "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                  padding: 0,
                },
              }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormControl>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Which pass do you want to book?
              </Typography>
              <RadioGroup
                aria-labelledby="pass-choice-group-label"
                name="pass-choice-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="08:00 - 14:00"
                  control={<Radio />}
                  label="08:00 - 14:00"
                />
                <FormControlLabel
                  value="14:00 - 20:00"
                  control={<Radio />}
                  label="14:00 - 20:00"
                />
              </RadioGroup>
              <Button type="submit">Next</Button>
            </FormControl>
          </Box>
        </Modal>
      </Box>
    </>
  );
}
