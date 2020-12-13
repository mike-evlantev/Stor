import React, { useState } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import StateSelect from "../StateSelect.js";

const Profile = () => {
  const [stateAbbr, setStateAbbr] = useState("");

  const handleStateAbbrChange = (e) => {
    setStateAbbr(e.target.value);
  };

  return (
    <Container className="d-flex flex-column py-5">
      <Form>
        <Form.Row>
          <Col sm={4}>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" disabled />
            </Form.Group>
          </Col>
          <Col className="float-right" sm={4}>
            <Form.Group controlId="formGridCity">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" pattern=".{10}" required />
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <StateSelect onChange={handleStateAbbrChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Form.Row></Form.Row>

        <Button className="float-right" variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;
