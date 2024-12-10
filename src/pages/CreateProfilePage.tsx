import { Alert, Box, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import SharedForm from "../components/Profile/SharedForm";
import { setProfileFromFormData } from "../utils/profileHelpers";
import { IUserDataForm } from "../utils/types";

const CreateProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [createSuccess, setCreateSuccess] = useState(false);

  const onCreateProfile: SubmitHandler<IUserDataForm> = (
    formData: IUserDataForm
  ) => {
    const newProfileID = uuidv4();
    setProfileFromFormData(formData, newProfileID);
    setCreateSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create Profile
      </Typography>
      <SharedForm onSubmit={onCreateProfile} uniqueEmail />
      {createSuccess && (
        <Alert variant="filled" severity="success">
          Profile Successfully Created! Sending you to Log in shortly!
        </Alert>
      )}
    </Box>
  );
};

export default CreateProfilePage;
