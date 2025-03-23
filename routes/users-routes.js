import express from "express";
import usersController from "../controllers/users-controllers.js";

const router = express.Router();

// POST: Create a new user (sign-up)
router.post("/", usersController.createUser);

// POST: Login an existing user
router.post("/login", usersController.loginUser);

// GET: Get all users 
router.get("/", usersController.getAllUsers);

export default router;
