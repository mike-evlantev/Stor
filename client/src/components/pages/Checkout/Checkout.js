import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, Button, ButtonGroup, Card, Col, Form, ToggleButton, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, updateCustomerError } from "../../../actions/userActions";
import { updateShipping, clearBag } from "../../../actions/bagActions";
import { submitOrder } from "../../../actions/orderActions";
import Loader from "../../Loader";
import { validateField } from "../../../services/formValidator";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import { CreditCardForm } from "./CreditCardForm.tsx";
import { SubmitOrderButton } from "./SubmitOrderButton.tsx";
import { ShippingInfoForm } from "./ShippingInfoForm.tsx";
import { AddressForm } from "../../shared/AddressForm.tsx";

const Checkout = () => {
  const CREDIT_CARD = "credit card";
  const PAYPAL = "paypal";

  const placeholderUser = {
    first: "John",
    last: "Doe",
    address1: "123 Columbia St",
    address2: "APT 1A",
    city: "Carson City",
    state: "NV",
    zip: "89154",
    email: "mikeev21@gmail.com",
  };
  const errorsInitialState = {
    first: "",
    last: "",
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

  // const securityCodeTooltipMessage =
  //   "Typically a three-digit number on the back of the card. American Express cards have a four-digit number on the front of the card to the right.";

  const dispatch = useDispatch();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const { isAuthenticated, loggedInUser } = useSelector((state) => state.auth);
  const shippingOptions = useSelector((state) => state.shippingOptions);
  const [currentUser, setCurrentUser] = useState(loggedInUser || placeholderUser);
  const [errors, setErrors] = useState(errorsInitialState);
  const [formValid, setFormValid] = useState(true);

  const [payment, setPayment] = useState(placeholderPayment); // replace with paymentInitialState
  const [paymentMethodType, setPaymentMethodType] = useState(CREDIT_CARD); // replace with paymentInitialState
  const [paymentResult, setPaymentResult] = useState({ status: "" });
  const [sameAsShippingChecked, setSameAsShippingChecked] = useState(true);
  const [billingAddress, setBillingAddress] = useState({address1: "", address2: "", city: "", state: "", zip: ""});
  //
  const [shippingOptionId, setShippingOptionId] = useState(1);
  
  const [step, setStep] = useState(1);
  //const [ccFormValidation, setCcFormValidation] = useState({carNumberValid: false, cardExpiryValid: false, cardCvvValid: false});
  const [nameOnCard, setNameOnCard] = useState("");

  const { bagItems, shipping, subtotal, tax, total } = useSelector(
    (state) => state.bag
  );
  
  const { loading: orderSubmitLoading } = useSelector((state) => state.order);
  const customer = useSelector((state) => state.customer);

  const handleStepChange = (step) => {
    setStep(step);
  }

  const handlePaymentChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(e.target);

    setPayment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSameAsShipping = () => {
    setSameAsShippingChecked(!sameAsShippingChecked);
  };

  const onBillingAddressChange = (obj) => {
    console.log("onBillingAddressChange()", obj);

    setBillingAddress((prevState) => ({
      ...prevState,
      ...obj,
    }));
  };

  

  const validateForm = () => {
    let valid = true;

    Object.keys(currentUser).map((key) => {
      const value = currentUser[key];
      const error = validateField(key, value);
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

  const processCardPayment = async (payload) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.post("/api/payment", payload, config);
    return data;
  };

  const processPaymentAsync = async () => {
    let result = {};
    const { address1, city, state, zip, phone, email } =
      currentUser;
    const billingDetails = {
      name: nameOnCard,
      email,
      phone,
      address: {
        city,
        line1: address1,
        state,
        postal_code: zip,
      },
    };

    switch (paymentMethodType) {
      case CREDIT_CARD:
        // 1. create payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement("cardNumber"),
          billing_details: billingDetails,
        });

        if (!error) {
          try {
            // 2. create payment intent (must be executed server-side)
            const { data: client_secret } = await processCardPayment({ amount: total });

            // 3. confirm payment intent (must be executed client-side)
            const { id, status } = await stripe.confirmCardPayment(client_secret, { payment_method: paymentMethod.id });
            result.id = id;
            result.status = status;
            
          } catch (error) {
            console.error("Error:", error);
          }
        } else {
          console.error("Create Payment Method Failed: ", error.message);
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
      first: currentUser.first,
      middle: currentUser.middle,
      last: currentUser.last,
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

  const onNameOnCardChange = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    setNameOnCard(e.currentTarget.value);
  }

  const handleSubmitOrder = async () => {
    const paymentResult = await processPaymentAsync();
    console.log(paymentResult);
    processOrder();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const renderCheckout = () => {
    switch (step) {
      case 1:
        return <ShippingInfoForm handleStepChange={handleStepChange} />;
      case 2:
        return <PaymentInfoForm />;
      default:
        return;
    }
  };

  // Step 2:
  const PaymentInfoForm = () => {
    return (
      <>
        <StepOneSummary />
        <PaymentForm />
        <SubmitOrderButton orderSubmitLoading={orderSubmitLoading} bagItems={bagItems} handleSubmitOrder={handleSubmitOrder} />
      </>
    );
  };

  // Step 2 (Step 1 Summary)
  const StepOneSummary = () => {
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
              {currentUser.first}&nbsp;{currentUser.last}
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
  const PaymentForm = () => {   

    return (
      <ListGroup variant="flush" className="py-1">
        <ListGroup.Item>
          <h4>Payment</h4>
          <Accordion defaultActiveKey="1">
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
                  <Form.Check
                    type="checkbox"
                    label="Same as shipping"
                    className="pb-3"
                    checked={sameAsShippingChecked}
                    onChange={() => handleSameAsShipping()} />
                  <AddressForm address={billingAddress} onChange={onBillingAddressChange} errors={errors}/>
                  <CreditCardForm />
                  <Form.Group>
                    <Form.Label>Name on Card</Form.Label>
                    <Form.Control type="text" onChange={onNameOnCardChange} value={nameOnCard}/>
                  </Form.Group>  
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </ListGroup.Item>
      </ListGroup>
    );
  };

  return renderCheckout();
};

export default Checkout;
