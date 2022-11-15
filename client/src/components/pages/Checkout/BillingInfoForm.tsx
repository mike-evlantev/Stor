import * as React from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { alert } from "../../../features/messages/messagesSlice";
import { updateCustomer, updateCustomerErrors } from "../../../features/user/customerSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
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

const initAddress = {address1: "", address2: "", city: "", state: "", zip: ""};
const initErrors = {billingAddress: {address1: "", address2: "", city: "", state: "", zip: ""} , nameOnCard: ""};
const initCreditCardValidation: ICreditCardValidation = {
    number: {elementType: "cardNumber", brand: "unknown", empty: true, complete: false, error: undefined}, 
    expiry: {elementType: "cardExpiry", empty: true, complete: false, error: undefined}, 
    cvc: {elementType: "cardCvc", empty: true, complete: false, error: undefined}
  };

export const BillingInfoForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const customer = useAppSelector(state => state.customer);
    const [nameOnCard, setNameOnCard] = React.useState(customer.card.nameOnCard || "");
    const [sameAsShipping, setSameAsShipping] = React.useState(true);
    const [address, setAddress] = React.useState<IAddress>(initAddress);
    const [errors, setErrors] = React.useState<BillingInfoFormErrors>(initErrors);
    const [creditCardValidation, setCreditCardValidation] = React.useState<ICreditCardValidation>(initCreditCardValidation);

    const {createPaymentMethod, toAddress} = useStripeMethods();

    const appearance = {
        theme: 'none',
    
        rules: {
          '.Tab': {
            border: '10px solid green',
            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
          },
    
          '.Tab:hover': {
            color: 'var(--colorText)',
          },
    
          '.Tab--selected': {
            borderColor: '#E0E6EB',
            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
          },
    
          '.Input--invalid': {
            borderColor: 'green',
            //boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
          }
        }
      };

    React.useEffect(() => {
        dispatch(updateCustomer({card: {...customer.card, ...creditCardValidation}}));
    }, [creditCardValidation]);

    const handleNextStepClick = async (step: number) => {
        const finalAddress = sameAsShipping ? customer.shippingAddress : address;
        const [valid, errorObj] = handleValidateChange({...finalAddress, nameOnCard});
        
        // if valid udpate customer state right away
        if (valid) {
            dispatch(updateCustomer({billingAddress: finalAddress}));
        }

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
            const paymentMethod = await createPaymentMethod(finalAddress, nameOnCard);
            if (paymentMethod) {
                dispatch(updateCustomer({card: {...creditCardValidation, nameOnCard, paymentMethod}}));
            } else {
                dispatch(alert({text: "Failed to create stripe payment method", type: "danger"}))
            }
            
            dispatch(updateCustomerErrors(initErrors));
            history.push(`/checkout${step}`);
        } else {
            const {address1, address2, city, state, zip, nameOnCard} = errorObj;
            // TODO: clear state for errored key.
            dispatch(updateCustomerErrors({billingAddress: {address1, address2, city, state, zip}, nameOnCard}));
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
    
    const items: AccordionItem[] = [
        {
            key: 1,
            TitleComponent: () => { return <div><i className="fab fa-paypal"></i>&nbsp; PayPal</div> },
            ContentComponent: () => { 
                return (
                    <>
                        Sign in to PayPal and return to complete your order
                        <Button variant="info" type="submit" className="btn btn-block">
                            PayPal
                        </Button>
                    </>
                )},
        },
        {
            key: 2,
            TitleComponent: () => { return <div><i className="fas fa-credit-card"></i>&nbsp; Credit Card</div> },
            ContentComponent: () => { 
                return (
                    <>
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
                    </>
                )},
        }
    ];

    const [openKey, setOpenKey] = React.useState<number | undefined>(undefined);

    const handleToggle = (key: number | undefined) => {
        setOpenKey(openKey !== key ? key : undefined);
    }

    return (
        <>
            <ShippingInfoSummary />
            <ListGroup variant="flush" className="py-3">
                <ListGroup.Item>
                    <h4>Payment</h4>
                    <div style={{margin: "2rem auto"}}>
                        {/* key is necessary on parent element to be able to re-render child element: 
                            in this case, the chevron (up/down) icon next to item qty
                            https://reactjs.org/docs/reconciliation.html */}
                        <div key={`paypal-${openKey}`} onClick={() => handleToggle(1)} className="d-flex flex-row justify-content-between p-3" style={{cursor: "pointer"}}>
                            <div><i className="fab fa-paypal"></i>&nbsp; PayPal</div>
                            <i className={openKey === 1 ? "fas fa-chevron-up fa-lg" : "fas fa-chevron-down fa-lg"}></i>                            
                        </div>
                        {openKey === 1 && <div className="d-flex flex-column p-3">
                            <span>Sign in to PayPal and return to complete your order</span>
                            <Button variant="info" type="submit" className="w-100">
                                PayPal
                            </Button>  
                        </div>}
                        {/* key is necessary on parent element to be able to re-render child element: 
                            in this case, the chevron (up/down) icon next to item qty
                            https://reactjs.org/docs/reconciliation.html */}
                        <div key={`creditcard-${openKey}`} onClick={() => handleToggle(2)} className="d-flex flex-row justify-content-between p-3" style={{cursor: "pointer"}}>
                            <div><i className="fas fa-credit-card"></i>&nbsp; Credit Card</div>
                            <i className={openKey === 2 ? "fas fa-chevron-up fa-lg" : "fas fa-chevron-down fa-lg"}></i>
                        </div>
                        {openKey === 2 && <div className="p-3">
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
                        </div>}
                    </div>
                    {/* <Accordion items={items}/> */}
                </ListGroup.Item>
            </ListGroup>
            <div className="d-flex align-items-start">
                <GoBackButton prevStep={1} />
                <div className="ms-auto">
                    <GoToStepButton label={"Review Order"} nextStep={3} onClick={handleNextStepClick} />
                </div>                
            </div>
        </>
    );
};

interface AccordionItem {
    key: number;
    TitleComponent: React.ComponentType;
    ContentComponent: React.ComponentType;
}

interface AccordionProps {
    items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({items}) => {
    const [openKey, setOpenKey] = React.useState<number | undefined>(undefined);

    const handleToggle = (key: number | undefined) => {
        setOpenKey(openKey !== key ? key : undefined);
    }

    return (
        <div style={{margin: "2rem auto"}}>
            {items.map(item => <div key={item.key}>
                <div onClick={() => handleToggle(item.key)} className="d-flex flex-row justify-content-between p-3" style={{cursor: "pointer"}}>
                    <item.TitleComponent />
                    <div>{openKey === item.key ? '-' : '+'}</div>
                </div>
                {openKey === item.key && <div className="p-3">
                    <item.ContentComponent />
                </div>}
            </div>)}
        </div>
    );
}