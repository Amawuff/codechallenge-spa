import { useNavigate } from "react-router";

import { AppBar, Box, Toolbar, Button } from "@mui/material";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button size="large" onClick={() => navigate("/")}>
              Code Challenge SPA
            </Button>
          </Box>

          <Button
            color="inherit"
            variant="outlined"
            onClick={() => navigate("create-profile")}
          >
            Create Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
