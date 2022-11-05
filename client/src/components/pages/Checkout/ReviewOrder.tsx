import * as React from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useStripeMethods } from "../../../hooks/useStripeMethods";
import { IShippingOption } from "../../../types/IShippingOption";
import { submitOrder } from "../../../features/order/orderSlice";
import { GoBackButton } from "./GoBackButton";
import { SubmitOrderButton } from "./SubmitOrderButton";
import { IOrder } from "../../../types/IOrder";
import { PaymentMethod } from "@stripe/stripe-js";

export const ReviewOrder: React.FC = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const { processStripeCreditCardPayment } = useStripeMethods();
    const { bagItems, shipping, subtotal, tax, total } = useAppSelector(state => state.bag);
    const { loading: orderSubmitLoading } = useAppSelector(state => state.order);
    const { first, last, shippingAddress, card } = useAppSelector(state => state.customer);
    
    const processOrder = async () => {    
        const order: IOrder = {
            orderNumber: -1, // generated and overwritten by mongoose
            first,
            last,
            orderItems: bagItems,
            subtotal,
            tax,
            total,
            shippingAddress,
            shippingOption: shipping as IShippingOption,
            paymentMethod: card.paymentMethod as PaymentMethod
        };

        dispatch(submitOrder(order));
        history.push("/confirmation");
    };

    const handleSubmitOrder = async () => {
        const paymentResult = await processStripeCreditCardPayment();  
        console.log(paymentResult);
        processOrder();
    };

    return(
        <>
            Order Review
            <div className="d-flex align-items-start">
                <GoBackButton prevStep={2} />
                <SubmitOrderButton orderSubmitLoading={orderSubmitLoading} bagItems={bagItems} handleSubmitOrder={handleSubmitOrder} />
            </div>
        </>
    );
}