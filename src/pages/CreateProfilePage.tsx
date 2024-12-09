import { Alert, Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

import { favColors } from "../utils/colors";
import { getStoredProfiles } from "../utils/profileHelpers";
import { IProfile, IUserDataForm } from "../utils/types";
import {
  emailValidationRules,
  fullNameValidationRules,
  passwordValidationRules,
} from "../utils/validations";

const CreateProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [createSuccess, setCreateSuccess]=useState(false);
  const {
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    control,
  } = useForm<IUserDataForm>({ mode: "onBlur" });

  const password = watch("password", "");

  const onCreateProfile: SubmitHandler<IUserDataForm> = (
    formData: IUserDataForm
  ) => {
   
    const storedProfiles = getStoredProfiles();
    const newProfileID = uuidv4();
    const newProfile: IProfile = {};
    const formattedPhone = formData.phone?.replace(/ /g, "");
    delete formData.confirm_pass;
    newProfile[newProfileID] = {
      ...formData,
      phone: formattedPhone,
    };

    const results = { ...storedProfiles, ...newProfile };

    localStorage.setItem("profiles", JSON.stringify(results));
    setCreateSuccess(true);
    setTimeout(()=>{navigate("/")},5000)
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create Profile
      </Typography>
      <form onSubmit={handleSubmit(onCreateProfile)}>
        <Controller
          name="email"
          defaultValue=""
          control={control}
          rules={emailValidationRules}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="standard"
              sx={{ mt: 2 }}
              fullWidth
            />
          )}
        />

        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={passwordValidationRules}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="text"
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="standard"
              sx={{ width: "45%", my: 4 }}
            />
          )}
        />

        <Controller
          name="confirm_pass"
          defaultValue=""
          control={control}
          rules={{
            required: "Password confirmation is required",
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirm Password"
              type="text"
              error={!!errors.confirm_pass}
              helperText={errors.confirm_pass?.message}
              variant="standard"
              sx={{ width: "45%", ml: "10%", my: 4 }}
            />
          )}
        />
        <Controller
          name="fullName"
          defaultValue=""
          control={control}
          rules={fullNameValidationRules}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              variant="standard"
              fullWidth
            />
          )}
        />

     

        <Controller
          name="phone"
          control={control}
          render={({ field: { ref: fieldRef, value, ...fieldProps } }) => (
            <MuiTelInput
              {...fieldProps}
              label="Phone Number"
              value={value ?? ""}
              inputRef={fieldRef}
              variant="standard"
              defaultCountry="US"
              disableDropdown
              sx={{ width: "45%", my: 4 }}
            />
          )}
        />

        <Controller
          name="color"
          control={control}
          rules={{
            required: "Favorite Color is required",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              value={field.value ?? ""}
              variant="standard"
              label="Favorite Color"
              error={!!errors.color}
              helperText={errors.color ? errors.color?.message : ""}
              sx={{ width: "45%", my: 4,  ml: "10%" }}
            >
              {favColors.map((value, i) => (
                <MenuItem key={i} value={value} sx={{ color: value }}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            type="submit"
            color="primary"
            disabled={!isValid || isSubmitting}
            size="large"
            variant="contained"
          >
            Create
          </Button>
        </Box>
      </form>
      {createSuccess && <Alert variant="filled" severity="success">Profile Successfully Created! Sending you to Log in shortly!</Alert>}
    </Box>
  );
};

export default CreateProfilePage;
