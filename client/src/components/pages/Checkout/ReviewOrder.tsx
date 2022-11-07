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
import { Loader } from "../../shared/Loader";

export const ReviewOrder: React.FC = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const { processStripeCreditCardPayment } = useStripeMethods();
    const { bagItems, shipping, subtotal, tax, total } = useAppSelector(state => state.bag);
    const { first, last, shippingAddress, card } = useAppSelector(state => state.customer);
    const [loading, setLoading] = React.useState(false);
    
    const processOrder = async () => {    
        const order: IOrder = {
            orderNumber: -1,
            createdAt: "",
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

        dispatch(await submitOrder(order));
    };

    const handleSubmitOrder = async () => {
        setLoading(true);
        const paymentResult = await processStripeCreditCardPayment();  
        console.log(paymentResult);
        await processOrder();
        history.push("/confirmation");
    };

    return(
        <>
            {loading
                ? <Loader />
                : <>
                    Order Review
                    <div className="d-flex align-items-start">
                        <GoBackButton prevStep={2} />
                        <SubmitOrderButton orderSubmitLoading={loading} bagItems={bagItems} handleSubmitOrder={handleSubmitOrder} />
                    </div>
                </>}
        </>
    );
}