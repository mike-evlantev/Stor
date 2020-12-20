import React, { useState } from "react";
import { Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Checkout = () => {
  const [bagItemsVisible, setBagItemsVisible] = useState(true);
  const bag = useSelector((state) => state.bag);
  const { bagItems, subtotal, shipping, tax, total } = bag;

  const generateSkuCode = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <Container className="d-flex flex-column py-5">
      <Row className="py-1 mx-auto text-center">
        <h1>Checkout</h1>
      </Row>
      <Row className="py-3">
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Card className="border-0">Login</Card>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={5}>
          <h2 className="py-1 px-3">Order Summary</h2>
          {/* key is necessary on parent element to be able to re-render child element: 
              in this case, the chevron (up/down) icon next to item qty
              https://reactjs.org/docs/reconciliation.html */}
          <div
            className="py-2 px-3"
            key={bagItemsVisible}
            onClick={() => setBagItemsVisible(!bagItemsVisible)}
          >
            <i className="fas fa-shopping-bag fa-lg"></i>&nbsp;&nbsp;
            {bagItems.length} {bagItems.length > 1 ? "items" : "item"}
            &nbsp;&nbsp;
            <i
              className={
                bagItemsVisible
                  ? "fas fa-chevron-up fa-lg"
                  : "fas fa-chevron-down fa-lg"
              }
            ></i>
            <strong className="float-right pr-1">${total.toFixed(2)}</strong>
          </div>
          <ListGroup variant="flush">
            {bagItemsVisible &&
              bagItems &&
              bagItems.length > 0 &&
              bagItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} fluid />
                    </Col>
                    <Col md={9} className="d-flex flex-column p-0">
                      <strong>{item.name}</strong>
                      <span className="text-muted">
                        SKU# {generateSkuCode(1000000000, 9999999999)}
                      </span>
                      <div>
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
              <div className="ml-auto">${shipping.toFixed(2)}</div>
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
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
