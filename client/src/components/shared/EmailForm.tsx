import * as React from "react";
import { Form } from "react-bootstrap";

interface EmailFormProps {
    label: string;
    email: string;
    error: string;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => boolean;
}

export const EmailForm: React.FC<EmailFormProps> = ({label, email, onBlur, onChange, error}: EmailFormProps) => {
    return <Form.Group>
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Control
            onBlur={onBlur}
            isInvalid={!!error}
            type="email"
            name="email"
            value={email}
            onChange={onChange} />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
}