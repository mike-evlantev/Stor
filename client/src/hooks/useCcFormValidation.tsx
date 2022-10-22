import * as React from "react";
import { useElements } from "@stripe/react-stripe-js";

interface CcValidation {
    numberValid: boolean;
    numberError: string;
    expiryValid: boolean;
    expiryError: string;
    cvcValid: boolean;
    cvcError: string;
}

export const useCcFormValidation = (): [CcValidation] => {
    const elements = useElements();

    const validationInitState: CcValidation = {
        numberValid: false,
        numberError: "",
        expiryValid: false,
        expiryError: "",
        cvcValid: false,
        cvcError: ""
    }
    const [ccValidation, setCcValidation] = React.useState<CcValidation>(validationInitState);

    console.log("useCcFormValidation()");
    const cardNumberElement = elements?.getElement("cardNumber");
    const cardExpiryElement = elements?.getElement("cardExpiry");
    const cardCvcElement = elements?.getElement("cardCvc");

    if (cardNumberElement) {
        cardNumberElement.on("change", (e) => {
            setCcValidation(prev => ({...prev, numberValid: !e.error && e.complete, numberError: e.error?.message || ""}));
        });
    }

    if (cardExpiryElement) {
        cardExpiryElement.on("change", (e) => {
            setCcValidation(prev => ({...prev, expiryValid: !e.error && e.complete, expiryError: e.error?.message || ""}));
        });
    }

    if (cardCvcElement) {
        cardCvcElement.on("change", (e) => {
            setCcValidation(prev => ({...prev, cvcValid: !e.error && e.complete, cvcError: e.error?.message || ""}));
        });
    }

    return [ccValidation];
}