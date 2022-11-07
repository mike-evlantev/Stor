import * as React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useElements } from "@stripe/react-stripe-js";
import { useEffectDebugger } from "../../../utils/useEffectDebugger";
import { ICreditCardValidation } from "../../../types/ICreditCardValidation";

interface Props {
  initValidation: ICreditCardValidation;
  creditCardValidation: ICreditCardValidation;
  onCreditCardValidation: (value: React.SetStateAction<ICreditCardValidation>) => void;
}

export const CreditCardForm: React.FC<Props> = ({initValidation, creditCardValidation, onCreditCardValidation}) => {
    const elements = useElements();

    useEffectDebugger(() => {
      console.log("useEffect mounting card elements");
      
      const options = {
        style: {
          base: {
            fontSize: "1.2rem",
            fontFamily: "Open Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
            "::placeholder": {
              color: "transparent",
            },
            ":focus": {
              color: "#444",
            }
          },
          invalid: {
            iconColor: "#9b479f",
            color: "#9b479f",
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
      onCreditCardValidation(initValidation);

      let cardNumberElement = elements?.getElement("cardNumber");
      let cardExpiryElement = elements?.getElement("cardExpiry");
      let cardCvcElement = elements?.getElement("cardCvc");

      if (cardNumberElement) {
        cardNumberElement.on("change", (e) => {
          onCreditCardValidation((prev: ICreditCardValidation)  => ({...prev, number: e}));
        });
      }

      if (cardExpiryElement) {
        cardExpiryElement.on("change", (e) => {
          onCreditCardValidation((prev: ICreditCardValidation)  => ({...prev, expiry: e}));
        });
      }

      if (cardCvcElement) {
        cardCvcElement.on("change", (e) => {
          onCreditCardValidation((prev: ICreditCardValidation)  => ({...prev, cvc: e}));
        });
      }
    }, []);

    return (
      <div>
        <Form.Group className="mb-3">
          <Form.Label>Card Number</Form.Label>
          <div id="card-number-element" className={`form-control ${creditCardValidation.number.error?.message ? "is-invalid" : ""}`}>{/* iframe with Stripe element */}</div>
          {creditCardValidation.number.error?.message && <span className="invalid-feedback">{creditCardValidation.number.error.message}</span>}
        </Form.Group>
        <Row>
          <Col className="mb-3" lg={6}>
            <Form.Label>Expiration</Form.Label>
            <div id="card-expiry-element" className={`form-control ${creditCardValidation.expiry.error?.message ? "is-invalid" : ""}`}>{/* iframe with Stripe element */}</div>
            {creditCardValidation.expiry.error?.message && <span className="invalid-feedback">{creditCardValidation.expiry.error.message}</span>}
          </Col>
          <Col className="mb-3" lg={6}>
            <Form.Label>CVC</Form.Label>
            <div id="card-cvc-element" className={`form-control ${creditCardValidation.cvc.error?.message ? "is-invalid" : ""}`}>{/* iframe with Stripe element */}</div>
            {creditCardValidation.cvc.error?.message && <span className="invalid-feedback">{creditCardValidation.cvc.error.message}</span>}
          </Col>
        </Row>    
      </div>
    );
  };
