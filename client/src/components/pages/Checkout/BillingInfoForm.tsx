import * as React from "react";
import { Accordion, Button, Card, Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer, updateCustomerError } from "../../../actions/userActions";
import { PaymentMethod } from "../../../enums/PaymentMethod";
import { useStripeMethods } from "../../../hooks/useStripeMethods";
import { validateField } from "../../../services/formValidator";
import { IAddress } from "../../../types/IAddress";
import { IAddressErrors } from "../../../types/IAddressErrors";
import { ICreditCardValidation } from "../../../types/ICreditCardValidation";
import { IKeyValuePair } from "../../../types/IKeyValuePair";
import { Address } from "../../shared/Address";
import { AddressForm } from "../../shared/AddressForm";
import { Dev } from "../../shared/Dev";
import { CreditCardForm } from "./CreditCardForm";
import { GoBackButton } from "./GoBackButton";
import { GoToStepButton } from "./GoToStepButton";
import { ShippingInfoSummary } from "./ShippingInfoSummary";

interface BillingInfoFormErrors extends IAddressErrors  {
    nameOnCard: string;
}

interface Props {
    onPaymentMethodChange: (paymentMethod: PaymentMethod) => void;
    onStepChange: (step: number) => void;
}

const initAddress = {address1: "", address2: "", city: "", state: "", zip: ""};
const initErrors = {address1: "", address2: "", city: "", state: "", zip: "", nameOnCard: ""};
const initCreditCardValidation: ICreditCardValidation = {
    number: {elementType: "cardNumber", brand: "unknown", empty: true, complete: false, error: undefined}, 
    expiry: {elementType: "cardExpiry", empty: true, complete: false, error: undefined}, 
    cvc: {elementType: "cardCvc", empty: true, complete: false, error: undefined}
  };

