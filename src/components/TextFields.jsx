import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../utils";
import ErrorMessage from "./ErrorMessage";

const TextFields = ({ label, control, name, errors }) => {
  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            {...addErrorIntoField(errors[name])}
            label={label}
            variant="filled"
          />
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
};

export default TextFields;
