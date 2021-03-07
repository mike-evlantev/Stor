import React, { useState } from "react";
import { Fragment } from "react";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const OrderItems = ({ items, subtotal, shipping, tax, total }) => {
  const [itemsVisible, setItemsVisible] = useState(true);

  return (
    <Fragment>
      <h2 className="py-1 px-3">Order Items</h2>
      {/* key is necessary on parent element to be able to re-render child element: 
        in this case, the chevron (up/down) icon next to item qty
        https://reactjs.org/docs/reconciliation.html */}
      <div
        className="py-2 px-3"
        key={itemsVisible}
        onClick={() => setItemsVisible(!itemsVisible)}
      >
        <i className="fas fa-shopping-bag fa-lg"></i>&nbsp;&nbsp;
        {items.length} {items.length > 1 ? "items" : "item"}
        &nbsp;&nbsp;
        <i
          className={
            itemsVisible
              ? "fas fa-chevron-up fa-lg"
              : "fas fa-chevron-down fa-lg"
          }
        ></i>
        <strong className="float-right pr-1">${total.toFixed(2)}</strong>
      </div>
      <ListGroup variant="flush">
        {itemsVisible &&
          items &&
          items.length > 0 &&
          items.map((item) => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={3}>
                  <Image src={item.image} alt={item.name} fluid />
                </Col>
                <Col md={9} className="d-flex flex-column p-0">
                  <strong>{item.name}</strong>
                  <div className="mt-auto">
                    <span>Qty:{item.qty}</span>
                    <span className="float-right pr-3">${item.price}</span>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        <ListGroup.Item className="d-flex">
          <div>Subtotal</div>
          <div className="ml-auto">${subtotal.toFixed(2)}</div>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex">
          <div>Shipping</div>
          <div className="ml-auto">${shipping.cost.toFixed(2)}</div>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex">
          <div>Tax</div>
          <div className="ml-auto">${tax.toFixed(2)}</div>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex">
          <div>
            <strong>Order Total</strong>
          </div>
          <div className="ml-auto">
            <strong>${total.toFixed(2)}</strong>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Fragment>
  );
};

export default OrderItems;
