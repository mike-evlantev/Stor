import express from "express";
import { getProductById, getProducts, createProduct, updateProduct } from "../controllers/productController.js";
import { admin } from "../middleware/authHandler.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.post("/create", admin, createProduct);
router.put("/update", admin, updateProduct);

export default router;
