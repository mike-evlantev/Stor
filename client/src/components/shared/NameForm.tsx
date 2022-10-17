import * as React from "react";
import { Col, Form } from "react-bootstrap"
import { Name } from "../../types/Name";
import { NameErrors } from "../../types/NameErrors";

interface NameFormProps {
    name: Name;
    errors: NameErrors;
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
                placeholder={last}
                onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">{errors?.last}</Form.Control.Feedback>
        </Form.Group>
    </Form.Row>
}