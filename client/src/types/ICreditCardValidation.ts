import { StripeCardCvcElementChangeEvent, StripeCardExpiryElementChangeEvent, StripeCardNumberElementChangeEvent } from "@stripe/stripe-js";

export interface ICreditCardValidation {
    number: StripeCardNumberElementChangeEvent;
    expiry: StripeCardExpiryElementChangeEvent;
    cvc: StripeCardCvcElementChangeEvent;
}