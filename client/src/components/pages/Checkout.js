import React, { useState, useEffect } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  OverlayTrigger,
  Row,
  ToggleButton,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { updateShipping } from "../../actions/bagActions";
import { createOrder } from "../../actions/orderActions";
import StateSelect from "../StateSelect";
import { Fragment } from "react";
import Loader from "../Loader";
import { formValidationService } from "../../services/formValidationService";

const Checkout = () => {
  const errorsInitialState = {
    firstName: "",
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

  const paymentInitialState = {
    method: "",
    creditCardNumber: "",
    expirationDate: "",
    securityCode: "",
    nameOnCard: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  };

  const securityCodeTooltipMessage =
    "Typically a three-digit number on the back of the card. American Express cards have a four-digit number on the front of the card to the right.";

  const dispatch = useDispatch();

  const { isAuthenticated, loggedInUser, loading: authLoading } = useSelector(
    (state) => state.auth
  );

  const [bagItemsVisible, setBagItemsVisible] = useState(true);
  const [currentUser, setCurrentUser] = useState(loggedInUser || {});
  const [errors, setErrors] = useState(errorsInitialState);
  const [formValid, setFormValid] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [payment, setPayment] = useState(paymentInitialState);
  const [sameAsShippingChecked, setSameAsShippingChecked] = useState(false);
  const [shippingOption, setShippingOption] = useState(0);
  const [signInVisible, setSignInVisible] = useState(false);
  const [step, setStep] = useState(1);

  const { bagItems, subtotal, shipping, tax, total } = useSelector(
    (state) => state.bag
  );
  const submitOrder = useSelector((state) => state.submitOrder);
  const { loading: orderSubmitLoading } = submitOrder;

  const shippingOptions = [
    {
      id: "1",
      icon: "fas fa-truck fa-3x",
      name: "Standard Shipping",
      timeframe: "4-5 business days",
      cost: 0,
    },
    {
      id: "2",
      icon: "fas fa-shipping-fast fa-3x",
      name: "Express Shipping",
      timeframe: "2-4 business days",
      cost: 20,
    },
    {
      id: "3",
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
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setPayment((prevState) => ({
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

  const handleSameAsShipping = () => {
    const clearedAddress = {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    };

    setSameAsShippingChecked(!sameAsShippingChecked);

    if (sameAsShippingChecked) {
      setPayment(clearedAddress);
    } else {
      setPayment(currentUser);
    }
  };

  const validateForm = () => {
    let valid = true;

    Object.keys(currentUser).map((key) => {
      const value = currentUser[key];
      const error = formValidationService.validateField(key, value);
      setErrors((prevState) => ({
        ...prevState,
        [key]: error,
      }));
      if (error) valid = false;
      return error;
    });

    setFormValid(valid);
    return valid;
  };

  const handleGoToStep = (selectedStep) => {
    const isValid = validateForm();
    if (isValid) setStep(selectedStep);
  };

  const generateSkuCode = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleSubmitOrder = () => {
    // clear state
    // create order
    const shippingAddress = {
      address1: currentUser.address1,
      address2: currentUser.address2,
      city: currentUser.city,
      state: currentUser.state,
      zip: currentUser.zip,
    };
    const order = {
      firstName: currentUser.firstName,
      middleName: currentUser.middleName,
      lastName: currentUser.lastName,
      orderItems: bagItems,
      shippingAddress,
      taxAmount: tax,
      shippingAmount: shipping,
      totalAmount: total,
      paymentMethod: payment.method,
    };
    console.log("Creating Order:");
    console.log(order);
    dispatch(createOrder(order));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // eslint-disable-next-line
  }, [step]);

  const renderCheckout = () => {
    switch (step) {
      case 1:
        return <Fragment>{renderShippingInfoForm()}</Fragment>;
      case 2:
        return <Fragment>{renderPaymentInfoForm()}</Fragment>;
      case 3:
        return <Fragment>{renderSubmitOrder()}</Fragment>;
      default:
        return;
    }
  };

  const renderCheckoutSignIn = () => (
    <ListGroup variant="flush" className="py-1">
      <ListGroup.Item>
        <h2 className="py-3">Already have an account?</h2>
        <p key={signInVisible} onClick={() => setSignInVisible(!signInVisible)}>
          <u>Sign in</u> for quick and easy checkout&nbsp;&nbsp;
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
                disabled={authLoading}
              >
                Sign In
              </Button>
            </Form>
          </div>
        )}
      </ListGroup.Item>
    </ListGroup>
  );

  // Step 1:
  const renderShippingInfoForm = () => (
    <Fragment>
      {!isAuthenticated && renderCheckoutSignIn()}
      {renderdContactInfoForm()}
      {renderdShippingAddressForm()}
      {renderdShippingMethodForm()}
      {renderGoToStepButton(2)}
    </Fragment>
  );

  // Step 1 (Contact Info)
  const renderdContactInfoForm = () => {
    return (
      <ListGroup variant="flush" className="py-1">
        <ListGroup.Item>
          <h2 className="py-3">Contact information</h2>
          <Form>
            <Form.Group>
              <Form.Label>Email address for notifications</Form.Label>
              <Form.Control
                onBlur={validateForm}
                isInvalid={errors.email}
                type="email"
                name="email"
                placeholder={currentUser.email}
                onChange={handleProfileChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </ListGroup.Item>
      </ListGroup>
    );
  };

  // Step 1 (Shipping Address)
  const renderdShippingAddressForm = () => {
    return (
      <ListGroup variant="flush" className="py-1">
        <ListGroup.Item>
          <h2 className="py-3">Shipping address</h2>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  onBlur={validateForm}
                  isInvalid={errors.firstName}
                  name="firstName"
                  placeholder={currentUser.firstName}
                  onChange={handleProfileChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  onBlur={validateForm}
                  isInvalid={errors.lastName}
                  name="lastName"
                  placeholder={currentUser.lastName}
                  onChange={handleProfileChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  onBlur={validateForm}
                  isInvalid={errors.address1}
                  name="address1"
                  placeholder={currentUser.address1}
                  onChange={handleProfileChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address1}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} lg={4}>
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  onBlur={validateForm}
                  isInvalid={errors.address2}
                  name="address2"
                  placeholder={currentUser.address2}
                  onChange={handleProfileChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address2}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  onBlur={validateForm}
                  isInvalid={errors.city}
                  name="city"
                  placeholder={currentUser.city}
                  onChange={handleProfileChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} lg={2}>
                <Form.Label>State</Form.Label>
                <StateSelect
                  validateForm={validateForm}
                  error={errors.state}
                  selectedState={currentUser.state}
                  updateProfileState={handleProfileChange}
                />
              </Form.Group>

              <Form.Group as={Col} lg={3}>
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  onBlur={validateForm}
                  isInvalid={errors.zip}
                  name="zip"
                  placeholder={currentUser.zip}
                  onChange={handleProfileChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.zip}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
          </Form>
        </ListGroup.Item>
      </ListGroup>
    );
  };

  // Step 1 (Shipping Method)
  const renderdShippingMethodForm = () => {
    return (
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
                  <Card.Title className="mb-4">{option.timeframe}</Card.Title>
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
    );
  };

  // "Go To Step" Button
  const renderGoToStepButton = (selectedStep) => {
    return (
      <div>
        {step === 2 && (
          <Button
            variant="light"
            className="my-2"
            onClick={() => setStep(step - 1)}
          >
            Go Back
          </Button>
        )}
        <div className="my-2 float-right">
          <Button
            disabled={!formValid}
            variant="primary"
            className="my-2 float-right"
            onClick={() => handleGoToStep(selectedStep)}
          >
            Go to next step
          </Button>
          <p className="text-muted">{`Proceed to step ${selectedStep} of 3`}</p>
        </div>
      </div>
    );
  };

  // Step 2:
  const renderPaymentInfoForm = () => (
    <Fragment>
      {renderStepOneSummary()}
      {renderPaymentForm()}
      {renderGoToStepButton(3)}
    </Fragment>
  );

  // Step 2 (Step 1 Summary)
  const renderStepOneSummary = () => {
    return (
      <ListGroup variant="flush" className="py-1">
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <h4 className="py-3">Notification email:</h4>
          <strong>{currentUser.email}</strong>
          <u onClick={() => setStep(1)}>Edit</u>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <h4 className="py-3">Shipping address:</h4>
          <strong>
            <div>
              {currentUser.firstName}&nbsp;{currentUser.lastName}
            </div>
            <div>
              {currentUser.address1}
              {", "}
              {currentUser.address2}
            </div>
            <div>
              {currentUser.city}
              {", "}
              {currentUser.state} {currentUser.zip}
            </div>
          </strong>
          <u onClick={() => setStep(1)}>Edit</u>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <h4 className="py-3">Estimated delivery:</h4>
          <strong>{shippingOption}</strong>
          <u onClick={() => setStep(1)}>Edit</u>
        </ListGroup.Item>
      </ListGroup>
    );
  };

  // Step 2 (Payment)
  const renderPaymentForm = () => {
    return (
      <ListGroup variant="flush" className="py-1">
        <ListGroup.Item>
          <h4>Payment</h4>
          <Accordion defaultActiveKey="1">
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                onClick={() =>
                  setPayment((prevState) => ({
                    ...prevState,
                    method: "Credit Card",
                  }))
                }
              >
                <i className="fab fa-paypal"></i>&nbsp; PayPal
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Card.Text>
                    Sign in to PayPal and return to complete your order
                  </Card.Text>
                  <Button
                    variant="info"
                    type="submit"
                    className="btn btn-block"
                  >
                    PayPal
                  </Button>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="1"
                onClick={() =>
                  setPayment((prevState) => ({
                    ...prevState,
                    method: "Credit Card",
                  }))
                }
              >
                <i className="fas fa-credit-card"></i>&nbsp; Credit Card
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Form>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Credit card number</Form.Label>
                        <Form.Control
                          name="creditCardNumber"
                          placeholder={payment.creditCardNumber}
                          onChange={handlePaymentChange}
                        />
                        <Form.Label className="pt-2">
                          <i className="fab fa-cc-visa fa-3x pr-2"></i>
                          <i className="fab fa-cc-mastercard fa-3x pr-2"></i>
                          <i className="fab fa-cc-amex fa-3x pr-2"></i>
                          <i className="fab fa-cc-discover fa-3x pr-2"></i>
                          <i className="fab fa-cc-jcb fa-3x pr-2"></i>
                        </Form.Label>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Exiration date (MM/YY)</Form.Label>
                        <Form.Control
                          name="expirationDate"
                          placeholder={payment.expirationDate}
                          onChange={handlePaymentChange}
                        />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label title={securityCodeTooltipMessage}>
                          Security code&nbsp;&nbsp;
                          <i className="fas fa-info-circle"></i>
                        </Form.Label>
                        <Form.Control
                          name="securityCode"
                          placeholder={payment.securityCode}
                          onChange={handlePaymentChange}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Name on card</Form.Label>
                        <Form.Control
                          name="nameOnCard"
                          placeholder={payment.nameOnCard}
                          onChange={handlePaymentChange}
                        />
                      </Form.Group>
                    </Form.Row>
                    <h4 className="pt-3">Billing address</h4>
                    <Form.Check
                      type="checkbox"
                      label="Same as shipping"
                      className="pb-3"
                      checked={sameAsShippingChecked}
                      onChange={() => handleSameAsShipping()}
                    />
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          name="firstName"
                          placeholder={payment.firstName}
                          onChange={handlePaymentChange}
                        />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          name="lastName"
                          placeholder={payment.lastName}
                          onChange={handlePaymentChange}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          name="address1"
                          placeholder={payment.address1}
                          onChange={handlePaymentChange}
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={4}>
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control
                          name="address2"
                          placeholder={payment.address2}
                          onChange={handlePaymentChange}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          name="city"
                          placeholder={payment.city}
                          onChange={handlePaymentChange}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={2}>
                        <Form.Label>State</Form.Label>
                        <StateSelect
                          selectedState={payment.state}
                          updateProfileState={handlePaymentChange}
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                          name="zip"
                          placeholder={payment.zip}
                          onChange={handlePaymentChange}
                        />
                      </Form.Group>
                    </Form.Row>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </ListGroup.Item>
      </ListGroup>
    );
  };

  // Step 3:
  const renderSubmitOrder = () => {
    return (
      <Fragment>
        {renderStepOneSummary()}
        {renderStepTwoSummary()}
        <Button
          variant="light"
          className="my-2"
          onClick={() => setStep(step - 1)}
        >
          Go Back
        </Button>
        <Button
          variant="primary"
          className="my-2 float-right"
          onClick={() => handleSubmitOrder()}
        >
          Submit Order
        </Button>
      </Fragment>
    );
  };

  // Step 3 (Step 2 Summary)
  const renderStepTwoSummary = () => {
    return (
      <ListGroup variant="flush" className="py-1">
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <h4 className="py-3">Payment:</h4>
          <strong>{currentUser.email}</strong>
          <u onClick={() => setStep(2)}>Edit</u>
        </ListGroup.Item>
      </ListGroup>
    );
  };

  const renderOrderSummary = () => {
    return (
      <Fragment>
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
      </Fragment>
    );
  };

  return (
    <Container className="d-flex flex-column py-5">
      {authLoading || orderSubmitLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <Row className="py-1 mx-auto text-center">
            <h1>Checkout</h1>
          </Row>
          <Row className="py-3">
            <Col md={7}>{renderCheckout()}</Col>
            <Col md={5}>
              <div className="sticky-top">{renderOrderSummary()}</div>
            </Col>
          </Row>
        </Fragment>
      )}
    </Container>
  );
};

export default Checkout;
