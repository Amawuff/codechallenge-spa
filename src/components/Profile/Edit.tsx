import { Alert, Box } from "@mui/material";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { setProfileFromFormData } from "../../utils/profileHelpers";
import { IUserDataForm, TUserData } from "../../utils/types";
import SharedForm from "./SharedForm";
interface EditProps {
  profile: TUserData | null;
  uuid: string;
  setEditMode: (editMode: boolean) => void;
}
const Edit: React.FC<EditProps> = ({ profile, uuid, setEditMode }) => {
  const [editSuccess, setEditSuccess] = useState(false);

  const onEditProfile: SubmitHandler<IUserDataForm> = (
    formData: IUserDataForm
  ) => {
    setProfileFromFormData(formData, uuid);
    setEditSuccess(true);
    setTimeout(() => {
      setEditMode(false);
    }, 5000);
  };

  return (
    <Box>
      <SharedForm
        onSubmit={onEditProfile}
        defaults={profile}
        uniqueEmail={false}
      />
      {editSuccess && (
        <Alert variant="filled" severity="success">
          Profile Successfully edited! Sending you back to view!
        </Alert>
      )}
    </Box>
  );
};

export default Edit;
