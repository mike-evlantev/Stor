import express from "express";
import {
  registerUser,
  loginUser,
  userProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authHandler.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.route("/profile").get(protect, userProfile);

export default router;
