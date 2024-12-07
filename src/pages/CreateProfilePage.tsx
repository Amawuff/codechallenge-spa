import { getStoredProfilesArray, profileEmailExists } from "../storageHelpers";
import { Profile } from "../types";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const CreateProfilePage: React.FC = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Profile>();
  const onCreateProfile: SubmitHandler<Profile> = (formData) => {
    console.log("Data:", formData);

    // const newProfile: Profile = {
    //   email: "joe.buchalter@gmail.com",
    //   password: "password",
    //   fullName: " Joe Buchalter",
    //   phone: "+17347161221",
    //   color: "orange",
    // };
    const storedProfiles = getStoredProfilesArray();
    storedProfiles.push(formData);
    localStorage.setItem("profiles", JSON.stringify(storedProfiles));
    navigate("/");
  };

  return (
    <div>
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit(onCreateProfile)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              validate: (value) =>
                !profileEmailExists(value) ||
                "A profile with this email is already in use (SECURITY!)",
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <p>
            Requirements: between 10 - 32 letters, numbers, special characters
            (not a letter or number). There must be at least 2 uppercase, 2
            numbers and 1 special character.
          </p>
          <input
            id="password"
            type="password"
            {...register("password", {
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
                value:
                  /^(?=(?:.*[A-Z]){2})(?=(?:.*\d){2})(?=(?:.*[@$!%*?&]){1}).*$/,
                message:
                  "There must be at least 2 uppercase, 2 numbers and 1 special character.",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            id="fullname"
            type="text"
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name should be at least 3 characters",
              },
            })}
          />
          {errors.fullName && <p>{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <Controller
            name="phone"
            control={control}
            rules={{
              validate: (value) => isValidPhoneNumber(value || ""),
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                value={value}
                onChange={onChange}
                defaultCountry="US"
                id="phone"
              />
            )}
          />
          {errors.phone && <p>This is not a valid phone number</p>}
        </div>
        <label htmlFor="color">Choose your favorite Color:</label>

        <select id="color" {...register("color", { required: "Your Favorite Color is required!" })}>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
          <option value="black">Black</option>
          <option value="orange">Orange</option>
        </select>
        {errors.color && <p>{errors.color.message}</p>}

        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfilePage;
