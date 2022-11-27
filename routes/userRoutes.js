import express from "express";
import { registerUser, loginUser, updateUser, getUsers, getUserById, createUser, resetPassword, decodeToken } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authHandler.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/create", admin, createUser);
router.put("/update", protect, updateUser);
router.get("/", admin, getUsers);
router.get("/:id", admin, getUserById);
router.post("/reset/:token", protect, resetPassword);
router.get("/decode/:token", protect, decodeToken);

export default router;
