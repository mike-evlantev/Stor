import React from "react";
import { Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Checkout = () => {
  const bag = useSelector((state) => state.bag);
  const { bagItems, subtotal, shipping, tax, total } = bag;

  const generateSkuCode = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <Container className="d-flex py-5">
      <Row className="py-1 mx-auto text-center">
        <Col>
          <h1>Checkout</h1>
        </Col>
      </Row>
      <Row className="py-3">
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Card className="border-0">Login</Card>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <h2 className="py-1">Order Summary</h2>
          <ListGroup variant="flush">
            {bagItems &&
              bagItems.length > 0 &&
              bagItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Card className="border-0">
                    <Row>
                      <Col md={4}>
                        <Image src={item.image} alt={item.name} fluid />
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <Card.Title>
                            <strong>{item.name}</strong>
                          </Card.Title>
                          <Card.Text className="text-muted">
                            SKU# {generateSkuCode(1000000000, 9999999999)}
                          </Card.Text>
                          <Container>
                            <Row>
                              <Col lg={4}>
                                <div>Item Price:</div>
                                <div>${item.price}</div>
                              </Col>
                              <Col lg={4}>Qty:{item.qty}</Col>
                              <Col lg={4} className="d-flex">
                                Was a button
                              </Col>
                            </Row>
                          </Container>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
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
