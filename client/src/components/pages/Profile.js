import React, { useState } from "react";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StateSelect from "../StateSelect.js";
import { updateUser } from "../../actions/userActions";
import Loader from "../Loader.js";
import { formValidationService } from "../../services/formValidationService.js";

const Profile = () => {
  const errorsInitialState = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    password: "",
  };

  const dispatch = useDispatch();
  const [errors, setErrors] = useState(errorsInitialState);
  const [formValid, setFormValid] = useState(true);

  const { loggedInUser, loading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(loggedInUser);

  const validateForm = () => {
    let valid = true;

    Object.keys(userData).map((key) => {
      const value = userData[key];
      const error = formValidationService.validateField(key, value);
      setErrors((prevState) => ({
        ...prevState,
        [key]: error,
      }));
      if (error) valid = false;
      return error;
    });

    setFormValid(valid);
    return valid;
  };

  const handleUserChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUser(userData));
  };

  return (
    <Container className="d-flex flex-column py-5">
      {loading ? (
        <Loader />
      ) : (
        <Row className="d-flex justify-content-center p-5">
          <Col md={8}>
            <Form onSubmit={handleUpdateUser}>
              <Form.Row>
                <Form.Group as={Col} lg={5} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder={userData.email}
                    disabled
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    onBlur={validateForm}
                    isInvalid={errors.firstName}
                    name="firstName"
                    placeholder={userData.firstName}
                    onChange={handleUserChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} lg={3} controlId="formGridMiddleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    name="middleName"
                    placeholder={userData.middleName}
                    onChange={handleUserChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    onBlur={validateForm}
                    isInvalid={errors.lastName}
                    name="lastName"
                    placeholder={userData.lastName}
                    onChange={handleUserChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    onBlur={validateForm}
                    isInvalid={errors.address1}
                    name="address1"
                    placeholder={userData.address1}
                    onChange={handleUserChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address1}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} lg={4} controlId="formGridAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    name="address2"
                    onBlur={validateForm}
                    isInvalid={errors.address2}
                    placeholder={userData.address2}
                    onChange={handleUserChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address2}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    onBlur={validateForm}
                    isInvalid={errors.city}
                    name="city"
                    placeholder={userData.city}
                    onChange={handleUserChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} lg={2} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <StateSelect
                    validateForm={validateForm}
                    error={errors.state}
                    selectedState={userData.state}
                    updateProfileState={handleUserChange}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={3} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    onBlur={validateForm}
                    isInvalid={errors.zip}
                    name="zip"
                    placeholder={userData.zip}
                    onChange={handleUserChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.zip}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} lg={5} controlId="formGridPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    onBlur={validateForm}
                    isInvalid={errors.phone}
                    type="tel"
                    name="phone"
                    placeholder={userData.phone}
                    onChange={handleUserChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Button
                type="submit"
                variant="primary"
                className="float-right"
                disabled={!formValid}
              >
                Save
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;
