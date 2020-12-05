import express from "express";
import { loginUser, userProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authHandler.js";
const router = express.Router();

router.post("/login", loginUser);
router.route("/profile").get(protect, userProfile);

export default router;
