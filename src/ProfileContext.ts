import { createContext } from "react";

interface ProfileContextType {
  profile: string | null;
  login: (profileData: string) => void;
  logout: () => void;
}
//this casts null as ProfileContext to get around 
//typescript freaking out about the brief moment
//this is null

const ProfileContext = createContext<ProfileContextType>(null as unknown as ProfileContextType);
export default ProfileContext