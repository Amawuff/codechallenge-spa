import { Box, Button, MenuItem, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { favColors } from "../../utils/colors";
import { IUserDataForm, TUserData } from "../../utils/types";
import {
  emailValidationRules,
  fullNameValidationRules,
  passwordValidationRules,
  uniqueEmailValidationRules,
} from "../../utils/validations";

interface SharedFormProps {
  onSubmit: SubmitHandler<IUserDataForm>;
  defaults?: TUserData | null;
  uniqueEmail?: boolean;
}

const SharedForm: React.FC<SharedFormProps> = ({
  onSubmit,
  defaults,
  uniqueEmail,
}) => {
  const {
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    setValue,
    control,
  } = useForm<IUserDataForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirm_pass: "",
      phone: "",
      color: "blue",
      fullName: "",
    },
  });

  useEffect(() => {
    if (defaults) {
      setValue("email", defaults.email, {
        shouldValidate: false,
        shouldTouch: true,
      });
      setValue("password", defaults.password, {
        shouldValidate: false,
        shouldTouch: true,
      });
      setValue("confirm_pass", defaults.password, {
        shouldValidate: false,
        shouldTouch: true,
      });
      setValue("fullName", defaults.fullName, {
        shouldValidate: false,
        shouldTouch: true,
      });
      setValue("color", defaults.color, {
        shouldValidate: false,
        shouldTouch: true,
      });
      setValue("phone", defaults.phone, {
        shouldValidate: false,
        shouldTouch: true,
      });
    }
  }, [defaults, setValue]);

  const password = watch("password", "");

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={
            uniqueEmail ? uniqueEmailValidationRules : emailValidationRules
          }
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="standard"
              sx={{ mt: 2 }}
              fullWidth
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={passwordValidationRules}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="text"
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="standard"
              sx={{ width: "45%", my: 4 }}
            />
          )}
        />

        <Controller
          name="confirm_pass"
          control={control}
          rules={{
            required: "Password confirmation is required",
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirm Password"
              type="text"
              error={!!errors.confirm_pass}
              helperText={errors.confirm_pass?.message}
              variant="standard"
              sx={{ width: "45%", ml: "10%", my: 4 }}
            />
          )}
        />
        <Controller
          name="fullName"
          control={control}
          rules={fullNameValidationRules}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              variant="standard"
              fullWidth
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field: { ref: fieldRef, value, ...fieldProps } }) => (
            <MuiTelInput
              {...fieldProps}
              label="Phone Number"
              value={value ?? ""}
              inputRef={fieldRef}
              variant="standard"
              defaultCountry="US"
              disableDropdown
              sx={{ width: "45%", my: 4 }}
            />
          )}
        />

        <Controller
          name="color"
          control={control}
          rules={{
            required: "Favorite Color is required",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              value={field.value ?? ""}
              variant="standard"
              label="Favorite Color"
              error={!!errors.color}
              helperText={errors.color ? errors.color?.message : ""}
              sx={{ width: "45%", my: 4, ml: "10%" }}
            >
              {favColors.map((value, i) => (
                <MenuItem key={i} value={value} sx={{ color: value }}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            type="submit"
            color="primary"
            disabled={!isValid || isSubmitting}
            size="large"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SharedForm;
