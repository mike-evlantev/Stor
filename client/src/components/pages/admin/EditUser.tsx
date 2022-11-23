import * as React from "react";
import { Col, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { stateAbbreviations } from "../../../constants/states";
import { getUserById, updateCurrentUser } from "../../../features/admin/adminSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Loader } from "../../shared/Loader";
import StateSelect from "../../shared/StateSelect";
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
        dispatch(updateCurrentUser(obj));
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    };

    const handleSubmit = async () => {
        handleHide();
        console.log("handleSubmit()");
        //dispatch(updateUser(user));
    }

    return <>
        {loading 
            ? <Loader />
            : <div>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={user.email} onChange={handleChange} />
                </Form.Group>
                <div className="d-flex">
                    <Form.Group className="mb-3 w-50">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="first" onChange={handleChange} />
                    </Form.Group>
                    <div className="mx-1"></div>
                    <Form.Group className="mb-3 w-50">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="email" name="last" onChange={handleChange} />
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Form.Group as={Col} lg={6}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            name="address1"
                            value={user.address1}
                            onChange={handleChange} />
                        {/* <Form.Control.Feedback type="invalid">{errors?.address1}</Form.Control.Feedback> */}
                    </Form.Group>
                    <div className="mx-1"></div>
                    <Form.Group as={Col} lg={6}>
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control
                            name="address2"
                            value={user.address2}
                            onChange={handleChange} />
                        {/* <Form.Control.Feedback type="invalid">{errors?.address2}</Form.Control.Feedback> */}
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Form.Group as={Col} lg={4}>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            name="city"
                            value={user.city}
                            onChange={handleChange} />
                        {/* <Form.Control.Feedback type="invalid">{errors?.city}</Form.Control.Feedback> */}
                    </Form.Group>
                    <div className="mx-1"></div>
                    <Form.Group as={Col} lg={4}>
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
                    <div className="mx-1"></div>
                    <Form.Group as={Col} lg={4}>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                            name="zip"
                            value={user.zip}
                            onChange={handleChange} />
                        {/* <Form.Control.Feedback type="invalid">{errors?.zip}</Form.Control.Feedback> */}
                    </Form.Group>
                </div>
                
                {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group> */}
            </div>
        }
        {showModal && <ConfirmationModal onConfirm={handleSubmit} onHide={handleHide} />}
    </>;
}