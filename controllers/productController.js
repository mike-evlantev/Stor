import asyncHandler from "express-async-handler"; // instead of writing try/catches
import Product from "../models/productModel.js";

// @route       GET api/products
// @desc        Get all products
// @access      Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @route       GET api/products/:id
// @desc        Get product by id
// @access      Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @route       POST api/products/create
// @desc        Create product
// @access      Private (Admin)
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product(req.body);
  const created = await product.save();
  res.status(201).json(created);
});

// @route       PUT api/products/update
// @desc        Update product
// @access      Private (Admin)
export const updateProduct = asyncHandler(async (req, res) => {
  const product = req.body;
  const filter = { _id: product.id };
  const updated = await Product.findOneAndUpdate(filter, product, { new: true });
  if (updated) {
    res.json(updated);
  } else {
    res.status(500);
    throw new Error("Unable to update product");
  }
});