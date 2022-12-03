import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Loader } from "../../shared/Loader";
import { EmptyBag } from "../bag/EmptyBag";
import { OrderItems } from "./OrderItems";

interface Props {
    children: React.ReactElement;
}

export const Checkout: React.FC<Props> = ({children}) => {
    const { loading: authLoading } = useSelector((state: any) => state.auth);
    const { bagItems, shipping, subtotal, tax, total } = useSelector((state: any) => state.bag);
    const { loading: orderSubmitLoading } = useSelector((state: any) => state.order);

    // const childrenWithProps = React.Children.map(children, child =>
    //     React.cloneElement(child, { paymentMethod, handlePaymentMethodChange })
    // );
    
    return (
        <Container className="d-flex flex-column py-5">
            {bagItems.length === 0 
                ? <EmptyBag />
                : authLoading || orderSubmitLoading 
                    ? <Loader />
                    : <>
                        <Row className="py-1 px-3">
                            <h1>Checkout</h1>
                        </Row>
                        {/* <Row className="py-1 px-3">
                            <span>{stageDisplaySubtitle}</span>
                        </Row> */}
                        <Row className="py-3">
                            {/* LEFT COLUMN */}
                            <Col md={7}>{children}</Col>
                            {/* RIGHT COLUMN */}
                            <Col md={5}>
                                <div className="sticky-top">
                                    <OrderItems
                                        items={bagItems}
                                        shipping={shipping}
                                        subtotal={subtotal}
                                        tax={tax}
                                        total={total} />
                                </div>
                            </Col>
                        </Row>
                    </>}
        </Container>
    );
}