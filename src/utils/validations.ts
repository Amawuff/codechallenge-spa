import {
  profileEmailExists,
} from "../utils/storageHelpers";

//REGEX to make sure email is in a valid format
export const validEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//REGEX for password conditions: There must be at least 2 uppercase, 2 numbers and 1 special character.
//note that max and min length rules are handled by react-hook-form seperately
export const validPasswordRegex =
  /^(?=(?:.*[A-Z]){2})(?=(?:.*\d){2})(?=(?:.*[@$!%*?&]){1}).*$/;

// VALIDATION RULES:
// these objects are used by react-hook-form
export const emailValidationRules = {
  required: "Email is required",
  pattern: {
    value: validEmailRegex,
    message: "Invalid Email address format",
  },
  validate: (value:string) =>  !profileEmailExists(value) || "A profile with this email is already in use",


};

export const passwordValidationRules = {
  required: "Password is required",
  minLength: {
    value: 10,
    message: "Password should be at least 10 characters",
  },
  maxLength: {
    value: 32,
    message: "Password should be no more than 32 characters",
  },
  pattern: {
    value: validPasswordRegex,
    message:
      "There must be at least 2 uppercase, 2 numbers and 1 special character.",
  },
};

export const fullNameValidationRules ={
  required: "Full name is required",
  minLength: {
    value: 3,
    message: "Full name should be at least 3 characters",
  },
}