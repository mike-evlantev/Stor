import * as React from "react";
import { Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getOrders } from "../../../features/admin/adminSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IAddress } from "../../../types/IAddress";
import { IName } from "../../../types/IName";
import { IOrder } from "../../../types/IOrder";
import { Address } from "../../shared/Address";
import { Last4 } from "../../shared/Last4";
import { Loader } from "../../shared/Loader";

interface Params {
    id: string;
}

export const OrderDetails: React.FC = () => {
    const { id } = useParams<Params>();
    const dispatch = useAppDispatch();
    const { loading, orders } = useAppSelector(state => state.admin);
    const [ order, setOrder ] = React.useState<IOrder | undefined>();
    
    React.useEffect(() => {
        dispatch(getOrders());
    }, []);

    React.useEffect(() => {
        setOrder(orders.find(o => o.id === id));
    }, [orders]);
    
    return(<>
        {loading
            ? <Loader />
            : order && <OrderDetailsInternal order={order} />}
    </>);
};

const OrderDetailsInternal = ({order}: {order: IOrder}) => {
    const { orderNumber, first, last, shippingAddress, shippingOption, orderItems, paymentMethod, subtotal, tax, total } = order;
    const labelWidth = 3;
    const contentWidth = 9;
    return(
        <div className="d-flex flex-column">
            <h5 className="mb-3">Order # {orderNumber}</h5>
            <div className="d-flex align-items-start">
                <Col sm={labelWidth}>
                    Name
                </Col>
                <Col sm={contentWidth}>
                    <div className="d-flex align-items-center">
                        <div>{first} {last}</div>
                    </div>
                </Col>
            </div>
            <div className="d-flex align-items-start">
                <Col sm={labelWidth}>
                    Shipping
                </Col>
                <Col sm={contentWidth}>
                    <Address name={undefined} address={shippingAddress as IAddress} />
                </Col>
            </div>
            <div className="d-flex align-items-start">
                <Col sm={labelWidth}>
                    Shipping Option
                </Col>
                <Col sm={contentWidth}>
                    <div className="d-flex align-items-center">
                        <i className={shippingOption?.icon}></i>
                        <div className="mx-2">{shippingOption?.timeframe}</div>
                    </div>
                </Col>
            </div>
            <div className="d-flex align-items-start">
                <Col sm={labelWidth}>Items</Col>
                <Col sm={contentWidth}>
                    {orderItems?.map(item =>
                        <div className="d-flex" key={item.id}>
                            <Col md={3}>
                                <Image src={item.image} alt={item.name} fluid />
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
            <div className="d-flex align-items-start">
                <Col sm={labelWidth}>
                    Payment
                </Col>
                <Col sm={contentWidth}>
                    <Last4 brand={paymentMethod?.card?.brand} last4={paymentMethod?.card?.last4} />                               
                </Col>
            </div>
            {/* <div className="d-flex align-items-start">
                <Col sm={labelWidth}>
                    Billing
                </Col>
                <Col sm={contentWidth}>
                    <Address name={{} as IName} address={billingAddress as IAddress} />
                </Col>
            </div> */}
            <div className="d-flex align-items-start">
                <Col sm={labelWidth}>Totals</Col>
                <Col sm={contentWidth}>
                    <hr />
                    <div className="d-flex">
                        <div>Subtotal</div>
                        <div className="ms-auto">${subtotal?.toFixed(2)}</div>
                    </div>
                    <div className="d-flex">
                        <div>Shipping</div>
                        <div className="ms-auto">{shippingOption?.cost === 0 ? "FREE" : `$${shippingOption?.cost.toFixed(2)}`}</div>
                    </div>
                    <div className="d-flex">
                        <div>Tax</div>
                        <div className="ms-auto">${tax?.toFixed(2)}</div>
                    </div>
                    <hr />
                    <div className="d-flex">
                        <div>
                            <strong>Order Total</strong>
                        </div>
                        <div className="ms-auto">
                            <strong>${total?.toFixed(2)}</strong>
                        </div>
                    </div>                           
                </Col>
            </div>
        </div>
    );
}