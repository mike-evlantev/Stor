import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentIntent, PaymentIntentResult, PaymentMethod, PaymentMethodCreateParams, StripeCardNumberElement } from "@stripe/stripe-js";
import axios, { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../actions/messageActions";

interface useStripeMethodsResult {
    createPaymentMethod: () => Promise<PaymentMethod | undefined>;
    createPaymentIntent: () => Promise<AxiosResponse<any> | undefined>;
    confirmPaymentIntent: (clientSecret: string, paymentMethod: PaymentMethod) => Promise<PaymentIntent | undefined>;
    processStripeCreditCardPayment: () => Promise<PaymentIntent | undefined>;
}

export const useStripeMethods = (): useStripeMethodsResult => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const customer = useSelector((state: any) => state.customer);
    const {total} = useSelector((state: any) => state.bag);
    const {nameOnCard, email, phone, billingAddress, card} = customer;
    const {address1: line1, city, state, zip: postal_code} = billingAddress;    

    if (!stripe || !elements) {
        const msg1 = !stripe && "Stripe is undefined";
        const msg2 = !elements && "Elements is undefined";
        throw new Error(msg1 + " " + msg2);
    }

    // To charge a card with Stripe
    // 1. create payment method (client-side)
    const createPaymentMethod = async (): Promise<PaymentMethod | undefined> => {
        try {
            const cardNumber = elements.getElement("cardNumber");
            
            if (!cardNumber) {
                throw new Error("Card Number Element not found");
            }

            const billingDetails: PaymentMethodCreateParams.BillingDetails = {
                name: nameOnCard,
                email,
                phone,
                address: { city, line1, state, postal_code }
            };

            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: "card",
                card: cardNumber,
                billing_details: billingDetails,
            });
            
            if (error) {
                throw new Error(error.message);
            }

            console.log('paymentMethod' ,paymentMethod);
            return paymentMethod;
        } catch (error) {
            const message = narrowError(error);
            dispatch(setMessage(message, "danger"));
        }
    }

    // 2. create payment intent (must be executed server-side)
    const createPaymentIntent = async () => {
        try {
            const payload = { amount: total };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const result = await axios.post("/api/payment", payload, config);
            console.log('clientSecret', result.data)
            return result.data;
        } catch (error) {
            const message = narrowError(error);
            dispatch(setMessage(message, "danger"));
        }
        
    };

    // 3. confirm payment intent (must be executed client-side)    
    const confirmPaymentIntent = async (clientSecret: string, paymentMethod: PaymentMethod) => {
        try {
            const { paymentIntent, error }: PaymentIntentResult = await stripe.confirmCardPayment(clientSecret, { payment_method: paymentMethod?.id });

            if (error) {
                throw new Error(error.message);
            }

            return paymentIntent;
        } catch (error) {
            const message = narrowError(error);
            dispatch(setMessage(message, "danger"));
        }
    }

    const processStripeCreditCardPayment = async () => {
        console.log(card);
        const {paymentMethod} = card;
        const clientSecret = await createPaymentIntent();
        const paymentIntent = await confirmPaymentIntent(String(clientSecret), paymentMethod);
        return paymentIntent;
    }
    
    return {createPaymentMethod, createPaymentIntent, confirmPaymentIntent, processStripeCreditCardPayment};
}

const narrowError = (error: unknown): string => {
    let message: string;
    if (typeof error === "string") {
        message = error;
    } else if (error instanceof Error) {
        message = error.message;
    } else {
        message = String(error);
    }

    return message;
}