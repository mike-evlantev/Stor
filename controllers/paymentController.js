import asyncHandler from "express-async-handler"; // instead of writing try/catches
import Stripe from "stripe";

// @route       POST api/payment
// @desc        Process a payment
// @access      Public
export const processPayment = asyncHandler(async (req, res) => {
  const { id, qty } = req.body;
  console.log("Processing payment...", process.env.STRIPE_SECRET_KEY);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const payment = await stripe.paymentIntents.create({
    amount: 1099, // in cents
    currency: "usd",
    description: "Stor Test Charge",
    payment_method_types: ["card"],
  });

  console.log("Payment processed successfully", payment);

  // const order = new Order({
  //   firstName,
  //   middleName,
  //   lastName,
  //   orderItems,
  //   //user: req.user._id,
  //   shippingAddress,
  //   paymentMethod,
  //   taxAmount,
  //   shippingOption,
  //   totalAmount,
  // });

  //const createdOrder = await order.save();
  res.status(201).json(payment);
});
