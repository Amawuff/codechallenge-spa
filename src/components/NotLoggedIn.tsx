import { Alert, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const NotLoggedIn: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Alert variant="filled" severity="warning">
        You are not logged in!
      </Alert>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Per Requirements your session has ended after one minute!
      </Typography>

      <Typography>Head back to the Homepage to Log In!</Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/");
          }}
        >
          Take me there
        </Button>
      </Box>
    </Box>
  );
};
export default NotLoggedIn;
