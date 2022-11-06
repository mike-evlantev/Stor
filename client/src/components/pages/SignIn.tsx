import * as React from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { validateEmail, validatePassword } from "../../services/formValidator";
import { Loader } from "../shared/Loader";
import { register, login } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IUser } from "../../types/IUser";

export const SignIn: React.FC = () => {
    const errorsInitialState = {
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerPassword: "",
    };
  
    const [errors, setErrors] = React.useState(errorsInitialState);
    const [loginFormValid, setLoginFormValid] = React.useState(true);
    const [registerFormValid, setRegisterFormValid] = React.useState(true);
  
    const [loginEmail, setLoginEmail] = React.useState("");
    const [loginPassword, setLoginPassword] = React.useState("");
  
    const [registerEmail, setRegisterEmail] = React.useState("");
    const [registerPassword, setRegisterPassword] = React.useState("");
    const [registerPasswordVisible, setRegisterPasswordVisible] = React.useState(false);
    const [emailSignUp, setEmailSignUp] = React.useState(false);
  
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation();
  
    const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  
    const redirect = location.search ? location.search.split("=")[1] : "/";
  
    const validateLoginForm = () => {
      let valid = true;
  
      const loginEmailError = validateEmail(loginEmail);
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
  
      const registerEmailError = validateEmail(
        registerEmail
      );
      setErrors((prevState) => ({
        ...prevState,
        registerEmail: registerEmailError,
      }));
      if (registerEmailError) valid = false;
  
      const registerPasswordError = validatePassword(
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
  
    const handleLogin = () => {
      dispatch(login({email: loginEmail, password: loginPassword} as IUser));
    };
    const handleRegister = () => {
      dispatch(register({email: registerEmail, password: registerPassword} as IUser));
    };
  
    React.useEffect(() => {
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
          <>
            {/*This row is only visible on screens lg and larger*/}
            <div className="d-none d-lg-block">
              <Row className="d-flex justify-content-center pt-5">
                <div className="text-center">
                  <h1>Don't have an account yet?</h1>
                  <h4>Here are some perks:</h4>
                </div>
              </Row>
              <div className="d-flex flex-row justify-content-around pt-4">
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
              </div>
              <hr />
            </div>
            <Row className="d-flex justify-content-around p-5">
              <Col lg={6} className="px-5">
                <h4 className="pb-3">Sign in to your account</h4>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="my-2">
                    <Form.Control
                      onBlur={validateLoginForm}
                      isInvalid={!!errors.loginEmail}
                      type="email"
                      placeholder="Email Address"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.loginEmail}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="my-2">
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
                    className="w-100 mt-4"
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
                  <Form.Group className="my-2">
                    <Form.Control
                      onBlur={validateRegisterForm}
                      isInvalid={!!errors.registerEmail}
                      type="email"
                      placeholder="Email Address"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.registerEmail}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="my-2">
                    <InputGroup>
                      <Form.Control
                        onBlur={validateRegisterForm}
                        isInvalid={!!errors.registerPassword}
                        type={registerPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline-secondary"
                        style={{borderTopRightRadius: "0.375rem", borderBottomRightRadius: "0.375rem", borderLeftStyle: "none"}}
                        onClick={() => setRegisterPasswordVisible(!registerPasswordVisible)}>
                        <i className={registerPasswordVisible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                      </Button>                    
                      <Form.Control.Feedback type="invalid">
                        {errors.registerPassword}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="my-2" controlId="formBasicCheckbox">
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
                    className="w-100 mt-4"
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
          </>
        )}
      </Container>
    );
  };