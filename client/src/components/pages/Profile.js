import React, { useState, useEffect } from "react";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StateSelect from "../StateSelect.js";
import { getProfile, updateProfile } from "../../actions/userActions";
import Message from "../Message.js";
import Loader from "../Loader.js";
import { formValidationService } from "../../services/formValidationService.js";

const Profile = ({ loggedInUser }) => {
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
  // const [updatedProfile, setUpdatedProfile] = useState({});
  const [profile, setProfile] = useState(loggedInUser);

  //const { loggedInUser } = useSelector((state) => state.auth);
  // const { userProfile, getProfileLoading, getProfileError } = useSelector(
  //   (state) => state.getProfile
  // );
  const updateProfileState = useSelector((state) => state.updateProfile);
  const {
    updateProfileLoading,
    updateProfileSuccess,
    updateProfileError,
  } = updateProfileState;

  // useEffect(() => {
  //   dispatch(getProfile(loggedInUser._id));
  //   setUpdatedProfile(userProfile);
  //   // eslint-disable-next-line
  // }, []);

  const validateForm = () => {
    let valid = true;
    // const {
    //   firstName,
    //   lastName,
    //   address1,
    //   address2,
    //   city,
    //   state,
    //   zip,
    //   phone,
    // } = userProfile;

    Object.keys(profile).map((key) => {
      const value = profile[key];
      const error = formValidationService.validateField(key, value);
      setErrors((prevState) => ({
        ...prevState,
        [key]: error,
      }));
      if (error) valid = false;
      return error;
    });

    // const firstNameError = formValidationService.validateFirstName(firstName);
    // setErrors((prevState) => ({
    //   ...prevState,
    //   firstName: firstNameError,
    // }));
    // if (firstNameError) valid = false;

    // const lastNameError = formValidationService.validateLastName(lastName);
    // setErrors((prevState) => ({
    //   ...prevState,
    //   lastName: lastNameError,
    // }));
    // if (lastNameError) valid = false;

    // const address1Error = formValidationService.validateAddress1(address1);
    // setErrors((prevState) => ({
    //   ...prevState,
    //   address1: address1Error,
    // }));
    // if (address1Error) valid = false;

    // const address2Error = formValidationService.validateAddress2(address2);
    // setErrors((prevState) => ({
    //   ...prevState,
    //   address2: address2Error,
    // }));
    // if (address2Error) valid = false;

    // const cityError = formValidationService.validateCity(city);
    // setErrors((prevState) => ({
    //   ...prevState,
    //   city: cityError,
    // }));
    // if (cityError) valid = false;

    // const stateError = formValidationService.validateState(state);
    // setErrors((prevState) => ({
    //   ...prevState,
    //   state: stateError,
    // }));
    // if (stateError) valid = false;

    // const zipError = formValidationService.validateZip(zip);
    // setErrors((prevState) => ({
    //   ...prevState,
    //   zip: zipError,
    // }));
    // if (zipError) valid = false;

    // const emailError = formValidationService.validatePhone(phone);
    // setErrors((prevState) => ({
    //   ...prevState,
    //   email: emailError,
    // }));
    // if (emailError) valid = false;

    setFormValid(valid);
    return valid;
  };

  const handleProfileChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profile));
  };

  return (
    <Container className="d-flex flex-column py-5">
      {/* TODO: move Message to app level */}
      {updateProfileError && (
        <Message variant="danger">{updateProfileError}</Message>
      )}
      {updateProfileSuccess && (
        <Message variant="success">Profile updated successfully</Message>
      )}
      {/* TODO: move Loader to app level */}
      {updateProfileLoading && <Loader />}
      {!updateProfileLoading && (
        <Row className="d-flex justify-content-center p-5">
          <Col md={8}>
            <Form onSubmit={handleUpdateProfile}>
              <Form.Row>
                <Form.Group as={Col} lg={5} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder={profile.email}
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
                    placeholder={profile.firstName}
                    onChange={handleProfileChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} lg={3} controlId="formGridMiddleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    name="middleName"
                    placeholder={profile.middleName}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    onBlur={validateForm}
                    isInvalid={errors.lastName}
                    name="lastName"
                    placeholder={profile.lastName}
                    onChange={handleProfileChange}
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
                    placeholder={profile.address1}
                    onChange={handleProfileChange}
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
                    placeholder={profile.address2}
                    onChange={handleProfileChange}
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
                    placeholder={profile.city}
                    onChange={handleProfileChange}
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
                    selectedState={profile.state}
                    updateProfileState={handleProfileChange}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={3} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    onBlur={validateForm}
                    isInvalid={errors.zip}
                    name="zip"
                    placeholder={profile.zip}
                    onChange={handleProfileChange}
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
                    placeholder={profile.phone}
                    onChange={handleProfileChange}
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
