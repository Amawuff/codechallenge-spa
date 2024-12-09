export interface IUserDataForm {
  email: string;
  password: string;
  confirm_pass?: string;
  fullName: string;
  phone?: string;
  color: "blue" | "red" | "green" | "yellow" | "purple" | "black" | "orange";
}

export type TUserData = Pick<
  IUserDataForm,
  "email" | "password" | "fullName" | "phone" | "color"
>;

type UUID = string;

export interface IProfile {
  [key: UUID]: TUserData;
}

export type TUserShort = Pick<TUserData, "email" | "password">;
