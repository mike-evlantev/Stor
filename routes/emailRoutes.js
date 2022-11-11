import express from "express";
import { sendEmail } from "../controllers/emailController.js";
import { protect } from "../middleware/authHandler.js";
const router = express.Router();

router.post("/send", protect, sendEmail);

export default router;