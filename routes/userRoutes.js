import express from "express";
import { registerUser, loginUser, updateUser, getUsers, getUserById, createUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authHandler.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/create", admin, createUser);
router.put("/update", protect, updateUser);
router.get("/", admin, getUsers);
router.get("/:id", admin, getUserById);

export default router;
