import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Rating from '../Rating.js';
import Loader from '../Loader.js';
import Message from '../Message.js';
import {getProductDetails} from '../../actions/productActions.js';

const Product = ({match}) => {
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails); // bring in the product details part of the state
  const {loading, error, product} = productDetails;
  // runs as soon as component loads
  useEffect(() => {
    dispatch(getProductDetails(match.params.id)); // calls api
  }, [dispatch, match]);

  const inStock = product.countInStock > 0;
  const inStockDisplayName = inStock ? 'In Stock' : 'Out of Stock';
  const inStockDisplayColor = inStock ? 'text-success' : 'text-primary';

  return (
    <Fragment>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading 
        ? (<Loader />)
        : error
          ? (<Message variant='danger'>{error}</Message>)
          : (<Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.avgRating} numReviews={product.numReviews} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    ${product.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col>
                <Card>
                  <ListGroup>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col><strong>${product.price}</strong></Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Availability:</Col>
                        <Col><strong className={inStockDisplayColor}>{inStockDisplayName}</strong></Col>
                      </Row>
                    </ListGroup.Item>
                    {inStock && (
                      <ListGroup.Item>
                        <Form.Group as={Row}>
                          <Form.Label column lg="6">
                            Qty:
                          </Form.Label>
                          <Col lg="6">
                            <Form.Control
                              as='select'
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {
                                Array
                                  .from({length: product.countInStock}, (_, i) => i + 1)
                                  .map(x => (
                                    <option key={x} value={x}>{x}</option>
                                  ))
                              }
                            </Form.Control>
                          </Col>
                        </Form.Group>             
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button className='btn-block' type='button' disabled={!inStock}>
                        Add to cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>)}
    </Fragment>
  )
}

export default Product
