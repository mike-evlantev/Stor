import React, { useState, useEffect } from "react";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StateSelect from "../StateSelect.js";
import { getProfile, updateProfile } from "../../actions/userActions";
import Message from "../Message.js";
import Loader from "../Loader.js";

const Profile = () => {
  const dispatch = useDispatch();
  const [updatedProfile, setUpdatedProfile] = useState({});
  const { loggedInUser } = useSelector((state) => state.auth);

  const { userProfile, getProfileLoading, getProfileError } = useSelector(
    (state) => state.getProfile
  );

  const updateProfileState = useSelector((state) => state.updateProfile);
  const {
    updateProfileLoading,
    updateProfileSuccess,
    updateProfileError,
  } = updateProfileState;

  useEffect(() => {
    dispatch(getProfile(loggedInUser._id));
    setUpdatedProfile(userProfile);
    // eslint-disable-next-line
  }, []);

  const handleProfileChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUpdatedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile(updatedProfile));
  };

  return (
    <Container className="d-flex flex-column py-5">
      {getProfileError && <Message variant="danger">{getProfileError}</Message>}
      {updateProfileError && (
        <Message variant="danger">{updateProfileError}</Message>
      )}
      {updateProfileSuccess && (
        <Message variant="success">Profile updated successfully</Message>
      )}
      {(getProfileLoading || updateProfileLoading) && <Loader />}
      {!getProfileLoading && !updateProfileLoading && (
        <Row className="d-flex justify-content-center p-5">
          <Col md={8}>
            <Form onSubmit={handleUpdateProfile}>
              <Form.Row>
                <Form.Group as={Col} lg={5} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder={userProfile.email}
                    disabled
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    placeholder={userProfile.firstName}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={3} controlId="formGridMiddleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    name="middleName"
                    placeholder={userProfile.middleName}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    placeholder={userProfile.lastName}
                    onChange={handleProfileChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address1"
                    placeholder={userProfile.address1}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={4} controlId="formGridAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    name="address2"
                    placeholder={userProfile.address2}
                    onChange={handleProfileChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    placeholder={userProfile.city}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={2} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <StateSelect updateProfileState={handleProfileChange} />
                </Form.Group>

                <Form.Group as={Col} lg={3} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    name="zip"
                    placeholder={userProfile.zip}
                    onChange={handleProfileChange}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} lg={5} controlId="formGridPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder={userProfile.phone}
                    onChange={handleProfileChange}
                  />
                </Form.Group>
              </Form.Row>

              <Button type="submit" variant="primary" className="float-right">
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
