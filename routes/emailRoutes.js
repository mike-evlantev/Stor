import express from "express";
import { sendEmail } from "../controllers/emailController.js";
import { admin } from "../middleware/authHandler.js";
const router = express.Router();

router.post("/send", admin, sendEmail);

export default router;