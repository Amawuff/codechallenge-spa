import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import ProfileContext from "../ProfileContext";

import { profileLoginMatch } from "../utils/storageHelpers";
import { TUserShort } from "../utils/types";

const LoginPage: React.FC = () => {

  const {login} = useContext(ProfileContext)
  const navigate = useNavigate();
  const [noProfile, setNoProfile]=useState(false);
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
  } = useForm<TUserShort>({mode:"onBlur"});

  const onLogin: SubmitHandler<TUserShort> = (formData) => {
  const profile = profileLoginMatch(formData);
    if(profile === null){
      //no match bad username password
      setNoProfile(true)
    }else{
      //found it
      login(profile)
      navigate(`view-profile/${profile}`) 

    }
 
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
      <form onSubmit={handleSubmit(onLogin)}>
        <Controller
          name="email"
          defaultValue = {''}
          control={control}
          rules={{ required: "Email is required" }}
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
          defaultValue = {''}
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="standard"
              sx={{ my: 4 }}
              fullWidth
            />
          )}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            color="primary"
            size="large"
            variant="contained"
          >
            Log In
          </Button>
        </Box>
      </form>
      {noProfile && <Alert variant="filled" severity="error">Email or Password incorrect!</Alert>}
    </Box>
  );
  
};

export default LoginPage;
