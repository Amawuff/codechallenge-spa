import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Button,
  Grid2 as Grid,
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
  const profile = getProfileByUUID(params.uuid);
  const allowEdit = params.uuid === profileUUID;
  return (
    <Box>
      <Typography variant="h4" sx={{ color: profile?.color }} gutterBottom>
        {editMode ? "Edit" : "View"} {profile?.fullName}'s Profile
      </Typography>
      {allowEdit && (
        <Grid container spacing={2} mb={4}>
          <Grid size={9}>
            <FormControlLabel
              control={<Switch onChange={handleChange} checked={editMode} />}
              label={editMode ? "Cancel" : "Edit"}
            />
          </Grid>

          <Grid size={3}>
            <Button variant="contained" color="error">
              Delete Profile
            </Button>
          </Grid>
        </Grid>
      )}
      {editMode ? (
        <Edit
          profile={profile}
          uuid={params.uuid as string}
          setEditMode={setEditMode}
        />
      ) : (
        <View profile={profile} />
      )}
    </Box>
  );
};

export default ProfileContainer;
