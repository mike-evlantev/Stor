import * as React from "react";
import { Form } from "react-bootstrap";

interface StateSelectProps {
    selectedState: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => boolean;
}

const StateSelect = ({ selectedState, onChange, error }: StateSelectProps) => {
  // 50 states +
  // American Samoa (AS)      District of Columbia (DC)     Federated States Of Micronesia (FM)
  // Guam (GU)                Marshall Islands (MH)         Northern Mariana Islands (MP)
  // Palau (PW)               Puerto Rico (PR)              Virgin Islands (VI)
  const stateAbbreviations = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FM",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MH",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PW",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const defaultSelectValue = "Select..."; // used in services/formValidator

  return (
    <>
      <Form.Control
        onBlur={onChange}
        isInvalid={!!error}
        as="select"
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
      </Form.Control>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </>
  );
};

export default StateSelect;