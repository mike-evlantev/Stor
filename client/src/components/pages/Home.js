import React, {Fragment} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../Product';
import products from '../../products';

const Home = () => {
  return (
    <Fragment>
      <h1>Latest Products</h1>
      <Row>
        {products ? products.map((p, i) =>
          
            <Col key={i} sm={12} md={6} lg={4} xl={3}>
              <Product product={p} />
            </Col>
          
        ) : <span>No products found</span>}
      </Row>
    </Fragment>
  )
}

export default Home
