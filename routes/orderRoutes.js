import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { getOrders } from "../controllers/orderController.js";
import { admin } from "../middleware/authHandler.js";
const router = express.Router();

router.post("/", createOrder);
router.get("/", admin, getOrders);

export default router;
