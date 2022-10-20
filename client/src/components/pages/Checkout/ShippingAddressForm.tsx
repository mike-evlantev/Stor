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
    handleErrorsChange: (errors: IKeyValuePair<string>) => void;
    name: IName;
    handleNameChange: (name: IKeyValuePair<string>) => void;
    address: IAddress;
    handleAddressChange: (adderss: IKeyValuePair<string>) => void;
}

export const ShippingAddressForm: React.FC<Props> = ({errors, handleErrorsChange, name, handleNameChange, address, handleAddressChange}: Props) => {
    const onValidateNameChange = (obj: IKeyValuePair<string>): boolean => {
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

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value} as IKeyValuePair<string>;
        handleNameChange(obj);
        return onValidateNameChange(obj);
    }

    const onValidateShippingAddressChange = (obj: IKeyValuePair<string>): boolean => {
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

    const onShippingAddressChange = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value} as IKeyValuePair<string>;
        handleAddressChange(obj);
        return onValidateShippingAddressChange(obj);
    };

    return (
        <ListGroup variant="flush" className="py-1">
            <ListGroup.Item>
                <h2 className="py-3">Shipping address</h2>
                <Form>
                    <NameForm name={name} onChange={onNameChange} errors={errors} />
                    <AddressForm address={address} onChange={onShippingAddressChange} errors={errors} handleErrorsChange={handleErrorsChange} />
                </Form>
            </ListGroup.Item>
        </ListGroup>
    );
};
