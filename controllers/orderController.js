import asyncHandler from "express-async-handler"; // instead of writing try/catches
import Order from "../models/orderModel.js";

// @route       POST api/orders
// @desc        Create an order
// @access      Private
export const createOrder = asyncHandler(async (req, res) => {
  // req.body destructure

  const { address1, address2, city, state, zip } = req.body;

  const order = new Order({});

  const createOrder = await Order.save();
  res.status(201).json(createdOrder);
});
