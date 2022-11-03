import React, { useState, useEffect } from "react";
import { ShippingInfoForm } from "./ShippingInfoForm.tsx";
import { BillingInfoForm } from "./BillingInfoForm.tsx";
import { ReviewOrder } from "./ReviewOrder.tsx";
import { PaymentMethod } from "../../../enums/PaymentMethod";

const CheckoutOld = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.CreditCard);

  const handleStepChange = (step) => {
    setStep(step);
  }

  const handlePaymentMethodChange = (paymentMethod) => {
    setPaymentMethod(paymentMethod);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const renderCheckout = () => {
    switch (step) {
      case 1:
        return <ShippingInfoForm onStepChange={setStep} />;
      case 2:
        return <BillingInfoForm onStepChange={handleStepChange} paymentMethod={paymentMethod} onPaymentMethodChange={handlePaymentMethodChange} />;
      case 3:
        return <ReviewOrder onStepChange={handleStepChange} paymentMethod={paymentMethod} />;
      default:
        return;
    }
  };

  return renderCheckout();
};

export default CheckoutOld;
