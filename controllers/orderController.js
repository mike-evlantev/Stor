import asyncHandler from "express-async-handler"; // instead of writing try/catches
import Order from "../models/orderModel.js";

// @route       POST api/orders
// @desc        Create an order
// @access      Public
export const createOrder = asyncHandler(async (req, res) => {
  const {
    first,
    middle,
    last,
    orderItems,
    shippingAddress,
    paymentMethod,
    subtotal,
    tax,
    shippingOption,
    total
  } = req.body;

  const order = new Order({
    first,
    middle,
    last,
    orderItems,
    userId: req.user?._id,
    shippingAddress,
    paymentMethod,
    subtotal,
    tax,
    shippingOption,
    total,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});
