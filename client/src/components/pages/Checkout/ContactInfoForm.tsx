import * as React from "react";
import { ListGroup } from "react-bootstrap";
import { validateField } from "../../../services/formValidator";
import { IKeyValuePair } from "../../../types/IKeyValuePair";
import { EmailForm } from "../../shared/EmailForm";

interface Props {
  email: string;
  onChange: (email: string) => void;
  error: string;
  handleErrorsChange: (obj: IKeyValuePair<string>) => void;
}

export const ContactInfoForm: React.FC<Props> = ({email, error, onChange, handleErrorsChange}: Props) => {
  const onValidateEmailChange = (email: string): boolean => {
    let valid = true;
    const error = validateField({key: "email", value: email});
    if (error) valid = false;
    handleErrorsChange({email: error});
    return valid;
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
    e.preventDefault();
    const email = e.target.value;
    onChange(email);
    return onValidateEmailChange(email);
  };

  return (
    <ListGroup variant="flush" className="py-1">
      <ListGroup.Item>
        <h2 className="py-3">Contact information</h2>
        <EmailForm label={"Email address for notifications"} email={email} error={error} onChange={onEmailChange} />
      </ListGroup.Item>
    </ListGroup>
  );
};