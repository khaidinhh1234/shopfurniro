import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  Logout,
  Signin,
  Signup,
  updateUser,
} from "../controllers/auth";
import { forgotPassword } from "../controllers/forgotPassword";

const RouterAuth = Router();

RouterAuth.post("/signin", Signin);
RouterAuth.post("/signup", Signup);
RouterAuth.post("/forgotPassword", forgotPassword);
RouterAuth.post("/logout", Logout);
RouterAuth.get("/users", getAllUsers);
RouterAuth.get("/users/:id", getUser);
RouterAuth.put("/users/:id", updateUser);
RouterAuth.delete("/users/:id", deleteUser);
export default RouterAuth;
