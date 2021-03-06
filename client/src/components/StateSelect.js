import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Form } from "react-bootstrap";

const StateSelect = ({
  selectedState,
  updateProfileState,
  validateForm,
  error,
}) => {
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

  const [selection, setSelection] = useState();

  const onChange = (e) => {
    e.preventDefault();
    updateProfileState(e);
    setSelection(e.target.value);
  };

  useEffect(() => {
    setSelection(selectedState);
    // eslint-disable-next-line
  }, [selectedState]);

  return (
    <Fragment>
      <Form.Control
        onBlur={validateForm}
        isInvalid={error}
        as="select"
        value={selection}
        name="state"
        onChange={(e) => onChange(e)}
      >
        <option>Select...</option>
        {stateAbbreviations.map((st, i) => (
          <option key={i} value={st}>
            {st}
          </option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Fragment>
  );
};

export default StateSelect;
