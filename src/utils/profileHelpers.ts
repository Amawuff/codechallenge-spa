import { IProfile, TUserShort, IUserDataForm } from "./types";

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

export const profileLoginMatch = (user: TUserShort): string | null => {
  const storedProfiles = getStoredProfiles();
  for (const key in storedProfiles) {
    if (
      storedProfiles[key].email.toLowerCase() === user.email.toLowerCase() &&
      storedProfiles[key].password === user.password
    ) {
      return key;
    }
  }
  return null;
};

export const getProfileByUUID = (uuid: string | undefined) => {
  const storedProfiles = getStoredProfiles();
  for (const key in storedProfiles) {
    if (key === uuid) {
      return storedProfiles[key];
    }
  }
  return null;
};

//this can create or edit depending on if the uuid you give it is new or existing
export const setProfileFromFormData = (
  formData: IUserDataForm,
  uuid: string
): void => {
  const storedProfiles = getStoredProfiles();

  const newProfile: IProfile = {};
  const formattedPhone = formData.phone?.replace(/ /g, "");
  delete formData.confirm_pass;
  newProfile[uuid] = {
    ...formData,
    phone: formattedPhone,
  };

  const results = { ...storedProfiles, ...newProfile };

  localStorage.setItem("profiles", JSON.stringify(results));
};

export const deleteProfileByUUID = (uuid: string | undefined) => {
  const storedProfiles = getStoredProfiles();
  for (const key in storedProfiles) {
    if (key === uuid) {
      delete storedProfiles[key];
    }
  }
  localStorage.setItem("profiles", JSON.stringify(storedProfiles));
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const country = phoneNumber.slice(0, 2);
  const area = phoneNumber.slice(2, 5);
  const localStart = phoneNumber.slice(5, 8);
  const localEnd = phoneNumber.slice(8, 12);
  return `${country} (${area}) ${localStart}-${localEnd}`;
};
