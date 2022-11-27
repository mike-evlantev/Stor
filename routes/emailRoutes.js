import express from "express";
import { sendEmail, sendResetPasswordEmail } from "../controllers/emailController.js";
import { admin } from "../middleware/authHandler.js";
const router = express.Router();

router.post("/send", admin, sendEmail);
router.post("/sendReset", sendResetPasswordEmail);

export default router;