import React, { Fragment, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard.js";
import { Loader } from "../shared/Loader.tsx";
import { getProducts } from "../../features/products/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);

  // runs as soon as component loads
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1>Latest Products</h1>
          <Row>
            {products ? (
              products.map((p, i) => (
                <Col key={i} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={p} />
                </Col>
              ))
            ) : (
              <span>No products found</span>
            )}
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
