import asyncHandler from "express-async-handler"; // instead of writing try/catches
import Stripe from "stripe";

// @route       POST api/payment
// @desc        Process a payment
// @access      Public
export const processPayment = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { amount } = req.body;
  const cents = toCents(amount);
  const result = await stripe.paymentIntents.create({
    amount: cents, // in cents
    currency: "usd",
    description: "Stor Test Order",
    payment_method_types: ["card"],
  });

  console.log("client_secret", result.client_secret);

  res.status(200).json(result.client_secret);
});

const toCents = (amount) => {
  const cents = amount * 100;
  return Math.floor(cents);
};
