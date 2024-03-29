import * as React from "react";
import { useParams } from "react-router-dom";
import { updateCurrentProduct, updateCurrentProductImages, updateProduct } from "../../../features/admin/adminSlice";
import { getProductById } from "../../../features/products/productsSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Loader } from "../../shared/Loader";
import { ConfirmationModal } from "./ConfirmationModal";
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
        const { id, name, value } = e.target;
        if (name === "images") {
            dispatch(updateCurrentProductImages({sort: Number(id), url: value}));
        } else {
            const obj = {[name]: value};
            dispatch(updateCurrentProduct(obj));
        }
    };

    const handleSubmit = async () => {
        handleHide();
        dispatch(updateProduct(product));
    }

    React.useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);

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

