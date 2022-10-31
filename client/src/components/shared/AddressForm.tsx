import * as React from "react";
import { Col, Form, Row } from "react-bootstrap";
import StateSelect from "./StateSelect";
import { IAddress } from "../../types/IAddress";
import { IAddressErrors } from "../../types/IAddressErrors";
import { validateField } from "../../services/formValidator";
import { IKeyValuePair } from "../../types/IKeyValuePair";

interface AddressFormProps {
    address: IAddress;
    errors: IAddressErrors;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => boolean;
    onErrorsChange: (obj: IKeyValuePair<string>) => void;
}

export const AddressForm: React.FC<AddressFormProps & React.HTMLAttributes<HTMLDivElement>> = ({address, onBlur, onChange, errors, onErrorsChange, ...props}) => {
    const {className} = props;
    const handleStateFocus = (e: React.FocusEvent<HTMLSelectElement>): boolean => {
        e.preventDefault();
        return handleValidateStateChange(e.target.value);
    };
    
    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>): boolean => {
        e.preventDefault();
        onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
        return handleValidateStateChange(e.target.value);
    };

    const handleValidateStateChange = (state: string): boolean => {
        let valid = true;
        const error = validateField({key: "state", value: state});
        if (error) valid = false;
        onErrorsChange({state: error});
        return valid;
      };

    return (
        <>            
            <Form as={Row} className={className}>
                <Form.Group as={Col}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        onBlur={onBlur}
                        isInvalid={!!errors?.address1}
                        name="address1"
                        value={address?.address1}
                        onChange={onChange} />
                    <Form.Control.Feedback type="invalid">{errors?.address1}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} lg={4}>
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                        onBlur={onBlur}
                        isInvalid={!!errors?.address2}
                        name="address2"
                        value={address?.address2}
                        onChange={onChange} />
                    <Form.Control.Feedback type="invalid">{errors?.address2}</Form.Control.Feedback>
                </Form.Group>
            </Form>
            <Form as={Row} className={className}>
                <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        onBlur={onBlur}
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
                        onBlur={handleStateFocus}
                        onChange={handleStateChange}
                        error={errors?.state} />
                </Form.Group>
                <Form.Group as={Col} lg={4}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        onBlur={onBlur}
                        isInvalid={!!errors?.zip}
                        name="zip"
                        value={address?.zip}
                        onChange={onChange} />
                    <Form.Control.Feedback type="invalid">{errors?.zip}</Form.Control.Feedback>
                </Form.Group>
            </Form>
        </>
    );
}