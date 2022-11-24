import * as React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { stateAbbreviations } from "../../../constants/states";
import { getUserById, updateCurrentUser, updateUser } from "../../../features/admin/adminSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Loader } from "../../shared/Loader";
import { ConfirmationModal } from "./ConfirmationModal";

interface Params {
    id: string;
}

export const EditUser: React.FC = () => {
    const { id } = useParams<Params>();
    const dispatch = useAppDispatch();
    const { loading, user } = useAppSelector(state => state.admin);

    const [showModal, setShowModal] = React.useState(false);
    const handleShow = () => setShowModal(true);
    const handleHide = () => setShowModal(false);

    React.useEffect(() => {
        dispatch(getUserById(id));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value};
        console.log(obj);
        dispatch(updateCurrentUser(obj));
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    };

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const obj = {[name]: checked};
        console.log(obj);
        dispatch(updateCurrentUser(obj));
    };

    const handleSubmit = async () => {
        handleHide();
        dispatch(updateUser(user));
    }

    return <>
        {loading 
            ? <Loader />
            : <div>
                <Row>
                    <Form.Group className="mb-3" as={Col} lg={6}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control disabled type="email" name="email" value={user.email} onChange={handleChange} />
                    </Form.Group>
                    <Col lg={6} className="d-flex justify-content-evenly align-items-center">
                        <Form.Check
                            type="switch"
                            name="isActive"
                            checked={user.isActive}
                            onChange={handleChecked}
                            label="Active" />
                        <Form.Check
                            type="switch"
                            name="isAdmin"
                            checked={user.isAdmin}
                            onChange={handleChecked}
                            label="Admin" /> 
                    </Col>
                </Row>                
                <Row>
                    <Form.Group as={Col} lg={6} className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="first" value={user.first} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} lg={6} className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="email" name="last" value={user.last} onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            name="address1"
                            value={user.address1}
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} lg={6} className="mb-3">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control
                            name="address2"
                            value={user.address2}
                            onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={4} className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            name="city"
                            value={user.city}
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} lg={4} className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Select
                            value={user.state}
                            name="state"
                            onChange={handleStateChange}
                        >
                            <option>Select...</option>
                            {stateAbbreviations.map((st, i) => (
                            <option key={i} value={st}>
                                {st}
                            </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} lg={4} className="mb-3">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                            name="zip"
                            value={user.zip}
                            onChange={handleChange} />
                    </Form.Group>
                </Row>
                <div className="d-flex">
                    <Button className="ms-auto" onClick={handleShow} disabled={!user.email}>Save</Button>
                </div>
            </div>
        }
        {showModal && <ConfirmationModal onConfirm={handleSubmit} onHide={handleHide} />}
    </>;
}