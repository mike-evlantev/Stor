import * as React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { IProduct } from "../../../types/IProduct";
import { getDisplayImageUrl, handleError } from "../../../utils/imageUtils";
import Rating from "../../Rating";

interface Props {
    product: IProduct;
}

export const ProductCard: React.FC<Props> = ({product}) => {
    const { images, name, price } = product;
    const history = useHistory();
  
    const goToProductDetails = () =>{ 
        history.push(`/products/${product.id}`);
    }
    return(
        <Card className="my-3" onClick={() => goToProductDetails()} style={{cursor: "pointer"}}>
            <Card.Img variant="top" src={getDisplayImageUrl(images)} alt={name} onError={handleError} style={{minHeight: "233px", maxHeight: "233px", objectFit: "cover"}} />
            <Card.Body>
                <Card.Title as="div" style={{minHeight: "75px"}}><strong>{name}</strong></Card.Title>
                <Card.Text>
                    <Rating value={0} numReviews={0} />
                </Card.Text>
                <Card.Text as="h5">${price}</Card.Text>
            </Card.Body>
        </Card>
    );
}