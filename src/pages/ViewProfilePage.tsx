import { useContext } from "react";
import ProfileContext from "../ProfileContext";
import NotLoggedIn from "../components/NotLoggedIn";

const ViewProfilePage: React.FC = () => {
  const { profile } = useContext(ProfileContext);
  return profile === null ? <NotLoggedIn />: <h1>Profile Here</h1>;
};

export default ViewProfilePage;
