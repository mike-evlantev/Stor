import * as React from "react";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { IBagItem } from "../../../types/IBagItem";
import { IShippingOption } from "../../../types/IShippingOption";
import { getDisplayImageUrl } from "../../../utils/imageUtils";

interface Props {
    items: IBagItem[];
    subtotal: number;
    shipping: IShippingOption;
    tax: number;
    total: number;
}

export const OrderItems: React.FC<Props> = ({items, subtotal, shipping, tax, total}) => {
    const [itemsVisible, setItemsVisible] = React.useState(true);
    const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <h2 className="py-1 px-3">Order Items</h2>
            {/* key is necessary on parent element to be able to re-render child element: 
                in this case, the chevron (up/down) icon next to item qty
                https://reactjs.org/docs/reconciliation.html */}
            <div className="py-2 px-3" key={itemsVisible.toString()} onClick={() => setItemsVisible(!itemsVisible)}>
                <i className="fas fa-shopping-bag fa-lg"></i>&nbsp;&nbsp;
                {totalQty} {totalQty > 1 ? "items" : "item"}
                &nbsp;&nbsp;
                <i className={itemsVisible ? "fas fa-chevron-up fa-lg" : "fas fa-chevron-down fa-lg"} style={{cursor: "pointer"}}></i>
                <strong className="float-end pr-1">${total.toFixed(2)}</strong>
            </div>
            <ListGroup variant="flush">
                {itemsVisible && items?.length > 0 && items.map((item) => (
                    <ListGroup.Item key={item.id}>
                        <Row>
                            <Col md={3}>
                                <Image src={getDisplayImageUrl(item.images) ?? "/images/image-placeholder.png"} alt={item.name} onError={e => { e.currentTarget.src = "/images/image-placeholder.png"; }} fluid />
                            </Col>
                            <Col md={9} className="d-flex flex-column p-0">
                                <strong>{item.name}</strong>
                                <div className="d-flex mt-auto">
                                    <span>Qty: {item.quantity}</span>
                                    <span style={{paddingRight: "0.75rem"}} className="ms-auto">${item.price}</span>
                                </div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex">
                    <div>Subtotal</div>
                    <div className="ms-auto">${subtotal.toFixed(2)}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                    <div>Shipping</div>
                    <div className="ms-auto">${shipping.cost.toFixed(2)}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                    <div>Tax</div>
                    <div className="ms-auto">${tax.toFixed(2)}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                    <div>
                        <strong>Order Total</strong>
                    </div>
                    <div className="ms-auto">
                        <strong>${total.toFixed(2)}</strong>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </>
    );
}