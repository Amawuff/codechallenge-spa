import { useState } from "react";
import { SubmitHandler} from "react-hook-form";
import SharedForm from "./SharedForm"
import { IUserDataForm, TUserData } from "../../utils/types"
import { setProfileFromFormData } from "../../utils/profileHelpers";
import {Box, Alert} from "@mui/material"
interface EditProps {
    profile: TUserData | null
    uuid: string
    setEditMode: (editMode: boolean) => void 
}
const Edit: React.FC<EditProps>  = ({profile, uuid, setEditMode}) => {
    const [editSuccess, setEditSuccess] = useState(false);


    const onEditProfile: SubmitHandler<IUserDataForm> = (
        formData: IUserDataForm
      ) => {
        setProfileFromFormData(formData,uuid)
        setEditSuccess(true);
        setTimeout(()=>{setEditMode(false)},5000)
      };

return(
     <Box>
     <SharedForm onSubmit ={onEditProfile} defaults={profile} uniqueEmail={false}/>
     {editSuccess && <Alert  variant="filled" severity="success">Profile Successfully edited! Sending you back to view!</Alert>}
     </Box> 
    )
}

export default Edit