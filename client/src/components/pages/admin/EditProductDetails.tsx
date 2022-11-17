import * as React from "react";
import { Button, Form, Image, InputGroup, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { updateCurrentProduct, updateProduct } from "../../../features/admin/adminSlice";
import { getProductById } from "../../../features/products/productsSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IKeyValuePair } from "../../../types/IKeyValuePair";
import { Loader } from "../../shared/Loader";

interface Params {
    id: string;
}

export const EditProductDetails: React.FC = () => {
    const { id } = useParams<Params>();
    const dispatch = useAppDispatch();
    const { loading, product } = useAppSelector(state => state.admin);

    const [showModal, setShowModal] = React.useState(false);
    const handleShow = () => setShowModal(true);
    const handleHide = () => setShowModal(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value} as IKeyValuePair<string>;

        dispatch(updateCurrentProduct(obj));
    };

    const handleSubmit = async () => {
        handleHide();
        dispatch(updateProduct(product));
    }

    React.useEffect(() => {
        dispatch(getProductById(id));
    }, []);

    return (
        <>
            {loading 
                ? <Loader />
                : <div className="d-flex flex-column">
                    <Image src={product.image} alt={product.name} width={250} fluid />
                    <Form.Group className="my-3">
                        <Form.Control type="file" multiple />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={handleChange} placeholder="Description" />
                    </Form.Group>
                    <div className="d-flex">
                        <Form.Group className="mb-3 w-50">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" />
                        </Form.Group>
                        <div className="mx-1"></div>
                        <Form.Group className="mb-3 w-50">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" name="brand" value={product.brand} onChange={handleChange} placeholder="Brand" />
                        </Form.Group>
                    </div>
                    <div className="d-flex">
                        <div className="d-flex flex-column w-50">
                            <Form.Label>Price</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control name="price" value={product.price} onChange={handleChange} placeholder="Price" />
                            </InputGroup>
                        </div>
                        <div className="mx-1"></div>
                        <Form.Group className="mb-3 w-50">
                            <Form.Label>In Stock</Form.Label>
                            <Form.Control type="text" name="countInStock" value={product.countInStock} onChange={handleChange} placeholder="Quantity in stock" />
                        </Form.Group>
                    </div>
                    <div className="d-flex">
                        <Button className="ms-auto" onClick={handleShow}>Save</Button>
                    </div>
                </div>
            }
            {showModal && <ConfirmationModal onConfirm={handleSubmit} onHide={handleHide} />}
        </>
    );
};

interface ModalProps {
    onHide: () => void;
    onConfirm: () => void;
}

const ConfirmationModal: React.FC<ModalProps> = ({onConfirm, onHide}) => {
    return (
        <Modal show size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>You sure, bro?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onConfirm} className="ml-2">Confirm</Button>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}