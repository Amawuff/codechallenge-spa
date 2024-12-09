import { IProfile, TUserShort } from "./types";

export const getStoredProfiles = (): IProfile => {
  const storedProfiles = localStorage.getItem("profiles");
  const profiles = storedProfiles ? JSON.parse(storedProfiles) : {};
  return profiles;
};

export const profileEmailExists = (email: string): boolean => {
  const storedProfiles = getStoredProfiles();
  for (const key in storedProfiles) {
    if (storedProfiles[key].email.toLowerCase() === email.toLowerCase()) {
      return true;
    }
  }
  return false;
};


export const profileLoginMatch = (user: TUserShort): string| null => {
    const storedProfiles = getStoredProfiles();
    for (const key in storedProfiles) {
      if (storedProfiles[key].email.toLowerCase() === user.email.toLowerCase() &&
      storedProfiles[key].password === user.password
    ) {
        return key
      }
    }
    return null;
  };