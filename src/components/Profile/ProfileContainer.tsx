import {
  Box,
  FormControlLabel,
  Grid2 as Grid,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { getProfileByUUID } from "../../utils/profileHelpers";
import Delete from "./Delete";
import Edit from "./Edit";
import View from "./View";

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
            <Delete uuid={params.uuid as string} />
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
