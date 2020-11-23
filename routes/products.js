import express from 'express';
import asyncHandler from 'express-async-handler'; // instead of writing try/catches 
import Product from '../models/productModel.js';


const router = express.Router();

// @route       GET api/products
// @desc        Get all products
// @access      Public
router.get("/", /*auth, */asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
}));

// @route       GET api/products/:id
// @desc        Get product by id
// @access      Public
router.get("/:id", /*auth, */asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(product)
    res.json(product);
  else
    res.status(404).json({message: "Product not found"});
}));

export default router;