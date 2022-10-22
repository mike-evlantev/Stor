import * as React from "react";
import { Col, Form } from "react-bootstrap";
import StateSelect from "./StateSelect";
import { IAddress } from "../../types/IAddress";
import { IAddressErrors } from "../../types/IAddressErrors";
import { validateField } from "../../services/formValidator";
import { IKeyValuePair } from "../../types/IKeyValuePair";

interface AddressFormProps {
    address: IAddress;
    errors: IAddressErrors;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => boolean;
    onErrorsChange: (obj: IKeyValuePair<string>) => void;
}

export const AddressForm = ({address, onChange, errors, onErrorsChange}: AddressFormProps) => {
    const onStateChange = (e: React.ChangeEvent<HTMLSelectElement>): boolean => {
        e.preventDefault();
        onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
        return onValidateStateChange(e.target.value);
    };

    const onValidateStateChange = (state: string): boolean => {
        let valid = true;
        const error = validateField({key: "state", value: state});
        if (error) valid = false;
        onErrorsChange({state: error});
        return valid;
      };

    return (
        <>            
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        onBlur={onChange}
                        isInvalid={!!errors?.address1}
                        name="address1"
                        value={address?.address1}
                        onChange={onChange} />
                    <Form.Control.Feedback type="invalid">{errors?.address1}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} lg={4}>
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                        onBlur={onChange}
                        isInvalid={!!errors?.address2}
                        name="address2"
                        value={address?.address2}
                        onChange={onChange} />
                    <Form.Control.Feedback type="invalid">{errors?.address2}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        onBlur={onChange}
                        isInvalid={!!errors?.city}
                        name="city"
                        value={address?.city}
                        onChange={onChange} />
                    <Form.Control.Feedback type="invalid">{errors?.city}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} lg={4}>
                    <Form.Label>State</Form.Label>
                    <StateSelect
                        selectedState={address?.state}
                        onChange={onStateChange}
                        error={errors?.state} />
                </Form.Group>
                <Form.Group as={Col} lg={4}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        onBlur={onChange}
                        isInvalid={!!errors?.zip}
                        name="zip"
                        value={address?.zip}
                        onChange={onChange} />
                    <Form.Control.Feedback type="invalid">{errors?.zip}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
        </>
    );
}