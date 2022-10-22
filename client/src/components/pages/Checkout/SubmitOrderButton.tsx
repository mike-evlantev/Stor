import * as React from "react";
import { Button } from "react-bootstrap";
import { useCcFormValidation } from "../../../hooks/useCcFormValidation";

interface SubmitOrderButtonProps {
    orderSubmitLoading: boolean;
    bagItems: any;
    handleSubmitOrder: () => void;
}

export const SubmitOrderButton = ({orderSubmitLoading, bagItems, handleSubmitOrder}: SubmitOrderButtonProps) => {
    //const ccValidationInit: CreditCardValidation = { numberValid: false, expiryValid: false, cvcValid: false };
    //const [ccValidation, setCcValidation] = React.useState<CreditCardValidation>(ccValidationInit);
    //const elements = useElements();
    const [ccValidation] = useCcFormValidation();
    const {numberValid, expiryValid, cvcValid} = ccValidation;
    //const isValid = (numberValid: boolean, expiryValid: boolean, cvcValid: boolean): boolean => numberValid && expiryValid && cvcValid;

    // React.useEffect(() => {
    //   console.log("useEffect validating card elements");

    //   let cardNumberElement = elements?.getElement("cardNumber");
    //   let cardExpiryElement = elements?.getElement("cardExpiry");
    //   let cardCvvElement = elements?.getElement("cardCvc");

    //   if (cardNumberElement) {
    //     cardNumberElement.on("change", (e) => {
    //       setCcValidation(prev => ({...prev, numberValid: !e.error && e.complete}));
    //     });
    //   }

    //   if (cardExpiryElement) {
    //     cardExpiryElement.on("change", (e) => {
    //         setCcValidation(prev => ({...prev, expiryValid: !e.error && e.complete}));
    //     });
    //   }

    //   if (cardCvvElement) {
    //     cardCvvElement.on("change", (e) => {
    //         setCcValidation(prev => ({...prev, cvcValid: !e.error && e.complete}));
    //     });
    //   }


    // }, [elements]);

    // validate cc form via stripe elements API
    
    return (
      <Button
        variant="primary"
        className="my-2 float-right"
        onClick={() => handleSubmitOrder()}
        disabled={
          orderSubmitLoading || !bagItems || bagItems.length === 0 || (!numberValid && !expiryValid && !cvcValid)
        }
      >
        Submit Order
      </Button>
    );
  };