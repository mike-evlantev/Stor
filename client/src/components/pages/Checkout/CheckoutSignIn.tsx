import * as React from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { login } from "../../../features/auth/authSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IUser } from "../../../types/IUser";

export const CheckoutSignIn: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading: authLoading } = useAppSelector((state) => state.auth);
    const [loginEmail, setLoginEmail] = React.useState("");
    const [loginPassword, setLoginPassword] = React.useState("");
    const [signInVisible, setSignInVisible] = React.useState(false);

    const handleLogin = () => {
        dispatch(login({email: loginEmail, password: loginPassword} as IUser));
    };

    return (
        <ListGroup variant="flush" className="py-1">
            <ListGroup.Item>
            <h2 className="py-3">Already have an account?</h2>
            <p onClick={() => setSignInVisible(!signInVisible)}>
                <u>Sign in</u> for quick and easy checkout&nbsp;&nbsp;
                <i className={signInVisible ? "fas fa-chevron-up fa-lg" : "fas fa-chevron-down fa-lg"}></i>
            </p>
            {signInVisible && (
                <div>
                    <hr />
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="my-4">
                            <Form as={Row}>
                                <Col>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email Address"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)} />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </Col>
                            </Form>
                        </Form.Group>
                        <Button variant="dark" type="submit" className="btn btn-block" disabled={authLoading}>
                            Sign In
                        </Button>
                    </Form>
                </div>
            )}
            </ListGroup.Item>
        </ListGroup>
    );
}