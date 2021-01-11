import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Modal,
  Container,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../Rating.js";
import Loader from "../Loader.js";
import QtySelect from "../QtySelect.js";
import { addToBag } from "../../actions/bagActions.js";
import { getProductDetails } from "../../actions/productActions.js";

const Product = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails); // bring in the product details part of the state
  const { loading, product } = productDetails;
  // runs as soon as component loads
  useEffect(() => {
    dispatch(getProductDetails(match.params.id)); // calls api
    // eslint-disable-next-line
  }, [dispatch, match]);

  const inStock = product.countInStock > 0;
  const inStockDisplayName = inStock ? "In Stock" : "Out of Stock";
  const inStockDisplayColor = inStock ? "text-success" : "text-primary";

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleAddToBag = () => {
    dispatch(addToBag(match.params.id, qty));
    handleModalShow();
  };

  const handleCheckout = () => {
    history.push("/checkout");
  };

  const handleViewBag = () => {
    history.push("/bag");
  };

  const handleQtyChange = (_, e) => {
    setQty(Number(e.target.value));
  };

  return (
    <Fragment>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.avgRating}
                  numReviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>${product.price}</ListGroup.Item>
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
                      <strong>${product.price}</strong>
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
                          qty={qty}
                          onChange={handleQtyChange}
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
      )}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Added to bag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={6} md={4}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col xs={12} md={8}>
                <Table className="table-borderless table-hover">
                  <thead>
                    <tr>
                      <th colSpan="2">
                        <h4>{product.name}</h4>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Qty:</td>
                      <td>{qty}</td>
                    </tr>
                    <tr>
                      <td>Price:</td>
                      <td>${product.price}</td>
                    </tr>
                    <tr>
                      <td>Subtotal:</td>
                      <td>${qty * product.price}</td>
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
    </Fragment>
  );
};

export default Product;
