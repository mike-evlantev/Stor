import React, {Fragment, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Product from '../Product.js';
import Loader from '../Loader.js';
import Message from '../Message.js';
import {listProducts} from '../../actions/productActions.js';

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList); // bring in the product list part of the state
  const {loading, error, products} = productList;
  // runs as soon as component loads
  useEffect(() => {
    dispatch(listProducts()); // calls api
  }, [dispatch]);

  return (
    <Fragment>      
      {loading 
        ? (<Loader />)
        : error 
          ? (<Message variant='danger'>{error}</Message>)
          : (
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
          )} 
    </Fragment>
  )
}

export default Home;
