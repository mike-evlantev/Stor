import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import QtySelect from "../QtySelect.js";
import { addToBag, removeFromBag } from "../../actions/bagActions.js";

const Bag = ({ history }) => {
  const bag = useSelector((state) => state.bag);
  const { bagItems, subtotal, shipping, tax, total } = bag;

  const dispatch = useDispatch();

  const handleShopNow = () => {
    history.push("/");
  };

  const handleQtyChange = (productId, e) => {
    dispatch(addToBag(productId, Number(e.target.value)));
  };

  const handleRemoveItemFromBag = (product) => {
    dispatch(removeFromBag(product));
  };

  const handleCheckout = () => {
    history.push("/checkout");
  };

  const generateSkuCode = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <Container className="d-flex py-5">
      {bagItems.length === 0 ? (
        <div className="mx-auto text-center">
          <Row className="py-5">
            <h1>You haven't added anything to your bag yet!</h1>
          </Row>
          <Button type="button" variant="primary" onClick={handleShopNow}>
            <i className="fas fa-burn text-inverse"></i>
            &nbsp;&nbsp; SHOP NOW
          </Button>
        </div>
      ) : (
        <Row className="py-3">
          <Col md={8}>
            <h1>My Bag ({bagItems.length})</h1>
            <hr />
            <ListGroup variant="flush">
              {bagItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Card className="border-0">
                    <Row>
                      <Col md={4}>
                        <Image src={item.image} alt={item.name} fluid />
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <Card.Title>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
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
                              <Col lg={4}>
                                Qty:{" "}
                                <QtySelect
                                  product={item}
                                  qty={item.qty}
                                  onChange={handleQtyChange}
                                />
                              </Col>
                              <Col lg={4} className="d-flex">
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="my-auto"
                                  onClick={() => handleRemoveItemFromBag(item)}
                                >
                                  Remove
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <h2 className="py-1">Order Summary</h2>
            <hr />
            <ListGroup variant="flush">
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
                  <strong>Estimated Total</strong>
                </div>
                <div className="ml-auto">
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </ListGroup.Item>
            </ListGroup>
            <Button
              type="button"
              className="btn-block mt-4"
              disabled={bagItems.length === 0}
              onClick={handleCheckout}
            >
              <i className="fas fa-burn"></i>&nbsp;&nbsp;Checkout
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Bag;
