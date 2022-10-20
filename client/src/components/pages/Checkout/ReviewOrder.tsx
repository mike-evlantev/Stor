import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentIntentResult } from "@stripe/stripe-js";
import { PaymentIntent, PaymentMethodCreateParams } from "@stripe/stripe-js/types/api";
import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { submitOrder } from "../../../actions/orderActions";
import { PaymentMethod } from "../../../enums/PaymentMethod";
import { IShippingOption } from "../../../types/IShippingOption";
import { GoBackButton } from "./GoBackButton";
import { SubmitOrderButton } from "./SubmitOrderButton";

interface Props {
    paymentMethod: PaymentMethod;
    handleStepChange: (step: number) => void;
}

export const ReviewOrder: React.FC<Props> = ({paymentMethod, handleStepChange}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const shippingOptions = useSelector((state: any) => state.shippingOptions);
    const { bagItems, shipping, subtotal, tax, total } = useSelector((state: any) => state.bag);
    const { loading: orderSubmitLoading } = useSelector((state: any) => state.order);
    const customer = useSelector((state: any) => state.customer);
    const { billingAddress, shippingAddress, email, phone, nameOnCard } = customer;
    const { address1, city, state, zip } = billingAddress;
    
    const processCardPayment = async (payload: any) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const data = await axios.post("/api/payment", payload, config);
        return data;
    };

    const processPaymentAsync = async () => {
        let result = {} as any; // TODO: needs to be a proper type
        const billingDetails: PaymentMethodCreateParams.BillingDetails = {
            name: nameOnCard,
            email,
            phone,
            address: { city, line1: address1, state, postal_code: zip }
        };

        switch (paymentMethod) {
            case PaymentMethod.CreditCard:
                if (!stripe || !elements) {
                    // Stripe.js has not yet loaded.
                    // Make sure to disable form submission until Stripe.js has loaded.
                    console.warn("Stripe", stripe);
                    console.warn("Stripe elements", elements);
                    return;
                }

                // 1. create payment method
                const cardNumber = elements.getElement("cardNumber");
                if (cardNumber) {
                    const { error, paymentMethod } = await stripe.createPaymentMethod({
                        type: "card",
                        card: cardNumber,
                        billing_details: billingDetails,
                    });

                    if (!error) {
                        try {
                        // 2. create payment intent (must be executed server-side)
                        const { data: client_secret } = await processCardPayment({ amount: total });
    
                        // 3. confirm payment intent (must be executed client-side)
                        const { paymentIntent, error }: PaymentIntentResult = await stripe.confirmCardPayment(client_secret, { payment_method: paymentMethod.id });
                        if (paymentIntent && !error) {
                            result.id = paymentIntent.id;
                            result.status = paymentIntent.status;
                        }
                                    
                        } catch (error) {
                            console.error("Error:", error);
                        }
                    } else {
                        console.error("Create Payment Method Failed: ", error.message);
                    }
                } else {
                    console.error("Card number element not found");
                    return;
                }
                

                

                break;
            case PaymentMethod.PayPal:
                // Process Paypal Payment
                console.log("Processing Paypal Payment");
                result.id = "";
                result.status = "";
                result.update_time = "";
                result.email_address = "";
                break;
            default:
                break;
        }

        //setPaymentResult(result);
        console.log("result", result);
    };

      const processOrder = () => {
        // const shippingAddress = {
        //   address1: currentUser.address1,
        //   address2: currentUser.address2,
        //   city: currentUser.city,
        //   state: currentUser.state,
        //   zip: currentUser.zip,
        // };
    
        const { id, icon, ...shippingOption } = shippingOptions.find(
            (o: IShippingOption) => o.id === 1//shippingOptionId
        );
    
        const order = {
            customer,
            orderItems: bagItems,
            taxAmount: tax,
            totalAmount: total,
        //   paymentMethod: paymentMethod,
        //   ...(paymentMethod === PaymentMethod.CreditCard && {
        //     creditCardPaymentResult: paymentResult,
        //   }),
        //   ...(paymentMethod === PaymentMethod.PayPal && {
        //     payPalPaymentResult: paymentResult,
        //   }),
            isPaid: true,
            shippingAddress,
            shippingOption,
        };
    
        console.log(order);
        // submit order
        dispatch(submitOrder(history, order));
        // clean up
        //cleanUpOnSubmit();
      };

    const handleSubmitOrder = async () => {
        const paymentResult = await processPaymentAsync();
        console.log(paymentResult);
        processOrder();
    };

    return(
        <>
            Order Review
            <div className="d-flex align-items-start">
                <GoBackButton prevStep={1} handleClick={handleStepChange} />
                <SubmitOrderButton orderSubmitLoading={orderSubmitLoading} bagItems={bagItems} handleSubmitOrder={handleSubmitOrder} />
            </div>
        </>
    );
}