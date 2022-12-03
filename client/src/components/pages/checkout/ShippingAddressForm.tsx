import * as React from "react";
import { Form, ListGroup } from "react-bootstrap";
import { IKeyValuePair } from "../../../types/IKeyValuePair";
import { AddressForm } from "../../shared/AddressForm";
import { NameForm } from "../../shared/NameForm";
import { validateField } from "../../../services/formValidator";
import { IAddressErrors } from "../../../types/IAddressErrors";
import { INameErrors } from "../../../types/INameErrors";
import { IAddress } from "../../../types/IAddress";
import { IName } from "../../../types/IName";

interface Props {
    errors: IAddressErrors & INameErrors;
    onErrorsChange: (errors: IKeyValuePair<string>) => void;
    name: IName;
    onNameChange: (name: IKeyValuePair<string>) => void;
    address: IAddress;
    onAddressChange: (adderss: IKeyValuePair<string>) => void;
}

export const ShippingAddressForm: React.FC<Props> = ({errors, onErrorsChange, name, onNameChange, address, onAddressChange}: Props) => {
    const handleValidateNameChange = (obj: IKeyValuePair<string>): boolean => {
        let valid = true;
    
        Object.keys(obj).map((key) => {
            const value = obj[key];
            const error = validateField({key, value});
            if (error) valid = false;
            onErrorsChange({[key]: error});
            return error;
        });

        return valid;
    };

    const handleNameFocus = (e: React.FocusEvent<HTMLInputElement>): boolean => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value} as IKeyValuePair<string>;
        return handleValidateNameChange(obj);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value} as IKeyValuePair<string>;
        onNameChange(obj);
        return handleValidateNameChange(obj);
    }

    const handleValidateShippingAddressChange = (obj: IKeyValuePair<string>): boolean => {
        let valid = true;
    
        Object.keys(obj).map((key) => {
            const value = obj[key];
            const error = validateField({key, value});
            if (error) valid = false;
            onErrorsChange({[key]: error});
            return error;
        });

        return valid;
    };

    const handleShippingAddressChange = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value} as IKeyValuePair<string>;
        onAddressChange(obj);
        return handleValidateShippingAddressChange(obj);
    };

    const handleShippingAddressFocus = (e: React.FocusEvent<HTMLInputElement>): boolean => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value} as IKeyValuePair<string>;
        onAddressChange(obj);
        return handleValidateShippingAddressChange(obj);
    };

    return (
        <ListGroup variant="flush" className="py-3">
            <ListGroup.Item>
                <h2 className="py-3">Shipping address</h2>
                <Form>
                    <NameForm className={"my-2"} name={name} onBlur={handleNameFocus} onChange={handleNameChange} errors={errors} />
                    <AddressForm className={"my-2"} address={address} onBlur={handleShippingAddressFocus} onChange={handleShippingAddressChange} errors={errors} onErrorsChange={onErrorsChange} />
                </Form>
            </ListGroup.Item>
        </ListGroup>
    );
};
