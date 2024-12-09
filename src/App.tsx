import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router";
import CreateProfilePage from "./pages/CreateProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import LoginPage from "./pages/LoginPage";
import Root from "./pages/Root";
import ViewProfilePage from "./pages/ViewProfilePage";
import ProfileContext from "./ProfileContext";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/create-profile", element: <CreateProfilePage /> },
      { path: "/edit-profile/:uuid", element: <EditProfilePage /> },
      { path: "/view-profile/:uuid", element: <ViewProfilePage /> },
    ],
  },
]);
export default function App() {

  const [profile, setProfile] = useState<string | null>(null)

 
  const logout = () => {
    setProfile(null);
  };

  const login = (profileData:string) => {
    setProfile(profileData);
    setTimeout(logout,60000)
  };

  return (
    <ProfileContext.Provider value={{ profile, login, logout }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ProfileContext.Provider>
  );
}
