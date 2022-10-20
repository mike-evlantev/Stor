import * as React from "react";
import { Col, Form } from "react-bootstrap"
import { IName } from "../../types/IName";
import { INameErrors } from "../../types/INameErrors";

interface NameFormProps {
    name: IName;
    errors: INameErrors;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => boolean;
}

export const NameForm = ({name, onChange, errors}: NameFormProps) => {
    const {first, last} = name; 
    return <Form.Row>
        <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
                onBlur={onChange}
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
                onBlur={onChange}
                isInvalid={!!errors?.last}
                name="last"
                value={last}
                onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">{errors?.last}</Form.Control.Feedback>
        </Form.Group>
    </Form.Row>
}