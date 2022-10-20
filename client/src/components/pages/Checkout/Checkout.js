import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, Button, ButtonGroup, Card, Col, Form, ToggleButton, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, updateCustomerError } from "../../../actions/userActions";
import { updateShipping, clearBag } from "../../../actions/bagActions";
import { submitOrder } from "../../../actions/orderActions";
import Loader from "../../Loader";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import { SubmitOrderButton } from "./SubmitOrderButton.tsx";
import { ShippingInfoForm } from "./ShippingInfoForm.tsx";
import { BillingInfoForm } from "./BillingInfoForm.tsx";
import { ReviewOrder } from "./ReviewOrder.tsx";
import { PaymentMethod } from "../../../enums/PaymentMethod";

const Checkout = () => {
  

  // const placeholderUser = {
  //   first: "John",
  //   last: "Doe",
  //   address1: "123 Columbia St",
  //   address2: "APT 1A",
  //   city: "Carson City",
  //   state: "NV",
  //   zip: "89154",
  //   email: "mikeev21@gmail.com",
  // };
  // const errorsInitialState = {
  //   first: "",
  //   last: "",
  //   address1: "",
  //   address2: "",
  //   city: "",
  //   state: "",
  //   zip: "",
  //   email: "",
  //   phone: "",
  //   password: "",
  // };

  // eslint-disable-next-line
  // const paymentInitialState = {
  //   method: "",
  //   creditCardNumber: "",
  //   expirationDate: "",
  //   securityCode: "",
  //   nameOnCard: "",
  //   address1: "",
  //   address2: "",
  //   city: "",
  //   state: "",
  //   zip: "",
  // };

  // const placeholderPayment = {
  //   network: "Visa",
  //   creditCardNumber: "4242424242424242",
  //   expirationDate: "08/21",
  //   securityCode: "424",
  //   nameOnCard: "John Doe",
  //   address1: "123 Columbia St",
  //   address2: "APT 1A",
  //   city: "Carson City",
  //   state: "NV",
  //   zip: "89154",
  // };

  // const securityCodeTooltipMessage =
  //   "Typically a three-digit number on the back of the card. American Express cards have a four-digit number on the front of the card to the right.";



  //const paymentMethod = PaymentMethod.CreditCard;
  //const { isAuthenticated, loggedInUser } = useSelector((state) => state.auth);
  //const customer = useSelector((state) => state.customer);
  //const shippingOptions = useSelector((state) => state.shippingOptions);
  //const [currentUser, setCurrentUser] = useState(loggedInUser || placeholderUser);
  // const [errors, setErrors] = useState(errorsInitialState);
  // const [formValid, setFormValid] = useState(true);

  //const [payment, setPayment] = useState(placeholderPayment); // replace with paymentInitialState
  // replace with paymentInitialState
  //const [paymentResult, setPaymentResult] = useState({ status: "" });
  //const [billingAddress, setBillingAddress] = useState({address1: "", address2: "", city: "", state: "", zip: ""});
  //
  //const [shippingOptionId, setShippingOptionId] = useState(1);
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.CreditCard);
  //const [ccFormValidation, setCcFormValidation] = useState({carNumberValid: false, cardExpiryValid: false, cardCvvValid: false});
  

  // const { bagItems, shipping, subtotal, tax, total } = useSelector(
  //   (state) => state.bag
  // );
  
  //const { loading: orderSubmitLoading } = useSelector((state) => state.order);
  // const customer = useSelector((state) => state.customer);

  const handleStepChange = (step) => {
    setStep(step);
  }

  const handlePaymentMethodChange = (paymentMethod) => {
    setPaymentMethod(paymentMethod);
  }

  // const handlePaymentChange = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   console.log(e.target);

  //   setPayment((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleSameAsShipping = () => {
  //   setSameAsShippingChecked(!sameAsShippingChecked);
  // };

  // const onBillingAddressChange = (obj) => {
  //   console.log("onBillingAddressChange()", obj);

  //   setBillingAddress((prevState) => ({
  //     ...prevState,
  //     ...obj,
  //   }));
  // };

  

  // const validateForm = () => {
  //   let valid = true;

  //   Object.keys(currentUser).map((key) => {
  //     const value = currentUser[key];
  //     const error = validateField(key, value);
  //     setErrors((prevState) => ({
  //       ...prevState,
  //       [key]: error,
  //     }));
  //     if (error) valid = false;
  //     return error;
  //   });

  //   setFormValid(valid);
  //   return valid;
  // };

  

  

  // const cleanUpOnSubmit = () => {
  //   // clear bag redux state
  //   //dispatch(clearBag());

  //   // reset shipping option
  //   setShippingOptionId(1);

  //   // clear current user
  //   setCurrentUser({});

  //   // clear payment
  //   setPayment({});
  // };

  // const onNameOnCardChange = (e) => {
  //   e.preventDefault();
  //   console.log(e.currentTarget.value);
  //   setNameOnCard(e.currentTarget.value);
  // }

  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const renderCheckout = () => {
    switch (step) {
      case 1:
        return <ShippingInfoForm handleStepChange={handleStepChange} />;
      case 2:
        return <BillingInfoForm handleStepChange={handleStepChange} paymentMethod={paymentMethod} handlePaymentMethodChange={handlePaymentMethodChange} />;
      case 3:
        return <ReviewOrder handleStepChange={handleStepChange} paymentMethod={paymentMethod} />;
      default:
        return;
    }
  };

  // Step 2:
  // const PaymentInfoForm = () => {
  //   return (
  //     <>
  //       <ShippingInfoSummary shippingOptionId={shippingOptionId} handleStepChange={handleStepChange} />
  //       <BillingInfoForm />
  //     </>
  //   );
  // };
  
  // Step 2 (Payment)
  // const PaymentForm = () => {   

  //   return (
  //     <ListGroup variant="flush" className="py-1">
  //       <ListGroup.Item>
  //         <h4>Payment</h4>
  //         <Accordion defaultActiveKey="1">
  //           <Card>
  //             <Accordion.Toggle
  //               as={Card.Header}
  //               eventKey="0"
  //               onClick={() => setPaymentMethodType(PAYPAL)}
  //             >
  //               <i className="fab fa-paypal"></i>&nbsp; PayPal
  //             </Accordion.Toggle>
  //             <Accordion.Collapse eventKey="0">
  //               <Card.Body>
  //                 <Card.Text>
  //                   Sign in to PayPal and return to complete your order
  //                 </Card.Text>
  //                 <Button
  //                   variant="info"
  //                   type="submit"
  //                   className="btn btn-block"
  //                 >
  //                   PayPal
  //                 </Button>
  //               </Card.Body>
  //             </Accordion.Collapse>
  //           </Card>
  //           <Card>
  //             <Accordion.Toggle
  //               as={Card.Header}
  //               eventKey="1"
  //               onClick={() => setPaymentMethodType(CREDIT_CARD)}
  //             >
  //               <i className="fas fa-credit-card"></i>&nbsp; Credit Card
  //             </Accordion.Toggle>
  //             <Accordion.Collapse eventKey="1">
  //               <Card.Body>
  //                 <Form.Check
  //                   type="checkbox"
  //                   label="Same as shipping"
  //                   className="pb-3"
  //                   checked={sameAsShippingChecked}
  //                   onChange={() => handleSameAsShipping()} />
  //                 <AddressForm address={billingAddress} onChange={onBillingAddressChange} errors={errors}/>
  //                 <CreditCardForm />
  //                 <Form.Group>
  //                   <Form.Label>Name on Card</Form.Label>
  //                   <Form.Control type="text" onChange={onNameOnCardChange} value={nameOnCard}/>
  //                 </Form.Group>  
  //               </Card.Body>
  //             </Accordion.Collapse>
  //           </Card>
  //         </Accordion>
  //       </ListGroup.Item>
  //     </ListGroup>
  //   );
  // };

  return renderCheckout();
};

export default Checkout;
