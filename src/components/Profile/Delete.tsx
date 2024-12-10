import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useNavigate } from "react-router";
import { deleteProfileByUUID } from "../../utils/profileHelpers";

interface DeleteProps {
  uuid: string;
}
const Delete: React.FC<DeleteProps> = ({ uuid }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteProfileByUUID(uuid);
    navigate("/");
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Delete Profile
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          Confirm Delete Profile
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you delete the profile it's gone forever!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Delete;
