import * as React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useElements } from "@stripe/react-stripe-js";
import { StripeCardCvcElementChangeEvent, StripeCardExpiryElementChangeEvent, StripeCardNumberElementChangeEvent } from "@stripe/stripe-js";
import { useEffectDebugger } from "../../../utils/useEffectDebugger";

// interface CreditCardFormProps {
//   onNameOnCardChange: (name: string) => void;
// }

export const CreditCardForm = () => {
    const elements = useElements();
        
    const [cardNumberValidation, setCardNumberValidation] = React.useState<StripeCardNumberElementChangeEvent>();
    const [cardExpiryValidation, setCardExpiryValidation] = React.useState<StripeCardExpiryElementChangeEvent>();
    const [cardCvcValidation, setCardCvcValidation] = React.useState<StripeCardCvcElementChangeEvent>();    

    useEffectDebugger(() => {
      console.log("useEffect mounting card elements");
      
      const options = {
        style: {
          base: {
            fontFamily: "Open Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
            "::placeholder": {
              color: "transparent",
            },
            ":focus": {
              color: "#444",
            }
          },
          invalid: {
            iconColor: "#d9230f",
            color: "#d9230f",
          },
          complete: {
            iconColor: "#469408",
          },
        },
      };

      let cardNumberElement = elements?.getElement("cardNumber");
      if (!cardNumberElement) {
        cardNumberElement = elements?.create("cardNumber", options);
      }

      let cardExpiryElement = elements?.getElement("cardExpiry");
      if (!cardExpiryElement) {
        cardExpiryElement = elements?.create("cardExpiry", options);
      }
      
      let cardCvcElement = elements?.getElement("cardCvc");
      if (!cardCvcElement) {
        cardCvcElement = elements?.create("cardCvc", options);
      }

      cardNumberElement?.mount("#card-number-element");
      cardExpiryElement?.mount("#card-expiry-element");
      cardCvcElement?.mount("#card-cvc-element");      
    }, []);

    useEffectDebugger(() => {
      console.log("useEffect validating card elements");

      let cardNumberElement = elements?.getElement("cardNumber");
      let cardExpiryElement = elements?.getElement("cardExpiry");
      let cardCvcElement = elements?.getElement("cardCvc");

      if (cardNumberElement) {
        cardNumberElement.on("change", (e) => {
          setCardNumberValidation(e);
        });
      }

      if (cardExpiryElement) {
        cardExpiryElement.on("change", (e) => {
          setCardExpiryValidation(e);
        });
      }

      if (cardCvcElement) {
        cardCvcElement.on("change", (e) => {
          setCardCvcValidation(e);
        });
      }
    }, []);

    // const handleNameOnCardChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    //   e.preventDefault();
    //   onNameOnCardChange(e.currentTarget.value);
    // }, []);

    return (
      <div>
        <Form.Group>
          <Form.Label>Card Number</Form.Label>
          <div id="card-number-element" key="card-number-element-1">{/* iframe with Stripe element */}</div>
          {cardNumberValidation?.error?.message && <span className="text-primary">{cardNumberValidation.error.message}</span>}
        </Form.Group>
        <Row>
          <Col className="mb-3" lg={6}>
            <Form.Label>Expiration</Form.Label>
            <div id="card-expiry-element" key="card-expiry-element-1">{/* iframe with Stripe element */}</div>
            {cardExpiryValidation?.error?.message && <span className="text-primary">{cardExpiryValidation.error.message}</span>}
          </Col>
          <Col className="mb-3" lg={6}>
            <Form.Label>CVC</Form.Label>
            <div id="card-cvc-element" key="card-cvc-element">{/* iframe with Stripe element */}</div>
            {cardCvcValidation?.error?.message && <span className="text-primary">{cardCvcValidation.error.message}</span>}
          </Col>
        </Row>    
      </div>
    );
  };
