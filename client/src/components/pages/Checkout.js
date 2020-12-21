import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { updateShipping } from "../../actions/bagActions";
import StateSelect from "../StateSelect";

const Checkout = () => {
  const guestProfileInitialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    password: "",
  };
  const [bagItemsVisible, setBagItemsVisible] = useState(true);
  const [guestProfile, setGuestProfile] = useState(guestProfileInitialState);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [shippingOption, setShippingOption] = useState(0);
  const [signInVisible, setSignInVisible] = useState(false);

  const authState = useSelector((state) => state.auth);
  const { isAuthenticated, loginError, loginLoading } = authState;
  const bag = useSelector((state) => state.bag);
  const { bagItems, subtotal, shipping, tax, total } = bag;

  const shippingOptions = [
    {
      icon: "fas fa-truck fa-3x",
      name: "Standard Shipping",
      timeframe: "4-5 business days",
      cost: 0,
    },
    {
      icon: "fas fa-shipping-fast fa-3x",
      name: "Express Shipping",
      timeframe: "2-4 business days",
      cost: 20,
    },
    {
      icon: "fas fa-plane fa-3x",
      name: "Priority Shipping",
      timeframe: "2-3 business days",
      cost: 30,
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault(); // prevent refresh
    dispatch(login(loginEmail, loginPassword));
  };

  const handleProfileChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setGuestProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShippingOptionChange = (e) => {
    e.preventDefault();
    const selectedOption = parseInt(e.currentTarget.value);
    setShippingOption(selectedOption);
    dispatch(updateShipping(selectedOption));
  };

  const dispatch = useDispatch();

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
          <ListGroup variant="flush" className="py-1">
            <ListGroup.Item>
              <h2 className="py-3">Already have an account?</h2>
              <p
                key={signInVisible}
                onClick={() => setSignInVisible(!signInVisible)}
              >
                <u>Sign in</u> to quickly checkout &nbsp;&nbsp;
                <i
                  className={
                    signInVisible
                      ? "fas fa-chevron-up fa-lg"
                      : "fas fa-chevron-down fa-lg"
                  }
                ></i>
              </p>
              {signInVisible && (
                <div>
                  <hr />
                  <Form onSubmit={handleLogin}>
                    <Form.Group>
                      <Form.Row>
                        <Col>
                          <Form.Control
                            type="email"
                            placeholder="Email Address"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                        </Col>
                      </Form.Row>
                    </Form.Group>

                    <Button
                      variant="dark"
                      type="submit"
                      className="btn btn-block"
                      disabled={loginLoading}
                    >
                      Sign In
                    </Button>
                  </Form>
                </div>
              )}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush" className="py-1">
            <ListGroup.Item>
              <h2 className="py-3">Contact information</h2>
              <Form>
                <Form.Group>
                  <Form.Label>Email address for notifications </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={guestProfile.email}
                    onChange={handleProfileChange}
                  />
                </Form.Group>
              </Form>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush" className="py-1">
            <ListGroup.Item>
              <h2 className="py-3">Shipping address</h2>
              <Form>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="firstName"
                      placeholder={guestProfile.firstName}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastName"
                      placeholder={guestProfile.lastName}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      name="address1"
                      placeholder={guestProfile.address1}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} lg={4}>
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                      name="address2"
                      placeholder={guestProfile.address2}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      name="city"
                      placeholder={guestProfile.city}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} lg={2}>
                    <Form.Label>State</Form.Label>
                    <StateSelect updateProfileState={handleProfileChange} />
                  </Form.Group>

                  <Form.Group as={Col} lg={3}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      name="zip"
                      placeholder={guestProfile.zip}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>
                </Form.Row>
              </Form>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush" className="py-1">
            <ListGroup.Item>
              <h2 className="py-3">Shipping options</h2>
              <ButtonGroup toggle>
                {shippingOptions.map((option, idx) => (
                  <Card
                    as={ToggleButton}
                    key={idx}
                    type="radio"
                    variant="outline-dark"
                    name="shipping"
                    value={option.cost}
                    checked={shippingOption === option.cost}
                    onChange={(e) => handleShippingOptionChange(e)}
                  >
                    <Card.Body>
                      <Card.Title className="mb-4">
                        {option.timeframe}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        <i className={option.icon}></i>
                      </Card.Subtitle>
                      <Card.Text>{option.name}</Card.Text>
                      <Card.Title>
                        <strong>
                          {option.cost === 0 ? "FREE" : `$${option.cost}`}
                        </strong>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                ))}
              </ButtonGroup>
            </ListGroup.Item>
          </ListGroup>
          <div className="my-2 float-right">
            <Button
              type="submit"
              variant="primary"
              className="my-2 float-right"
            >
              Go to next step
            </Button>
            <p className="text-muted">Proceed to step 2 of 3</p>
          </div>
        </Col>
        <Col md={5}>
          <div className="sticky-top">
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
                          <span className="float-right pr-3">
                            ${item.price}
                          </span>
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
