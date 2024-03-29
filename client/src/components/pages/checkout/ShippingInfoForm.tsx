import * as React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { updateCustomer, updateCustomerErrors } from "../../../features/user/customerSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { validateField } from "../../../services/formValidator";
import { IAddress } from "../../../types/IAddress";
import { IAddressErrors } from "../../../types/IAddressErrors";
import { IKeyValuePair } from "../../../types/IKeyValuePair";
import { IName } from "../../../types/IName";
import { INameErrors } from "../../../types/INameErrors";
import { Dev } from "../../shared/Dev";
import { CheckoutSignIn } from "./CheckoutSignIn";
import { ContactInfoForm } from "./ContactInfoForm";
import { GoToStepButton } from "./GoToStepButton";
import { ShippingAddressForm } from "./ShippingAddressForm";
import { ShippingMethodForm } from "./ShippingMethodForm";

interface ShippingInfoFormErrors extends INameErrors, IAddressErrors {
    email: string
}

const initErrors = {first: "", last: "", shippingAddress: {address1: "", address2: "", city: "", state: "", zip: ""}, email: ""};

export const ShippingInfoForm: React.FC = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const customer = useAppSelector(state => state.customer);
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const [email, setEmail] = React.useState<string>(customer.email);
    const [name, setName] = React.useState<IName>({first: customer.first, last: customer.last});
    const [address, setAddress] = React.useState<IAddress>(customer.shippingAddress);
    const [errors, setErrors] = React.useState<ShippingInfoFormErrors>(initErrors);

    const handleNextStepClick = (step: number) => {
        const [valid, errorObj] = handleValidateChange({...name, ...address, email});
        if (valid) {
            dispatch(updateCustomer({...name, shippingAddress: address, email}));
            dispatch(updateCustomerErrors(initErrors));
            history.push("/checkout2");
        } else {
            const {first, last, address1, address2, city, state, zip, email} = errorObj;
            dispatch(updateCustomerErrors({first, last, shippingAddress: {address1, address2, city, state, zip}, email}))
        }       
    }

    const handleEmailChange = (email: string) => {
        setEmail(email);
    }

    const handleNameChange = (name: IKeyValuePair<string>) => {
        setName(prev => ({...prev, ...name}))
    }

    const handleAddressChange = (address: IKeyValuePair<string>) => {
        setAddress(prev => ({...prev, ...address}))
    }

    const handleErrorsChange = (obj: IKeyValuePair<string>) => {
        setErrors(prev => ({...prev, ...obj}));
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

    const handleTestDataClick = () => {
        setEmail(process.env.REACT_APP_ADMIN_EMAIL as string);
        setName({first: "Jimmy", last: "Durante"});
        setAddress({address1: "1844 Grand Ave", address2: "#1", city: "Del Mar", state: "CA", zip: "92014"});
    }

    return(
        <>
            {!isAuthenticated && <CheckoutSignIn  />}
            <ContactInfoForm
                email={email}
                onChange={handleEmailChange}
                error={errors.email}
                handleErrorsChange={handleErrorsChange} />
            <ShippingAddressForm
                name={name}
                onNameChange={handleNameChange}
                address={address}
                onAddressChange={handleAddressChange}
                errors={errors} 
                onErrorsChange={handleErrorsChange} />
            <ShippingMethodForm />
            <div className="d-flex">
                <Dev className={"d-flex flex-column p-2"}>
                    <Button variant="secondary" className="my-2 btn-sm" onClick={handleTestDataClick}>
                        Use test data
                    </Button>
                </Dev>
                <div className="ms-auto">
                    <GoToStepButton label={"Go to next step"} nextStep={2} onClick={handleNextStepClick} />
                </div>                
            </div>
        </>
    );
}