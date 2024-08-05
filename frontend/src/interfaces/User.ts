export interface User {
  _id?: string | number;
  name: string;

  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
  role?: "admin" | "member";
}
