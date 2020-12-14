import React, { useState, useEffect } from "react";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StateSelect from "../StateSelect.js";
import { getProfile, updateProfile } from "../../actions/userActions";
import Message from "../Message.js";
import Loader from "../Loader.js";

const Profile = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile(loggedInUser._id));

    // eslint-disable-next-line
  }, []);

  const { userProfile, getProfileLoading, getProfileError } = useSelector(
    (state) => state.getProfile
  );
  console.log(userProfile);

  const updateProfileState = useSelector((state) => state.updateProfile);
  const {
    updateProfileLoading,
    updateProfileSuccess,
    updateProfileError,
  } = updateProfileState;

  const [profile, setProfile] = useState(userProfile);
  console.log(profile);

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
                    value={profile.email}
                    placeholder="Email"
                    disabled
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    placeholder="First Name"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={3} controlId="formGridMiddleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    name="middleName"
                    placeholder="Middle Name"
                    value={profile.middleName}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    placeholder="Last Name"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address1"
                    placeholder="Address"
                    value={profile.address1}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={4} controlId="formGridAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    name="address2"
                    placeholder="Apt, Ste, Unit"
                    value={profile.address2}
                    onChange={handleProfileChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    placeholder="City"
                    value={profile.city}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={2} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <StateSelect
                    name="state"
                    value={profile.state}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={3} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    name="zip"
                    placeholder="Zip"
                    value={profile.zip}
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
                    placeholder="(000) 000-000"
                    value={profile.phone}
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
