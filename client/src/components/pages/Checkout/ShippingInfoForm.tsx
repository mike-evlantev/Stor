import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer, updateCustomerError } from "../../../actions/userActions";
import { validateField } from "../../../services/formValidator";
import { Address } from "../../../types/Address";
import { AddressErrors } from "../../../types/AddressErrors";
import { KeyValuePair } from "../../../types/KeyValuePair";
import { Name } from "../../../types/Name";
import { NameErrors } from "../../../types/NameErrors";
import { CheckoutSignIn } from "./CheckoutSignIn";
import { ContactInfoForm } from "./ContactInfoForm";
import { GoToStepButton } from "./GoToStepButton";
import { ShippingAddressForm } from "./ShippingAddressForm";
import { ShippingMethodForm } from "./ShippingMethodForm";

interface Props {
    handleStepChange: (step: number) => void;
}

interface ShippingInfoFormErrors extends NameErrors, AddressErrors {
    email: string
}

const initErrors = {first: "", last: "", address1: "", address2: "", city: "", state: "", zip: "", email: ""};

export const ShippingInfoForm: React.FC<Props> = ({handleStepChange}: Props) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state: any) => state.auth);
    const [email, setEmail] = React.useState<string>("");
    const [name, setName] = React.useState<Name>({first: "", last: ""});
    const [address, setAddress] = React.useState<Address>({address1: "", address2: "", city: "", state: "", zip: ""});
    const [errors, setErrors] = React.useState<ShippingInfoFormErrors>(initErrors);

    const handleNextStepClick = (step: number) => {
        const [valid, errorObj] = onValidateChange({...name, ...address, email});
        console.log(valid, errorObj);
        if (valid) {
            dispatch(updateCustomer({...name, shippingAddress: address, email}));
            handleStepChange(step);
        } else {
            const {first, last, address1, address2, city, state, zip, email} = errorObj;
            dispatch(updateCustomerError({first, last, shippingAddress: {address1, address2, city, state, zip}, email}))
        }       
    }

    const handleEmailChange = (email: string) => {
        setEmail(email);
    }

    const handleNameChange = (name: KeyValuePair<string>) => {
        setName(prev => ({...prev, ...name}))
    }

    const handleAddressChange = (address: KeyValuePair<string>) => {
        setAddress(prev => ({...prev, ...address}))
    }

    const handleErrorsChange = (obj: KeyValuePair<string>) => {
        setErrors(prev => ({...prev, ...obj}));
    }

    const onValidateChange = <T extends object>(obj: T): [boolean, ShippingInfoFormErrors] => {
        let valid = true;
        const errorObj: ShippingInfoFormErrors = initErrors;

        Object.keys(obj).map((key) => {
          const value = (obj as any)[key];
          const error = validateField({key, value});
          
          if (error) {
            valid = false;
            Object.assign(errorObj, {[key]: value}); // TODO: isnt working :(
          }
          
          setErrors(prev => ({...prev, [key]: error}));
          return error;
        });
    
        return [valid, errorObj];
    };

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
                handleNameChange={handleNameChange}
                address={address}
                handleAddressChange={handleAddressChange}
                errors={errors} 
                handleErrorsChange={handleErrorsChange} />
            <ShippingMethodForm />
            <GoToStepButton nextStep={2} handleClick={handleNextStepClick} />
        </>
    );
} 