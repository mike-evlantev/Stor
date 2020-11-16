import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from '../Rating';
import axios from 'axios';

const Product = ({match}) => {
  const [product, setProduct] = useState({});

  // runs as soon as component loads
  useEffect(() => {
    const fetchProduct = async () => {
      const {data} = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    }    
    
    fetchProduct();
  }, [match]);

  const inStock = product.countInStock > 0;
  const inStockDisplayName = inStock ? 'In Stock' : 'Out of Stock';
  const inStockDisplayColor = inStock ? 'text-success' : 'text-primary';

  return (
    <Fragment>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} numReviews={product.numReviews} />
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
              <ListGroup.Item>
                <Button className='btn-block' type='button' disabled={!inStock}>
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default Product
