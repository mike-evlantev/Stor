import React, { useState, useEffect } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { updateShipping, clearBag } from "../../actions/bagActions";
import { processPayment } from "../../actions/paymentActions";
import { submitOrder } from "../../actions/orderActions";
import StateSelect from "../StateSelect";
import { Fragment } from "react";
import Loader from "../Loader";
import { formValidationService } from "../../services/formValidationService";
import EmptyBag from "../EmptyBag";
import { useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import OrderItems from "./OrderItems";

const Checkout = () => {
  const CREDIT_CARD = "credit card";
  const PAYPAL = "paypal";

  const placeholderUser = {
    firstName: "John",
    lastName: "Doe",
    address1: "123 Columbia St",
    address2: "APT 1A",
    city: "Carson City",
    state: "NV",
    zip: "89154",
    email: "mikeev21@gmail.com",
  };
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

  // eslint-disable-next-line
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

  const placeholderPayment = {
    network: "Visa",
    creditCardNumber: "4242424242424242",
    expirationDate: "08/21",
    securityCode: "424",
    nameOnCard: "John Doe",
    address1: "123 Columbia St",
    address2: "APT 1A",
    city: "Carson City",
    state: "NV",
    zip: "89154",
  };

  const securityCodeTooltipMessage =
    "Typically a three-digit number on the back of the card. American Express cards have a four-digit number on the front of the card to the right.";

  const dispatch = useDispatch();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  // console.log(stripe);
  // console.log(elements);

  const {
    isAuthenticated,
    loggedInUser,
    loading: authLoading,
  } = useSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState(
    loggedInUser || placeholderUser
  );
  const [errors, setErrors] = useState(errorsInitialState);
  const [formValid, setFormValid] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [payment, setPayment] = useState(placeholderPayment); // replace with paymentInitialState
  const [paymentMethodType, setPaymentMethodType] = useState(CREDIT_CARD); // replace with paymentInitialState
  const [paymentResult, setPaymentResult] = useState({ status: "" });

  const [sameAsShippingChecked, setSameAsShippingChecked] = useState(false);
  const [shippingOptionId, setShippingOptionId] = useState(1);
  const [signInVisible, setSignInVisible] = useState(false);
  const [step, setStep] = useState(1);

  const { bagItems, shipping, subtotal, tax, total } = useSelector(
    (state) => state.bag
  );
  const shippingOptions = useSelector((state) => state.shippingOptions);
  const { loading: orderSubmitLoading } = useSelector((state) => state.order);

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
    const selectedId = parseInt(e.currentTarget.value);
    const selectedShippingOption = shippingOptions.find(
      (o) => o.id === selectedId
    );
    setShippingOptionId(selectedId);
    dispatch(updateShipping(selectedShippingOption));
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

  const processPaymentAsync = async () => {
    let result = {};
    switch (paymentMethodType) {
      case CREDIT_CARD:
        // // Process Credit Card Payment
        // console.log("Processing Credit Card Payment");

        // // Get a reference to a mounted CardElement. Elements knows how
        // // to find your CardElement because there can only ever be one of
        // // each type of element.
        // const cardElement = elements.getElement(CardElement);
        // console.log(elements);
        // console.log(cardElement);
        // const token = await stripe.createToken(cardElement);
        // console.log(token);
        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //   type: "card",
        //   card: elements.getElement(CardElement),
        // });
        // if (error) {
        //   console.error(error);
        // }

        // console.log(paymentMethod);

        // result.network = payment.network;
        // result.last4 = payment.creditCardNumber.slice(
        //   payment.creditCardNumber.length - 4
        // );
        // result.status = "success";
        console.log(paymentMethodType);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });

        console.log(paymentMethod);

        if (!error) {
          try {
            console.log(paymentMethod);
            const {id} = paymentMethod;
            const responseRaw = dispatch(processPayment({amount: 1099, id}));
            const response = Promise.resolve(responseRaw).then(res => console.log(res));
            console.log(response);
          } catch (error) {
            console.log("Error:", error);
          }
        } else {
          console.log(error.message);
        }

        break;
      case PAYPAL:
        // Process Paypal Payment
        console.log("Processing Paypal Payment");
        result.id = "";
        result.status = "";
        result.update_time = "";
        result.email_address = "";
        break;
      default:
        break;
    }
    
    setPaymentResult(result);
  };

  const processOrder = () => {
    const shippingAddress = {
      address1: currentUser.address1,
      address2: currentUser.address2,
      city: currentUser.city,
      state: currentUser.state,
      zip: currentUser.zip,
    };

    const { id, icon, ...shippingOption } = shippingOptions.find(
      (o) => o.id === shippingOptionId
    );

    const order = {
      firstName: currentUser.firstName,
      middleName: currentUser.middleName,
      lastName: currentUser.lastName,
      orderItems: bagItems,
      taxAmount: tax,
      totalAmount: total,
      paymentMethod: paymentMethodType,
      ...(paymentMethodType === CREDIT_CARD && {
        creditCardPaymentResult: paymentResult,
      }),
      ...(paymentMethodType === PAYPAL && {
        payPalPaymentResult: paymentResult,
      }),
      isPaid: true,
      shippingAddress,
      shippingOption,
    };

    console.log(order);
    // submit order
    dispatch(submitOrder(history, order));
    // clean up
    //cleanUpOnSubmit();
  };

  const cleanUpOnSubmit = () => {
    // clear bag redux state
    //dispatch(clearBag());

    // reset shipping option
    setShippingOptionId(1);

    // clear current user
    setCurrentUser({});

    // clear payment
    setPayment({});
  };

  const handleSubmitOrder = async () => {
    // if (!stripe || !elements) {
    //   // Stripe.js has not loaded yet. Make sure to disable
    //   // form submission until Stripe.js has loaded.

    //   return;
    // }
    // process payment
    const paymentResult = await processPaymentAsync();
    console.log(paymentResult);
    // submit order
    processOrder();
    //if (paymentResult.status === "success") processOrder();
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // eslint-disable-next-line
  }, [step]);

  const renderCheckout = () => {
    switch (step) {
      case 1:
        return <>{renderShippingInfoForm()}</>;
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
                value={option.id}
                checked={option.id === shippingOptionId}
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
      {renderSubmitOrder()}
      {/*renderGoToStepButton(3)*/}
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
          <strong>
            {shippingOptions.find((o) => o.id === shippingOptionId).name}
          </strong>
          <u onClick={() => setStep(1)}>Edit</u>
        </ListGroup.Item>
      </ListGroup>
    );
  };

  // Step 2 (Payment)
  const renderPaymentForm = () => {
    const iframeStyles = {
      base: {
        color: "#444",
        fontWeight: 500,
        fontSize: "13px",
        iconColor: "#444",
        "::placeholder": {
          color: "#bbb",
        },
      },
      invalid: {
        iconColor: "#9b479f",
        color: "#9b479f",
      },
      complete: {
        iconColor: "#469408",
      },
    };

    const cardElementOpts = {
      iconStyle: "solid",
      style: iframeStyles,
    };

    //const cardElmnt = elements.getElement(CardElement);
    //console.log(cardElmnt);
    //setCardElement(cardElmnt);

    return (
      <ListGroup variant="flush" className="py-1">
        <ListGroup.Item>
          <h4>Payment</h4>
          <Accordion defaultActiveKey="2">
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                onClick={() => setPaymentMethodType(PAYPAL)}
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
                onClick={() => setPaymentMethodType(CREDIT_CARD)}
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
                          {/*<i className="fab fa-cc-jcb fa-3x pr-2"></i>*/}
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
                    {/*<Form.Row>
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
                    </Form.Row>*/}
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
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="2"
                onClick={() => setPaymentMethodType(CREDIT_CARD)}
              >
                <i className="fas fa-credit-card"></i>&nbsp; Stripe
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <Form onSubmit={handleSubmitOrder}>
                    <Form.Row className="flex-column">
                      <CardElement options={cardElementOpts} />
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
    // console.log(elements);
    // const cardElement = elements.getElement(CardElement);
    // console.log(cardElement);
    return (
      <Fragment>
        {/*renderStepOneSummary()*/}
        {/*renderStepTwoSummary()*/}
        {/*<Button
          variant="light"
          className="my-2"
          onClick={() => setStep(step - 1)}
        >
          Go Back
        </Button>*/}
        <Button
          variant="primary"
          className="my-2 float-right"
          onClick={() => handleSubmitOrder()}
          disabled={
            orderSubmitLoading || !stripe || !bagItems || bagItems.length === 0
          }
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
          <strong>
            {payment.type} ending in{" "}
            {payment.creditCardNumber.slice(
              payment.creditCardNumber.length - 4
            )}
          </strong>
          <u onClick={() => setStep(2)}>Edit</u>
        </ListGroup.Item>
      </ListGroup>
    );
  };

  return renderCheckout();

  // return (
  //   <Container className="d-flex flex-column py-5">
  //     {bagItems.length === 0 ? (
  //       <EmptyBag />
  //     ) : authLoading || orderSubmitLoading ? (
  //       <Loader />
  //     ) : (
  //       <Fragment>
  //         <Row className="py-1 px-3">
  //           <h1>Checkout</h1>
  //         </Row>
  //         <Row className="py-3">
  //           <Col md={7}>{renderCheckout()}</Col>
  //           <Col md={5}>
  //             <div className="sticky-top">
  //               <OrderItems
  //                 items={bagItems}
  //                 shipping={shipping}
  //                 subtotal={subtotal}
  //                 tax={tax}
  //                 total={total}
  //               />
  //             </div>
  //           </Col>
  //         </Row>
  //       </Fragment>
  //     )}
  //   </Container>
  // );
};

export default Checkout;
