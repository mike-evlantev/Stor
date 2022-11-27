import * as React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { stateAbbreviations } from "../../../constants/states";
import { IUser } from "../../../types/IUser";

interface Props {
    user: IUser;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onStateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
}

export const UserForm: React.FC<Props> = ({user, onChange, onStateChange, onChecked, onSave}) => {
    return(
        <>
            <Row>
                <Form.Group className="mb-3" as={Col} lg={6}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control disabled={!!user.id} type="email" name="email" value={user.email || ""} onChange={onChange} />
                </Form.Group>
                <Col lg={6} className="d-flex justify-content-evenly align-items-center">
                    <Form.Check
                        type="switch"
                        name="isActive"
                        checked={user.isActive}
                        onChange={onChecked}
                        label="Active" />
                    <Form.Check
                        type="switch"
                        name="isAdmin"
                        checked={user.isAdmin}
                        onChange={onChecked}
                        label="Admin" /> 
                </Col>
            </Row>                
            <Row>
                <Form.Group as={Col} lg={6} className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first" value={user.first || ""} onChange={onChange} />
                </Form.Group>
                <Form.Group as={Col} lg={6} className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="email" name="last" value={user.last || ""} onChange={onChange} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} lg={6} className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        name="address1"
                        value={user.address1 || ""}
                        onChange={onChange} />
                </Form.Group>
                <Form.Group as={Col} lg={6} className="mb-3">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                        name="address2"
                        value={user.address2 || ""}
                        onChange={onChange} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} lg={4} className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        name="city"
                        value={user.city || ""}
                        onChange={onChange} />
                </Form.Group>
                <Form.Group as={Col} lg={4} className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Select
                        value={user.state || ""}
                        name="state"
                        onChange={onStateChange}
                    >
                        <option>Select...</option>
                        {stateAbbreviations.map((st, i) => (
                        <option key={i} value={st || ""}>
                            {st}
                        </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} lg={4} className="mb-3">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        name="zip"
                        value={user.zip || ""}
                        onChange={onChange} />
                </Form.Group>
            </Row>
            <div className="d-flex">
                <Button className="ms-auto" onClick={onSave} disabled={!user.email}>Save</Button>
            </div>
        </>
    );
}