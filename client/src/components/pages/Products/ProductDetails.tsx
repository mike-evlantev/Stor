import * as React from "react";
import { Col, ListGroup, Modal, Row, Image, Card, Form, Button, Container, Table } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { addToBag } from "../../../features/bag/bagSlice";
import { getProductById } from "../../../features/products/productsSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IBagItem } from "../../../types/IBagItem";
import Rating from "../../Rating";
import { Loader } from "../../shared/Loader";
import { QtySelect } from "../../shared/QtySelect";

interface Params {
    id: string;
}

export const ProductDetails: React.FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<Params>();
    const { loading, product } = useAppSelector(state => state.products);
    const [quantity, setQuantity] = React.useState(1);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        dispatch(getProductById(id));
    }, []);

    const inStock = product.countInStock > 0;
    const inStockDisplayName = inStock ? "In Stock" : "Out of Stock";
    const inStockDisplayColor = inStock ? "text-success" : "text-primary";

    const handleModalShow = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    const handleAddToBag = () => {
        dispatch(addToBag({...product, quantity}));
        handleModalShow();
    };

    const handleQuantityChange = (_: string, e: React.ChangeEvent<HTMLSelectElement>) => setQuantity(Number(e.target.value));

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
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
                            <ListGroup.Item>
                                <Rating value={0} numReviews={0}/>
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
                                {inStock && (
                                    <ListGroup.Item>
                                        <Form.Group as={Row}>
                                            <Form.Label column lg="6">
                                                Qty:
                                            </Form.Label>
                                            <Col lg="6">
                                                <QtySelect
                                                    product={product}
                                                    qty={quantity}
                                                    onChange={handleQuantityChange}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </ListGroup.Item>
                                )}
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
            {showModal && <AddToBagModal bagItem={{...product, quantity}} handleModalClose={handleModalClose} />}
        </>
    );
}

interface ModalProps {
    bagItem: IBagItem
    handleModalClose: () => void;
}

const AddToBagModal: React.FC<ModalProps> = ({bagItem, handleModalClose}) => {
    const history = useHistory();
    const handleCheckout = () => history.push("/checkout1");
    const handleViewBag = () => history.push("/bag");
    
    return(
        <Modal show={true} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Added to bag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <Image src={bagItem.image} alt={bagItem.name} fluid />
                        </Col>
                        <Col xs={12} md={8}>
                            <Table className="table-borderless table-hover">
                                <thead>
                                    <tr>
                                        <th colSpan={2}>
                                            <h4>{bagItem.name}</h4>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Qty:</td>
                                        <td>{bagItem.quantity}</td>
                                    </tr>
                                    <tr>
                                        <td>Price:</td>
                                        <td>${bagItem.price?.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Subtotal:</td>
                                        <td>${(bagItem.quantity * bagItem.price)?.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleViewBag}>
                    View Bag
                </Button>
                <Button variant="primary" onClick={handleCheckout}>
                    Checkout
                </Button>
            </Modal.Footer>
        </Modal>
    );
}