import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader.js";
import { login, register } from "../../actions/userActions";
import { formValidationService } from "../../services/formValidationService.js";

const SignIn = ({ history, location }) => {
  const errorsInitialState = {
    loginEmail: "",
    loginPassword: "",
    registerEmail: "",
    registerPassword: "",
  };

  const [errors, setErrors] = useState(errorsInitialState);
  const [loginFormValid, setLoginFormValid] = useState(true);
  const [registerFormValid, setRegisterFormValid] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
  const [emailSignUp, setEmailSignUp] = useState(false);

  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const validateLoginForm = () => {
    let valid = true;

    const loginEmailError = formValidationService.validateEmail(loginEmail);
    setErrors((prevState) => ({
      ...prevState,
      loginEmail: loginEmailError,
    }));
    if (loginEmailError) valid = false;
    setLoginFormValid(valid);
    return valid;
  };

  const validateRegisterForm = () => {
    let valid = true;

    const registerEmailError = formValidationService.validateEmail(
      registerEmail
    );
    setErrors((prevState) => ({
      ...prevState,
      registerEmail: registerEmailError,
    }));
    if (registerEmailError) valid = false;

    const registerPasswordError = formValidationService.validatePassword(
      registerPassword
    );
    setErrors((prevState) => ({
      ...prevState,
      registerPassword: registerPasswordError,
    }));
    if (registerPasswordError) valid = false;

    setRegisterFormValid(valid);
    return valid;
  };

  const handleLogin = (e) => {
    e.preventDefault(); // prevent refresh
    dispatch(login(loginEmail, loginPassword));
  };
  const handleRegister = (e) => {
    e.preventDefault(); // prevent refresh
    dispatch(register(registerEmail, registerPassword));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
    // eslint-disable-next-line
  }, [history, isAuthenticated, redirect]);

  return (
    <Container className="d-flex flex-column py-5">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/*This row is only visible on screens lg and larger*/}
          <div className="d-none d-lg-block">
            <Row className="d-flex justify-content-center pt-5">
              <div className="text-center">
                <h1>Don't have an account yet?</h1>
                <h4>Here are some perks:</h4>
              </div>
            </Row>
            <Row className="d-flex justify-content-around pt-4">
              <div className="text-center">
                <p>
                  <i className="fas fa-search-location fa-3x"></i>
                </p>
                <p>Track Orders</p>
              </div>
              <div className="text-center">
                <p>
                  <i className="far fa-heart fa-3x"></i>
                </p>
                <p>Favorite Items</p>
              </div>
              <div className="text-center">
                <p>
                  <i className="far fa-comment fa-3x"></i>
                </p>
                <p>Review Products</p>
              </div>
              <div className="text-center">
                <p>
                  <i className="fas fa-stopwatch fa-3x"></i>
                </p>
                <p>Check Out Faster</p>
              </div>
              <div className="text-center">
                <p>
                  <i className="far fa-smile fa-3x"></i>
                </p>
                <p>Tailored Suggestions</p>
              </div>
            </Row>
            <hr />
          </div>
          <Row className="d-flex justify-content-around p-5">
            <Col lg={6} className="px-5">
              <h4 className="pb-3">Sign in to your account</h4>
              <Form onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Control
                    onBlur={validateLoginForm}
                    isInvalid={errors.loginEmail}
                    type="email"
                    placeholder="Email Address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.loginEmail}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="btn btn-block"
                  disabled={loading || !loginFormValid}
                >
                  Sign In
                </Button>
                <Form.Text className="text-muted">
                  By continuing, you agree to our{" "}
                  <Link to="/privacy">privacy policy</Link> and{" "}
                  <Link to="/terms">terms of use</Link>.
                </Form.Text>
              </Form>
            </Col>
            <Col lg={6} className="px-5">
              <h4 className="pb-3">Create a new account</h4>
              <Form onSubmit={handleRegister}>
                <Form.Group>
                  <Form.Control
                    onBlur={validateRegisterForm}
                    isInvalid={errors.registerEmail}
                    type="email"
                    placeholder="Email Address"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.registerEmail}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <InputGroup>
                    <Form.Control
                      onBlur={validateRegisterForm}
                      isInvalid={errors.registerPassword}
                      type={registerPasswordVisible ? "text" : "password"}
                      placeholder="Password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    <InputGroup.Append>
                      {/* key is necessary on parent element to be able to re-render child element: 
                    in this case, the eye (slash/no slash) icon inside the button
                    https://reactjs.org/docs/reconciliation.html */}
                      <Button
                        key={registerPasswordVisible}
                        type="button"
                        variant="outline-secondary"
                        onClick={() =>
                          setRegisterPasswordVisible(!registerPasswordVisible)
                        }
                      >
                        <i
                          className={
                            registerPasswordVisible
                              ? "fas fa-eye-slash"
                              : "fas fa-eye"
                          }
                        ></i>
                      </Button>
                    </InputGroup.Append>
                    <Form.Control.Feedback type="invalid">
                      {errors.registerPassword}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Sign me up for Stor emails (unsubscribe at any time)"
                    checked={emailSignUp}
                    onChange={() => setEmailSignUp(!emailSignUp)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="btn btn-block"
                  disabled={loading || !registerFormValid}
                >
                  Create Account
                </Button>
                <Form.Text className="text-muted">
                  By continuing, you agree to our{" "}
                  <Link to="/privacy">privacy policy</Link> and{" "}
                  <Link to="/terms">terms of use</Link>.
                </Form.Text>
              </Form>
            </Col>
          </Row>
        </Fragment>
      )}
    </Container>
  );
};

export default SignIn;
