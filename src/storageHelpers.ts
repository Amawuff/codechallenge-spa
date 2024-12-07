import {Profile} from './types'

export const getStoredProfilesArray = ():Profile[] => {
    const storedProfiles = localStorage.getItem('profiles');
    const profiles = storedProfiles ?JSON.parse(storedProfiles) : [];
    return profiles
}


export const profileEmailExists = (email: string): boolean => { 
    const storedProfiles = getStoredProfilesArray(); 
    return storedProfiles.some((profile: Profile) => email.toLowerCase() === profile.email.toLowerCase());
};