import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useStripeMethods } from "../../../hooks/useStripeMethods";
import { IShippingOption } from "../../../types/IShippingOption";
import { submitOrder } from "../../../features/order/orderSlice";
import { GoBackButton } from "./GoBackButton";
import { IOrder } from "../../../types/IOrder";
import { PaymentMethod } from "@stripe/stripe-js";
import { Loader } from "../../shared/Loader";
import { ShippingInfoSummary } from "./ShippingInfoSummary";
import { Button, Col, Form, ListGroup } from "react-bootstrap";

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

    const getCreditCardBrandIcon = (brand: string | undefined) => {
        //`amex`, `diners`, `discover`, `jcb`, `mastercard`, `unionpay`, `visa`, or `unknown`.
        switch (brand) {
            case "amex":
                return <i className="fab fa-cc-amex fa-4x"></i>;
            case "diners":
                return <i className="fab fa-cc-diners-club fa-4x"></i>;
            case "discover":
                return <i className="fab fa-cc-discover fa-4x"></i>;
            case "jcb":
                return <i className="fab fa-cc-jcb fa-4x"></i>;
            case "mastercard":
                return <i className="fab fa-cc-mastercard fa-4x"></i>;
            case "visa":
                return <i className="fab fa-cc-visa fa-2x"></i>;
            case "unionpay":
            case "unknown":
            case undefined:
            default:
                return <i className="fas fa-credit-card fa-4x"></i>;
        }
    }

    return(
        <>
            {loading
                ? <Loader />
                : <>
                    <ShippingInfoSummary />
                    <ListGroup variant="flush" className="py-1">
                        <ListGroup.Item className="d-flex align-items-center">
                            <Col sm={6}>
                                <h4 className="py-3">
                                    <i className="far fa-check-circle"></i>{" "}
                                    Payment:
                                </h4>
                            </Col>
                            <Col sm={5}>
                                <div className="d-flex align-items-center">
                                    {getCreditCardBrandIcon(card.paymentMethod?.card?.brand)}
                                    <div className="mx-1"></div>
                                    <strong>ending in {card.paymentMethod?.card?.last4}</strong>
                                </div>
                            </Col>
                            <Col sm={1}>
                                <u className="float-end" onClick={() => history.push("checkout2")} style={{cursor: "pointer"}}>Edit</u>
                            </Col>
                        </ListGroup.Item>
                    </ListGroup>
                    <div className="d-flex align-items-start">
                        <GoBackButton prevStep={2} />
                        <div className="ms-auto">
                            <Button
                                variant="primary"
                                className="my-2 float-end"
                                onClick={() => handleSubmitOrder()}
                                disabled={loading || !bagItems || bagItems.length === 0}
                            >
                                Place Order
                            </Button>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-center w-100">
                        <Form.Text className="text-muted">
                            By placing an order you agree to Stor's{" "}
                            <Link to="/privacy">privacy policy</Link> and{" "}
                            <Link to="/terms">terms of use</Link>.
                        </Form.Text>
                    </div>
                </>}
        </>
    );
}