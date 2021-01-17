import React from "react";
import { Fragment } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const Confirmation = () => {
  const { order, success, loading } = useSelector((state) => state.submitOrder);
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div>Confirmation</div>
          {success ? order._id : <div>Order not found</div>}
        </Fragment>
      )}
    </Container>
  );
};

export default Confirmation;
