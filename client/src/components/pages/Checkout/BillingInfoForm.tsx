import * as React from "react";
import { Accordion, Button, Card, Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer, updateCustomerError } from "../../../actions/userActions";
import { PaymentMethod } from "../../../enums/PaymentMethod";
import { validateField } from "../../../services/formValidator";
import { IAddress } from "../../../types/IAddress";
import { IAddressErrors } from "../../../types/IAddressErrors";
import { IKeyValuePair } from "../../../types/IKeyValuePair";
import { Address } from "../../shared/Address";
import { AddressForm } from "../../shared/AddressForm";
import { Dev } from "../../shared/Dev";
import { CreditCardForm } from "./CreditCardForm";
import { GoBackButton } from "./GoBackButton";
import { GoToStepButton } from "./GoToStepButton";
import { ShippingInfoSummary } from "./ShippingInfoSummary";

interface BillingInfoFormErrors extends IAddressErrors {
    //email: string
}

interface Props {
    handlePaymentMethodChange: (paymentMethod: PaymentMethod) => void;
    handleStepChange: (step: number) => void;
}

const initErrors = {address1: "", address2: "", city: "", state: "", zip: ""};

export const BillingInfoForm: React.FC<Props> = ({handleStepChange, handlePaymentMethodChange}) => {
    const dispatch = useDispatch();
    const customer = useSelector((state: any) => state.customer);
    const [nameOnCard, setNameOnCard] = React.useState(customer.nameOnCard);
    const [sameAsShipping, setSameAsShipping] = React.useState(true);
    const [address, setAddress] = React.useState<IAddress>(customer.shippingAddress);
    const [errors, setErrors] = React.useState<BillingInfoFormErrors>(initErrors);
    //const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(PaymentMethod.CreditCard); 

    const handleNextStepClick = (step: number) => {
        const finalAddress = sameAsShipping ? customer.shippingAddress : address;
        const [valid, errorObj] = onValidateChange(finalAddress);
        if (valid) {
            dispatch(updateCustomer({billingAddress: finalAddress}));
            handleStepChange(step);
        } else {
            const {first, last, address1, address2, city, state, zip, email} = errorObj;
            dispatch(updateCustomerError({first, last, shippingAddress: {address1, address2, city, state, zip}, email}))
        }       
    }

    const onValidateChange = <T extends object>(obj: T): [boolean, {[k: string]: any}] => {
        let valid = true;
        let errorObj: {[k: string]: string} = {};

        console.log(obj);
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

    const onValidateBillingAddressChange = (obj: IKeyValuePair<string>): boolean => {
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

    const onBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value} as IKeyValuePair<string>;
        handleAddressChange(obj);
        return onValidateBillingAddressChange(obj);
    };

    const onNameOnCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.value);
        setNameOnCard(e.currentTarget.value);
    }

    const handleSameAsShipping = (same: boolean) => {
        setSameAsShipping(same);
        if (same) {
            //setAddress(customer.shippingAddress);
            dispatch(updateCustomer({billingAddress: customer.shippingAddress}));
        } else {
            //setAddress({} as IAddress);
        }
    }

    const handleTestDataClick = () => {
        setAddress({address1: "225 15th St", city: "Del Mar", state: "CA", zip: "92014"});
    }

    const handleErrorsChange = (obj: IKeyValuePair<string>) => {
        setErrors(prev => ({...prev, ...obj}));
    }

    return (
        <>
            <ShippingInfoSummary handleStepChange={handleStepChange} />
            <ListGroup variant="flush" className="py-1">
                <ListGroup.Item>
                    <h4>Payment</h4>
                    <Accordion defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle
                        as={Card.Header}
                        eventKey="0"
                        onClick={() => handlePaymentMethodChange(PaymentMethod.PayPal)}
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
                        onClick={() => handlePaymentMethodChange(PaymentMethod.CreditCard)}
                        >
                        <i className="fas fa-credit-card"></i>&nbsp; Credit Card
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            
                            
                            <CreditCardForm />
                            <Form.Group>
                                <Form.Label>Name on Card</Form.Label>
                                <Form.Control type="text" onChange={onNameOnCardChange} value={nameOnCard}/>
                                <div className="mt-3 mb-1"><strong>Billing Address</strong></div>
                                <Form.Check
                                    type="checkbox"
                                    label="Same as shipping"
                                    className="pb-1"
                                    checked={sameAsShipping}
                                    onChange={() => handleSameAsShipping(!sameAsShipping)} />
                                {sameAsShipping
                                    ? <Address className={"ml-4"} address={customer.shippingAddress} />
                                    : <>
                                        <AddressForm address={address} onChange={onBillingAddressChange} errors={errors} handleErrorsChange={handleErrorsChange} />
                                        <Dev>
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
                <GoBackButton prevStep={1} handleClick={handleStepChange} />
                <GoToStepButton label={"Review Order"} nextStep={3} handleClick={handleNextStepClick} />
            </div>
        </>
    );
  };