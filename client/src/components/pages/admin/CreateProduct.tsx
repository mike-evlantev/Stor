import * as React from "react";
import { createProduct } from "../../../features/admin/adminSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IKeyValuePair } from "../../../types/IKeyValuePair";
import { IProduct } from "../../../types/IProduct";
import { Loader } from "../../shared/Loader";
import { loggedInUserFromStorage } from "../../../utils/authUtils";
import { ProductDetailsForm } from "./ProductDetailsForm";
import { IImage } from "../../../types/IImage";

export const CreateProduct: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.admin);
    const [product, setProduct] = React.useState<IProduct>({} as IProduct);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { id, name, value } = e.target;

        if (name === "images") {
            setProduct(prev => {
                let images = prev.images || [];
                const image: IImage = {sort: Number(id), url: value};
                if (images?.find(i => i.sort === image.sort)) {
                    if (!image.url) {
                        images = images.filter(i => i.sort !== image.sort);
                    } else {
                        images = images.map(i => i.sort === image.sort ? image : i);
                    }
                } else {
                    images = [...images, image];
                }

                return {...prev, images};
            });
        } else {
            const obj = {[name]: value} as IKeyValuePair<string>;
            setProduct(prev => ({...prev, ...obj}));
        }
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