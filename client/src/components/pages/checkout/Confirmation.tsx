import * as React from "react";
import { Button, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IAddress } from "../../../types/IAddress";
import { IName } from "../../../types/IName";
import { Address } from "../../shared/Address";
import { Loader } from "../../shared/Loader";
import { Last4 } from "../../shared/Last4";
import { getDisplayImageUrl, handleError } from "../../../utils/imageUtils";

export const Confirmation: React.FC = () => {
    const history = useHistory();
    const { success, loading, error, ...order } = useAppSelector(state => state.order);

    // If the user clicks the back button after submitting the order redirect home
    React.useEffect(() => {
        return () => {
            if (history.action === "POP") {
                history.push("/");
            }
        };
    }, [history]);

    if (!loading && (!success)) {
        history.push("/");
        return null;
    }

    return (
        <>
            {loading 
                ? <Loader /> 
                : <>
                    <div className="d-flex flex-column align-items-center">
                        <h1 className="my-2"><strong>Thank you!</strong></h1>
                        <h4>Your Stor order <strong>#{order.orderNumber}</strong> has been placed.</h4>
                        <span>An order confirmation and receipt will be emailed to <strong>{order.email}</strong> shortly.</span>
                    </div>
                    <div className="d-flex my-5">
                        <Col md={4}>
                            <div className="d-flex flex-column">
                                <h4><strong>Here are your order details</strong></h4>
                                <div className="p-1 my-3 bg-primary"></div>
                                <p><strong>Have a question?</strong></p>
                                <p>No problem! Let us know how we can help.</p>
                                <Button className="me-auto" style={{paddingLeft: 0}} variant="link">Live Chat</Button>
                                <Button className="me-auto" style={{paddingLeft: 0}} variant="link">1-800-123-4567</Button>
                                <Button className="me-auto" style={{paddingLeft: 0}} variant="link" onClick={() => history.push("returns")}>Return policy</Button>                             
                            </div>
                        </Col>
                        <Col md={8}>
                            <div className="d-flex align-items-start mx-5 mb-4">
                                <Col sm={6}>
                                    <h5><strong>Shipping</strong></h5>
                                </Col>
                                <Col sm={6}>
                                    <Address name={order as IName} address={order.shippingAddress as IAddress} />
                                </Col>
                            </div>
                            <div className="d-flex align-items-start mx-5 my-4">
                                <Col sm={6}>
                                    <h5><strong>Estimated delivery</strong></h5>
                                </Col>
                                <Col sm={6}>
                                    <div className="d-flex align-items-center">
                                        <i className={order.shippingOption?.icon}></i>
                                        <div className="mx-2">{order.shippingOption?.timeframe}</div>
                                    </div>
                                </Col>
                            </div>
                            <div className="d-flex align-items-start mx-5 mb-3">
                                <Col sm={6}></Col>
                                <Col sm={6}>
                                    {order.orderItems?.map(item =>
                                        <div className="d-flex my-2" key={item.id}>
                                            <Col md={3}>
                                                <Image src={getDisplayImageUrl(item.images)} alt={item.name} onError={handleError} fluid />
                                            </Col>
                                            <Col md={9} className="d-flex flex-column" style={{paddingLeft: "0.75rem"}} >
                                                <strong>{item.name}</strong>
                                                <div className="d-flex mt-auto">
                                                    <span>Qty: {item.quantity}</span>
                                                    <span className="ms-auto">${item.price}</span>
                                                </div>
                                            </Col>
                                        </div>)}                                    
                                </Col>
                            </div>
                            <div className="d-flex align-items-start mx-5 mb-3">
                                <Col sm={6}>
                                    <h5><strong>Payment</strong></h5>
                                </Col>
                                <Col sm={6}>
                                    <Last4 boldText={true} brand={order.paymentMethod?.card?.brand} last4={order.paymentMethod?.card?.last4} />                               
                                </Col>
                            </div>
                            <div className="d-flex align-items-start mx-5 mb-3">
                                <Col sm={6}></Col>
                                <Col sm={6}>
                                    <hr />
                                    <div className="d-flex">
                                        <div>Subtotal</div>
                                        <div className="ms-auto">${order.subtotal?.toFixed(2)}</div>
                                    </div>
                                    <div className="d-flex">
                                        <div>Shipping</div>
                                        <div className="ms-auto">{order.shippingOption?.cost === 0 ? "FREE" : `$${order.shippingOption?.cost.toFixed(2)}`}</div>
                                    </div>
                                    <div className="d-flex">
                                        <div>Tax</div>
                                        <div className="ms-auto">${order.tax?.toFixed(2)}</div>
                                    </div>
                                    <hr />
                                    <div className="d-flex">
                                        <div>
                                            <strong>Order Total</strong>
                                        </div>
                                        <div className="ms-auto">
                                            <strong>${order.total?.toFixed(2)}</strong>
                                        </div>
                                    </div>                           
                                </Col>
                            </div>
                        </Col>
                    </div>
                </>
            }
        </>
    );
}