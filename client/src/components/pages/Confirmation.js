import React, { Fragment } from "react";
import { Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loader from "../Loader";

const Confirmation = () => {
  const history = useHistory();
  const { success, loading, error, ...order } = useSelector(
    (state) => state.order
  );

  if (!success || !order) {
    history.push("/");
    return null;
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Row className="py-5">
            <h1>Order Confirmation</h1>
          </Row>
          <Row>
            <Col md={6}>
              <strong>Order Number</strong> {order._id}
              <strong>Order Date</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString(undefined, options)}
              <strong>Shipping</strong> {order.shippingOption.name}
              <strong>Delivery</strong> {order.shippingOption.timeframe}
            </Col>
            <Col md={6}>
              <strong>Shipping Address</strong>
              {order.shippingAddress.address1}
              {order.shippingAddress.address2}
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.zip}
            </Col>
          </Row>
          <Row>
            <ListGroup variant="flush">
              {order.orderItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Card className="border-0">
                    <Row>
                      <Col md={4}>
                        <Image src={item.image} alt={item.name} fluid />
                      </Col>
                      <Col md={8}>
                        <Card.Title>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Card.Title>
                        <Row className="mt-5">
                          <Col lg={4}>
                            <div>Item Price:</div>
                            <div>${item.price}</div>
                          </Col>
                          <Col lg={4}>
                            <div>Item Qty:</div>
                            <div>{item.qty}</div>
                          </Col>
                          <Col lg={4} className="d-flex"></Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Row>
        </Fragment>
      )}
    </Container>
  );
};

export default Confirmation;
