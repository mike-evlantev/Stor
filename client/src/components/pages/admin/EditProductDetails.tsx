import * as React from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../features/products/productsSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Loader } from "../../shared/Loader";

interface Params {
    id: string;
}

export const EditProductDetails: React.FC = () => {
    const { id } = useParams<Params>();
    const dispatch = useAppDispatch();
    const { loading, product } = useAppSelector(state => state.products);

    const inStock = product.countInStock > 0;
    const inStockDisplayName = inStock ? "In Stock" : "Out of Stock";
    const inStockDisplayColor = inStock ? "text-success" : "text-primary";

    const handleAddToBag = () => {
        console.log("Button clicked");
    }

    React.useEffect(() => {
        dispatch(getProductById(id));
    }, []);

    return (
        <>
            { loading 
                ? <Loader />
                : <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>${product.price?.toFixed(2)}</ListGroup.Item>
                            <ListGroup.Item>{product.description}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price?.toFixed(2)}</strong>
                                    </Col>
                                </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                <Row>
                                    <Col>Availability:</Col>
                                    <Col>
                                        <strong className={inStockDisplayColor}>
                                            {inStockDisplayName}
                                        </strong>
                                    </Col>
                                </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        className="btn-block"
                                        type="button"
                                        disabled={!inStock}
                                        onClick={handleAddToBag}
                                    >
                                        Add to bag
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </>
    );
};