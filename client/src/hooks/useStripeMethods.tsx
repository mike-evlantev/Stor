import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentIntent, PaymentIntentResult, PaymentMethod, PaymentMethodCreateParams } from "@stripe/stripe-js";
import axios, { AxiosResponse } from "axios";
import { alert } from "../features/messages/messagesSlice";
import { IAddress } from "../types/IAddress";
import { narrowError } from "../utils/errorUtils";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

interface useStripeMethodsResult {
    createPaymentMethod: (billingAddress: IAddress, nameOnCard: string) => Promise<PaymentMethod | undefined>;
    createPaymentIntent: () => Promise<AxiosResponse<any> | undefined>;
    confirmPaymentIntent: (clientSecret: string, paymentMethod: PaymentMethod) => Promise<PaymentIntent | undefined>;
    processStripeCreditCardPayment: () => Promise<PaymentIntent | undefined>;
    toAddress: (address: IAddress) => PaymentMethodCreateParams.BillingDetails.Address;
}

export const useStripeMethods = (): useStripeMethodsResult => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useAppDispatch();
    const customer = useAppSelector(state => state.customer);
    const {email, phone, card} = customer;
    const {total} = useAppSelector(state => state.bag);

    if (!stripe || !elements) {
        const msg1 = !stripe && "Stripe is undefined";
        const msg2 = !elements && "Elements is undefined";
        throw new Error(msg1 + " " + msg2);
    }

    // To charge a card with Stripe
    // 1. create payment method (client-side)
    const createPaymentMethod = async (billingAddress: IAddress, nameOnCard: string): Promise<PaymentMethod | undefined> => {
        try {
            const cardNumber = elements.getElement("cardNumber");
            
            if (!cardNumber) {
                throw new Error("Card Number Element not found");
            }

            const billingDetails: PaymentMethodCreateParams.BillingDetails = {
                name: nameOnCard,
                email,
                phone,
                address: toAddress(billingAddress)
            };
            
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: "card",
                card: cardNumber,
                billing_details: billingDetails,
            });
            
            if (error) {
                throw new Error(error.message);
            }

            return paymentMethod;
        } catch (error) {
            const message = narrowError(error);
            dispatch(alert({text: message, type: "danger"}));
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
            
            return result.data;
        } catch (error) {
            const message = narrowError(error);
            dispatch(alert({text: message, type: "danger"}));
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
            dispatch(alert({text: message, type: "danger"}));
        }
    }

    const processStripeCreditCardPayment = async () => {
        const {paymentMethod} = card;
        const clientSecret = await createPaymentIntent();
        const paymentIntent = await confirmPaymentIntent(String(clientSecret), paymentMethod as PaymentMethod);
        return paymentIntent;
    }

    const toAddress = (address: IAddress): PaymentMethodCreateParams.BillingDetails.Address => {
        return {
            line1: address.address1,
            line2: address?.address2,
            city: address.city,
            state: address.state,
            postal_code: address.zip,
            country: undefined
        };
    }
    
    return {createPaymentMethod, createPaymentIntent, confirmPaymentIntent, processStripeCreditCardPayment, toAddress};
}
