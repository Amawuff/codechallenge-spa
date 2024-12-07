export interface Profile {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  color: "blue" | "red" | "green" | "yellow" | "purple" | "black" | "orange";
}
