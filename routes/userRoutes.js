import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authHandler.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.put("/update", protect, updateUser);

export default router;
