import express from "express";
import { verifyTokenAndAuthorization } from "./verify.js";
import { register, login, logout } from "../controllers/authController.js";

const auth = express.Router();

//Register
auth.post("/register", register);

auth.post("/login", login);

auth.post("/logout/:id", verifyTokenAndAuthorization, logout);

export default auth;
