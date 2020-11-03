import React, {Fragment} from 'react';
import {Row, Col} from 'react-bootstrap';
import products from '../../products';

const Home = () => {
  return (
    <Fragment>
      <h1>Latest Products</h1>
      {products ? products.map(p =>
        <Row>
          <Col sm={12} md={6} lg={4} xl={3}>
            {p.name}
          </Col>
        </Row>
      ) : <span>No products found</span>}  
    </Fragment>
  )
}

export default Home
