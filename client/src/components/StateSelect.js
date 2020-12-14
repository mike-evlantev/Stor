import React from "react";
import { Form } from "react-bootstrap";

const StateSelect = ({ onChange }) => {
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

  return (
    <Form.Control as="select" onChange={(e) => onChange(e)} value={-1}>
      <option disabled value={-1} key={-1}>
        State
      </option>
      {stateAbbreviations.map((st, i) => (
        <option key={i} value={st}>
          {st}
        </option>
      ))}
    </Form.Control>
  );
};

export default StateSelect;
