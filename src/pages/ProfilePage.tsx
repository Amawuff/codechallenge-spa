import { useContext } from "react";

import ProfileContext from "../ProfileContext";
import ProfileContainer from "../components/Profile/ProfileContainer";
import NotLoggedIn from "../components/NotLoggedIn";

const ProfilePage: React.FC = () => {
  const { profile } = useContext(ProfileContext);
  return profile === null ? <NotLoggedIn />: <ProfileContainer profileUUID={profile} />;
};

export default ProfilePage;
