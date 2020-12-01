import asyncHandler from 'express-async-handler'; // instead of writing try/catches 
import Product from '../models/productModel.js';

// @route       GET api/products
// @desc        Get all products
// @access      Public
export const getProducts = asyncHandler(async(req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @route       GET api/products/:id
// @desc        Get product by id
// @access      Public
export const getProductById = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});