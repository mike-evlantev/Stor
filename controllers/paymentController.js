import asyncHandler from "express-async-handler"; // instead of writing try/catches
import Stripe from "stripe";

// @route       POST api/payment
// @desc        Process a payment
// @access      Public
export const processPayment = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const {amount, paymentMethodId} = req.body;
  console.log("req.body", req.body);  
  const response = await stripe.paymentIntents.create({
    amount, // in cents
    currency: "usd",
    description: "Stor Test Order",
    payment_method_types: ["card"],
  });

  console.log(response.data);

  const confirmedCardPayment = await stripe.confirmCardPayment(data.client_secret, { payment_method: paymentMethodId });
  console.log(confirmedCardPayment);

  res.status(200).json(confirmedCardPayment);
});
