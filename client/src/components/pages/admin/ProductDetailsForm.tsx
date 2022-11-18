import * as React from "react";
import { Button, Form, Image, InputGroup } from "react-bootstrap";
import { IProduct } from "../../../types/IProduct";

interface Props {
    product: IProduct
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
}

export const ProductDetailsForm: React.FC<Props> = ({product, onChange, onSave}) => {
    return(
        <div className="d-flex flex-column">
            <Image src={product.image} alt={product.name} width={250} fluid />
            <Form.Group className="my-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" name="image" value={product.image} onChange={onChange} placeholder="Image URL" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={product.name} onChange={onChange} placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={onChange} placeholder="Description" />
            </Form.Group>
            <div className="d-flex">
                <Form.Group className="mb-3 w-50">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name="category" value={product.category} onChange={onChange} placeholder="Category" />
                </Form.Group>
                <div className="mx-1"></div>
                <Form.Group className="mb-3 w-50">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" name="brand" value={product.brand} onChange={onChange} placeholder="Brand" />
                </Form.Group>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column w-50">
                    <Form.Label>Price</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control name="price" value={product.price} onChange={onChange} placeholder="Price" />
                    </InputGroup>
                </div>
                <div className="mx-1"></div>
                <Form.Group className="mb-3 w-50">
                    <Form.Label>In Stock</Form.Label>
                    <Form.Control type="text" name="countInStock" value={product.countInStock} onChange={onChange} placeholder="Quantity in stock" />
                </Form.Group>
            </div>
            <div className="d-flex">
                <Button className="ms-auto" onClick={onSave}>Save</Button>
            </div>
        </div>
    );
}