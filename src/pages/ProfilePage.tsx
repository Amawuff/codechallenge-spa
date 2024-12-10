import { useContext } from "react";
import ProfileContext from "../ProfileContext";
import NotLoggedIn from "../components/NotLoggedIn";
import ProfileContainer from "../components/Profile/ProfileContainer";

const ProfilePage: React.FC = () => {
  const { profile } = useContext(ProfileContext);
  return profile === null ? (
    <NotLoggedIn />
  ) : (
    <ProfileContainer profileUUID={profile} />
  );
};

export default ProfilePage;
