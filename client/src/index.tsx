import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './bootstrap.min.css'; // downloaded theme from https://bootswatch.com/simplex/
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ?? "");

root.render(
    <Provider store={store}>
        <Elements stripe={stripePromise}>
            <App />
        </Elements>
    </Provider>
);