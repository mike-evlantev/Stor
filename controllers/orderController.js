import asyncHandler from "express-async-handler"; // instead of writing try/catches
import Order from "../models/orderModel.js";

// @route       POST api/orders
// @desc        Create an order
// @access      Public
export const createOrder = asyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = req.body;

  const order = new Order({
    firstName,
    middleName,
    lastName,
    orderItems,
    //user: req.user._id,
    shippingAddress,
    paymentMethod,
    taxAmount,
    shippingAmount,
    totalAmount,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});
