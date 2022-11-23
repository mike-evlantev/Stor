import * as React from "react";
import { Form } from "react-bootstrap";
import { stateAbbreviations } from "../../constants/states";

interface StateSelectProps {
    selectedState: string;
    error?: string;
    onBlur: (e: React.FocusEvent<HTMLSelectElement>) => boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => boolean;
}

const StateSelect: React.FC<StateSelectProps> = ({ selectedState, onBlur, onChange, error }) => {
  
  const defaultSelectValue = "Select..."; // used in services/formValidator

  return (
    <>
      <Form.Select 
        onBlur={onBlur}
        isInvalid={!!error}
        value={selectedState}
        name="state"
        onChange={onChange}
      >
        <option>{defaultSelectValue}</option>
        {stateAbbreviations.map((st, i) => (
          <option key={i} value={st}>
            {st}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </>
  );
};

export default StateSelect;