export const BillingInfoForm: React.FC<Props> = ({onStepChange, onPaymentMethodChange}) => {
    const dispatch = useDispatch();
    
    const customer = useSelector((state: any) => state.customer);
    const [nameOnCard, setNameOnCard] = React.useState(customer.nameOnCard || "");
    const [sameAsShipping, setSameAsShipping] = React.useState(true);
    const [address, setAddress] = React.useState<IAddress>(initAddress);
    const [errors, setErrors] = React.useState<BillingInfoFormErrors>(initErrors);
    const [creditCardValidation, setCreditCardValidation] = React.useState<ICreditCardValidation>(initCreditCardValidation);
    const {createPaymentMethod} = useStripeMethods();

    React.useEffect(() => {
        dispatch(updateCustomer({card: creditCardValidation}));
    }, [creditCardValidation]);

    const handleNextStepClick = async (step: number) => {
        const finalAddress = sameAsShipping ? customer.shippingAddress : address;
        const [valid, errorObj] = handleValidateChange({...finalAddress, nameOnCard});

        if (!creditCardValidation.number.complete && creditCardValidation.number.empty) {
            setCreditCardValidation((prev: ICreditCardValidation)  => ({...prev, number: {...prev.number, error: {type: "validation_error", code: "", message: "Your card number is incomplete."}}}));
        }

        if (!creditCardValidation.expiry.complete && creditCardValidation.expiry.empty) {
            setCreditCardValidation((prev: ICreditCardValidation)  => ({...prev, expiry: {...prev.expiry, error: {type: "validation_error", code: "", message: "Your card's expiration date is incomplete."}}}));
        }

        if (!creditCardValidation.cvc.complete && creditCardValidation.cvc.empty) {
            setCreditCardValidation((prev: ICreditCardValidation)  => ({...prev, cvc: {...prev.cvc, error: {type: "validation_error", code: "", message: "Your card's security code is incomplete."}}}));
        }

        const stripeValid = (creditCardValidation.number.complete && !creditCardValidation.number.empty && !creditCardValidation.number.error)
                        && (creditCardValidation.expiry.complete && !creditCardValidation.expiry.empty && !creditCardValidation.expiry.error)
                        && (creditCardValidation.cvc.complete && !creditCardValidation.cvc.empty && !creditCardValidation.cvc.error);
        
        if (valid && stripeValid) {
            dispatch(updateCustomer({billingAddress: finalAddress, nameOnCard}));
            dispatch(updateCustomerError(initErrors));

            const paymentMethod = await createPaymentMethod();
            if (paymentMethod) {
                dispatch(updateCustomer({card: {...creditCardValidation, paymentMethod}}));
            }
            

            onStepChange(step);
        } else {
            const {address1, address2, city, state, zip, nameOnCard} = errorObj;
            dispatch(updateCustomerError({billingAddress: {address1, address2, city, state, zip}, nameOnCard}));
        }       
    }

    const handleValidateChange = <T extends object>(obj: T): [boolean, {[k: string]: any}] => {
        let valid = true;
        let errorObj: {[k: string]: string} = {};

        Object.keys(obj).map((key) => {
          const value = (obj as any)[key] as string;
          const error = validateField({key, value});

          if (error) {
            valid = false;
            errorObj[key] = error;
          }
          
          setErrors(prev => ({...prev, [key]: error}));
          return error;
        });
    
        return [valid, errorObj];
    };

    const handleAddressChange = (address: IKeyValuePair<string>) => {
        setAddress(prev => ({...prev, ...address}))
    }

    const handleValidateBillingAddressChange = (obj: IKeyValuePair<string>): boolean => {
        let valid = true;
    
        Object.keys(obj).map((key) => {
            const value = obj[key];
            const error = validateField({key, value});
            if (error) valid = false;
            handleErrorsChange({[key]: error});
            return error;
        });

        return valid;
    };

    const handleBillingAddressFocus = (e: React.FocusEvent<HTMLInputElement>): boolean => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value} as IKeyValuePair<string>;
        handleAddressChange(obj);
        return handleValidateBillingAddressChange(obj);
    };

    const handleBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value} as IKeyValuePair<string>;
        handleAddressChange(obj);
        return handleValidateBillingAddressChange(obj);
    };

    const handleNameOnCardChange = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
        e.preventDefault();
        setNameOnCard(e.currentTarget.value);
        return handleValidateNameOnCardChange(e.currentTarget.value);
    }

    const handleNameOnCardFocus = (e: React.FocusEvent<HTMLInputElement>): boolean => {
        e.preventDefault();
        return handleValidateNameOnCardChange(e.currentTarget.value);
    }

    const handleValidateNameOnCardChange = (nameOnCard: string): boolean => {
        let valid = true;
        const error = validateField({key: "nameOnCard", value: nameOnCard});
        if (error) valid = false;
        handleErrorsChange({nameOnCard: error});
        return valid;
    };

    const handleSameAsShipping = (same: boolean) => {
        setSameAsShipping(same);
    }

    const handleTestDataClick = () => {
        setAddress({address1: "225 15th St", address2: "", city: "Del Mar", state: "CA", zip: "92014"});
    }

    const handleErrorsChange = (obj: IKeyValuePair<string>) => {
        setErrors(prev => ({...prev, ...obj}));
    }

    return (
        <>
            <ShippingInfoSummary onStepChange={onStepChange} />
            <ListGroup variant="flush" className="py-1">
                <ListGroup.Item>
                    <h4>Payment</h4>
                    <Accordion defaultActiveKey="1">
                    <Card>
                        <Accordion.Item
                            as={Card.Header}
                            eventKey="0"
                            onClick={() => onPaymentMethodChange(PaymentMethod.PayPal)}>
                            <i className="fab fa-paypal"></i>&nbsp; PayPal
                        </Accordion.Item>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Card.Text>
                                Sign in to PayPal and return to complete your order
                            </Card.Text>
                            <Button variant="info" type="submit" className="btn btn-block">
                                PayPal
                            </Button>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Item
                            as={Card.Header}
                            eventKey="1"
                            onClick={() => onPaymentMethodChange(PaymentMethod.CreditCard)}>
                            <i className="fas fa-credit-card"></i>&nbsp; Credit Card
                        </Accordion.Item>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <CreditCardForm initValidation={initCreditCardValidation} creditCardValidation={creditCardValidation} onCreditCardValidation={setCreditCardValidation} />
                            <Form.Group>
                                <Form.Label>Name on Card</Form.Label>
                                <Form.Control type="text" onBlur={handleNameOnCardFocus} onChange={handleNameOnCardChange} value={nameOnCard} isInvalid={!!errors?.nameOnCard} />
                                <Form.Control.Feedback type="invalid">{errors?.nameOnCard}</Form.Control.Feedback>
                                <div className="mt-3 mb-2"><strong>Billing Address</strong></div>
                                <Form.Check
                                    type="checkbox"
                                    label="Same as shipping"
                                    className="mb-2"
                                    checked={sameAsShipping}
                                    onChange={() => handleSameAsShipping(!sameAsShipping)} />
                                {sameAsShipping
                                    ? <Address className={"ml-4"} address={customer.shippingAddress} />
                                    : <>
                                        <AddressForm address={address} onBlur={handleBillingAddressFocus} onChange={handleBillingAddressChange} errors={errors} onErrorsChange={handleErrorsChange} />
                                        <Dev className={"d-flex flex-column w-25 p-2"}>
                                            <Button variant="secondary" className="my-2 btn-sm" onClick={handleTestDataClick}>
                                                Use test data
                                            </Button>
                                        </Dev>
                                    </>}
                            </Form.Group>  
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    </Accordion>
                </ListGroup.Item>
            </ListGroup>
            <div className="d-flex align-items-start">
                <GoBackButton prevStep={1} handleClick={onStepChange} />
                <GoToStepButton label={"Review Order"} nextStep={3} onClick={handleNextStepClick} />
            </div>
        </>
    );
  };