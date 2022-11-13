import * as React from "react";
import { Button, Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { addToBag, removeFromBag } from "../../../features/bag/bagSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IBagItem } from "../../../types/IBagItem";
import { QtySelect } from "../../shared/QtySelect";
import { EmptyBag } from "./EmptyBag";

export const Bag: React.FC = () => {
    const history = useHistory();
    const bag = useAppSelector(state => state.bag);
    const { bagItems, subtotal, shipping, tax, total } = bag;

    const dispatch = useAppDispatch();

    const handleQtyChange = (productId: string, e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(addToBag({...bagItems.find(i => i.id === productId) as IBagItem, quantity: Number(e.target.value)}));
    };

    const handleRemoveItemFromBag = (product: IBagItem) => {
        dispatch(removeFromBag(product));
    };

    const handleCheckout = () => {
        history.push("/checkout1");
    };

    return (
        <Container className="d-flex py-5">
            {bagItems.length === 0 
                ? <EmptyBag />
                : <Row className="py-3">
                <Col md={8}>
                    <h1>My Bag ({bagItems.reduce((acc, item) => acc + item.quantity, 0)})</h1>
                    <hr />
                    <ListGroup variant="flush">
                        {bagItems.map((item) => (
                            <ListGroup.Item key={item.id}>
                            <Card className="border-0">
                                <Row>
                                    <Col md={4}>
                                        <Image src={item.image} alt={item.name} fluid />
                                    </Col>
                                    <Col md={8}>
                                        <Card.Title>
                                            <Link to={`/products/${item.id}`}>
                                                {item.name}
                                            </Link>
                                        </Card.Title>
                                        <Row className="mt-5">
                                            <Col lg={4}>
                                                <div>Item Price:</div>
                                                <div>${item.price}</div>
                                            </Col>
                                            <Col lg={4}>
                                                Qty:{" "}
                                                <QtySelect
                                                    product={item}
                                                    qty={item.quantity}
                                                    onChange={handleQtyChange}
                                                />
                                            </Col>
                                            <Col lg={4} className="d-flex">
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="my-auto"
                                                    onClick={() => handleRemoveItemFromBag(item)}>
                                                    Remove
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <h2 className="py-1">Order Summary</h2>
                    <hr />
                    <ListGroup variant="flush">
                        <ListGroup.Item className="d-flex">
                            <div>Subtotal</div>
                            <div className="ms-auto">${subtotal.toFixed(2)}</div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex">
                            <div>Shipping</div>
                            <div className="ms-auto">{shipping.cost.toFixed(2)}</div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex">
                            <div>Tax</div>
                            <div className="ms-auto">${tax.toFixed(2)}</div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex">
                            <div><strong>Estimated Total</strong></div>
                            <div className="ms-auto"><strong>${total.toFixed(2)}</strong></div>
                        </ListGroup.Item>
                    </ListGroup>
                    <div className="d-flex">
                        <Button
                            type="button"
                            className="w-100 mt-4"
                            disabled={bagItems.length === 0}
                            onClick={handleCheckout}
                        >
                            <i className="fas fa-burn"></i>&nbsp;&nbsp;Checkout
                        </Button>
                    </div>
                </Col>
                </Row>
            }
        </Container>
    );
}