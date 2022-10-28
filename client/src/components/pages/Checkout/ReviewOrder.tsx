import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { submitOrder } from "../../../actions/orderActions";
import { PaymentMethod } from "../../../enums/PaymentMethod";
import { useStripeMethods } from "../../../hooks/useStripeMethods";
import { IShippingOption } from "../../../types/IShippingOption";
import { GoBackButton } from "./GoBackButton";
import { SubmitOrderButton } from "./SubmitOrderButton";

interface Props {
    paymentMethod: PaymentMethod;
    onStepChange: (step: number) => void;
}

export const ReviewOrder: React.FC<Props> = ({paymentMethod, onStepChange}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { processStripeCreditCardPayment } = useStripeMethods();
    const shippingOptions = useSelector((state: any) => state.shippingOptions);
    const { bagItems, shipping, subtotal, tax, total } = useSelector((state: any) => state.bag);
    const { loading: orderSubmitLoading } = useSelector((state: any) => state.order);
    const customer = useSelector((state: any) => state.customer);
    
    const processPaymentAsync = async () => {
        let result = {} as any; // TODO: needs to be a proper type     

        switch (paymentMethod) {
            case PaymentMethod.CreditCard:
                result = await processStripeCreditCardPayment();
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
        const { id, icon, ...shippingOption } = shippingOptions.find(
            (o: IShippingOption) => o.id === 1//shippingOptionId
        );
    
        const order = {
            first: customer.first,
            last: customer.last,
            orderItems: bagItems,
            taxAmount: tax,
            totalAmount: total,
            isPaid: true,
            shippingAddress: customer.shippingAddress,
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
                <GoBackButton prevStep={2} handleClick={onStepChange} />
                <SubmitOrderButton orderSubmitLoading={orderSubmitLoading} bagItems={bagItems} handleSubmitOrder={handleSubmitOrder} />
            </div>
        </>
    );
}