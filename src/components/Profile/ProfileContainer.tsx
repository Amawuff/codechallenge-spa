import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import { useParams } from "react-router";
import { getProfileByUUID } from "../../utils/profileHelpers";
import { useState } from "react";
import View from "./View";
import Edit from "./Edit";

const ProfileContainer: React.FC<{ profileUUID: string }> = ({
  profileUUID,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleChange = () => {
    setEditMode(!editMode);
  };
  const params = useParams();
  const profile = getProfileByUUID(params.uuid)
  const allowEdit = params.uuid === profileUUID;
  return (
    <Box>
      <Typography variant="h4" sx={{color: profile?.color}} gutterBottom>
        {editMode ? "Edit" : "View"} {profile?.fullName}'s  Profile
      </Typography>
      {allowEdit && (
        <FormControlLabel
          control={
            <Switch
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Edit"
        />
      )}
      {editMode?<Edit profile={profile} />: <View profile={profile} /> }
      {allowEdit && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button variant="contained" size="large" color="error">
            Delete Profile
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProfileContainer;
