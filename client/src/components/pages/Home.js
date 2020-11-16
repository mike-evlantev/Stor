import React, {Fragment, useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../Product';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  // runs as soon as component loads
  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await axios.get('/api/products');
      setProducts(data);
    }    
    
    fetchProducts();
  }, []);

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
