import express, { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { loginUser } from "../controllers/auth.controllers.js";

const authrouter = Router()

authrouter.post('/register',registerUser)
authrouter.post('/login',loginUser)

export {authrouter}