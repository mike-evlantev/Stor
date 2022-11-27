import * as React from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { resetPassword } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { validatePassword } from "../../services/formValidator";
import { Loader } from "../shared/Loader";

interface Params {
    token: string;
}

export const ResetPassword: React.FC = () => {
    const errorsInitialState = {
        password1: "",
        password2: ""
    };
    
    const { token } = useParams<Params>();
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
    const [errors, setErrors] = React.useState(errorsInitialState);
    const [password1, setPassword1] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [password1Visible, setPassword1Visible] = React.useState(false);
    const [password2Visible, setPassword2Visible] = React.useState(false);
    const [formValid, setFormValid] = React.useState(false);

    const validatePassword1 = (input: string) => {
        let valid = true;

        const password1Error = validatePassword(input);
        setErrors((prevState) => ({
            ...prevState,
            password1: password1Error,
        }));
        if (password1Error) valid = false;

        setFormValid(valid);
        return valid;
    };

    const validatePassword2 = (input: string) => {
        let valid = true;

        const passwordsMatch = password1 === input;
        if (passwordsMatch) {
            const password2Error = validatePassword(input);
            if (password2Error) {
                valid = false;
            }

            setErrors((prevState) => ({
                ...prevState,
                password2: password2Error,
            }));
        } else {
            valid = false;
            setErrors((prevState) => ({
                ...prevState,
                password2: "Passwords do not match",
            }));
        }        

        setFormValid(valid);
        return valid;
    };

    const handleChangePassword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const input = e.target.value;
        validatePassword1(input);
        setPassword1(input);
    }

    const handleChangePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const input = e.target.value;
        validatePassword2(input);
        setPassword2(input);
    }

    const handleResetPassword = async () => {
        dispatch(resetPassword({ token, password: password2 }));
        if (isAuthenticated) {
            history.push("/profile");
        }
    }

    return(<>
        {loading 
            ? <Loader />
            : <div className="d-flex justify-content-center w-100">
            <Col md={4}></Col>
            <Col md={4}>
                <Form.Group className="my-2">
                    <InputGroup>
                        <Form.Control
                            isInvalid={!!errors.password1}
                            type={password1Visible ? "text" : "password"}
                            placeholder="Password"
                            value={password1}
                            onChange={handleChangePassword1} />
                        <Button
                            type="button"
                            variant="outline-secondary"
                            style={{borderTopRightRadius: "0.375rem", borderBottomRightRadius: "0.375rem", borderLeftStyle: "none"}}
                            onClick={() => setPassword1Visible(!password1Visible)}>
                            <i className={password1Visible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                        </Button>                    
                        <Form.Control.Feedback type="invalid">{errors.password1}</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="my-2">
                    <InputGroup>
                        <Form.Control
                            isInvalid={!!errors.password2}
                            type={password2Visible ? "text" : "password"}
                            placeholder="Repeat Password"
                            value={password2}
                            onChange={handleChangePassword2} />
                        <Button
                            type="button"
                            variant="outline-secondary"
                            style={{borderTopRightRadius: "0.375rem", borderBottomRightRadius: "0.375rem", borderLeftStyle: "none"}}
                            onClick={() => setPassword2Visible(!password2Visible)}>
                            <i className={password2Visible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                        </Button>                    
                        <Form.Control.Feedback type="invalid">{errors.password2}</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Button
                    variant="primary"
                    className="w-100 mt-4"
                    disabled={!formValid}
                    onClick={handleResetPassword}>
                    Reset Password
                </Button>
            </Col>
            <Col md={4}></Col>
        </div>}
    </>);
}