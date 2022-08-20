import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/layout/Footer.js";
import Header from "./components/layout/Header.js";
import { Routes } from "./components/routing/Routes.js";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const App = () => {
  // Avoid getting a new instance of 'stripePromise' all the time on render
  // eslint-disable-next-line
  // const [stripePromise, setStripePromise] = useState(() =>

  // );

  return (
    <Router>
      <Header />
      <Elements stripe={stripePromise}>
        <main className="py-3">
          <Route component={Routes} />
        </main>
      </Elements>
      <Footer />
    </Router>
  );
};

export default App;
