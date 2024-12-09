import { useContext } from "react";
import { useNavigate } from "react-router";
import ProfileContext from "../ProfileContext";
import { Alert, Button, Typography, Box } from "@mui/material";

const NotLoggedIn: React.FC = () => {
    const navigate = useNavigate()
  return (
    <Box>
      <Alert variant="filled" severity="warning">
        You are not logged in!
      </Alert>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Per Requirements we log you out after a minute!
      </Typography>
    
      <Typography>
      Head back to the Homepage to Log In!
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button variant="contained" size="large" onClick={()=>{navigate("/")}}>
          Take me there
        </Button>
      </Box>
    </Box>
  );
};
export default NotLoggedIn;
