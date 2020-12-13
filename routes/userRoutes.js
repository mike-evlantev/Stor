import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authHandler.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/profile").put(protect, updateUserProfile);

export default router;
