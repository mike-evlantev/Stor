import * as React from "react";
import { Button, Form, Image, InputGroup, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { updateCurrentProduct, updateProduct } from "../../../features/admin/adminSlice";
import { getProductById } from "../../../features/products/productsSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IKeyValuePair } from "../../../types/IKeyValuePair";
import { Loader } from "../../shared/Loader";
import { ProductDetailsForm } from "./ProductDetailsForm";

interface Params {
    id: string;
}

export const EditProduct: React.FC = () => {
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
                : <ProductDetailsForm product={product} onChange={handleChange} onSave={handleShow} />
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