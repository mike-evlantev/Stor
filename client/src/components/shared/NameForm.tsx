import * as React from "react";
import { Col, Form, Row } from "react-bootstrap"
import { IName } from "../../types/IName";
import { INameErrors } from "../../types/INameErrors";

interface NameFormProps {
    name: IName;
    errors: INameErrors;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => boolean;
}

export const NameForm: React.FC<NameFormProps & React.HTMLAttributes<HTMLDivElement>> = ({name, onBlur, onChange, errors, ...props}) => {
    const {className} = props;
    const {first, last} = name; 
    return <Form as={Row} className={className}>
        <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
                onBlur={onBlur}
                isInvalid={!!errors?.first}
                name="first"
                value={first}
                onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">{errors?.first}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
                onBlur={onBlur}
                isInvalid={!!errors?.last}
                name="last"
                value={last}
                onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">{errors?.last}</Form.Control.Feedback>
        </Form.Group>
    </Form>
}