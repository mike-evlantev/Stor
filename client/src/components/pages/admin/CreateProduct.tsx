import * as React from "react";
import { Button, Image, Form, InputGroup } from "react-bootstrap";
import { createProduct } from "../../../features/admin/adminSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IKeyValuePair } from "../../../types/IKeyValuePair";
import { IProduct } from "../../../types/IProduct";
import { Loader } from "../../shared/Loader";
import { loggedInUserFromStorage } from "../../../utils/authUtils";
import { ProductDetailsForm } from "./ProductDetailsForm";

export const CreateProduct: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.admin);

    const [product, setProduct] = React.useState<IProduct>({image: "", id: "", name: "", description: "", brand: "", category: "", price: 0, countInStock: 0});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value} as IKeyValuePair<string>;

        setProduct(prev => ({...prev, ...obj}));
    };

    const handleSubmit = async () => {
        dispatch(createProduct({...product, userId: loggedInUserFromStorage()._id}));
    }

    return (
        <>
            {loading 
                ? <Loader />
                : <ProductDetailsForm product={product} onChange={handleChange} onSave={handleSubmit} />
            }
        </>
    );
};