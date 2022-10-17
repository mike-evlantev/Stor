import * as React from "react";
import { Col, Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer, updateCustomerError } from "../../../actions/userActions";
import { KeyValuePair } from "../../../types/KeyValuePair";
import { AddressForm } from "../../shared/AddressForm";
import { NameForm } from "../../shared/NameForm";
import { validateField } from "../../../services/formValidator";
import { AddressErrors } from "../../../types/AddressErrors";
import { NameErrors } from "../../../types/NameErrors";
import StateSelect from "../../shared/StateSelect";
import { Address } from "../../../types/Address";
import { Name } from "../../../types/Name";

interface Props {
    errors: AddressErrors & NameErrors;
    handleErrorsChange: (errors: KeyValuePair<string>) => void;
    name: Name;
    handleNameChange: (name: KeyValuePair<string>) => void;
    address: Address;
    handleAddressChange: (adderss: KeyValuePair<string>) => void;
}

export const ShippingAddressForm: React.FC<Props> = ({errors, handleErrorsChange, name, handleNameChange, address, handleAddressChange}: Props) => {
    const onValidateNameChange = (obj: KeyValuePair<string>): boolean => {
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
        const obj = {[name]: value} as KeyValuePair<string>;
        handleNameChange(obj);
        return onValidateNameChange(obj);
    }

    const onValidateShippingAddressChange = (obj: KeyValuePair<string>): boolean => {
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
        const obj = {[name]: value} as KeyValuePair<string>;
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
