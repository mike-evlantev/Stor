import * as React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { alert } from "../../features/messages/messagesSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { validateField } from "../../services/formValidator";
import { IAddress } from "../../types/IAddress";
import { IKeyValuePair } from "../../types/IKeyValuePair";
import { IName } from "../../types/IName";
import { IUser } from "../../types/IUser";
import { AddressForm } from "../shared/AddressForm";
import { Loader } from "../shared/Loader";
import { NameForm } from "../shared/NameForm";

export const Profile: React.FC = () => {
    const errorsInitialState = {
      first: "",
      last: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
      password: "",
    };
  
    const dispatch = useAppDispatch();
    const [errors, setErrors] = React.useState(errorsInitialState);
    const [formValid, setFormValid] = React.useState(true);
  
    const { loggedInUser, loading } = useAppSelector((state: any) => state.auth);
    const [userData, setUserData] = React.useState<IUser>(loggedInUser);
    // const name: IName = userData;
    // const address: IAddress = userData;
  
    const validateForm = () => {
      let valid = true;
  
      Object.keys(userData).map((key) => {
        const value = userData[key as keyof IUser] as string;
        const error = validateField({key, value});
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
  
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const { name, value } = e.target;
  
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      return true;
    };

    const handleUserFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.preventDefault();
      const { name, value } = e.target;
  
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      return true;
    };
  
    const handleSubmit = () => {
      //dispatch(updateUser(userData));
      dispatch(alert({text: "Submit method not yet implemented", type: "danger"}));
    };

    const handleErrorsChange = (obj: IKeyValuePair<string>) => {
      setErrors(prev => ({...prev, ...obj}));
  }
  
    return (
      <Container className="d-flex flex-column py-5">
        {loading ? (
          <Loader />
        ) : (
          <Row className="d-flex justify-content-center p-5">
            <Col md={8}>
              <div>
                <Form as={Row} className="my-2">
                  <Form.Group as={Col} lg={5}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder={userData.email}
                      disabled
                    />
                  </Form.Group>
                </Form>
                <NameForm className={"my-2"} name={{} as IName} onBlur={handleUserFocus} onChange={handleUserChange} errors={errors} />
                <AddressForm className={"my-2"} address={{} as IAddress} onBlur={handleUserFocus} onChange={handleUserChange} errors={errors} onErrorsChange={handleErrorsChange} /> 
                <Button
                  type="submit"
                  variant="primary"
                  className="float-end my-4"
                  disabled={!formValid}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    );
  };