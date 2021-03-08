import React, { Fragment } from "react";
import { Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearBag } from "../../actions/bagActions";
import Loader from "../Loader";

const Confirmation = () => {
  const history = useHistory();
  const dispatch = useHistory();
  const { success, loading, error, ...order } = useSelector(
    (state) => state.order
  );

  //dispatch(clearBag());

  if (!success || !order) {
    history.push("/");
    return null;
  }

  const options = {
    //weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ListGroup variant="flush" className="py-1">
            <ListGroup.Item>
              <h4 className="py-3">Order Information</h4>
              <strong>
                <div>
                  Order number: {/*TODO: order.confirmationNumber*/}
                  {Math.floor(1000000000 + Math.random() * 9000000000)}
                </div>
                <div>
                  Order date:{" "}
                  {new Date(order.createdAt).toLocaleDateString(
                    undefined,
                    options
                  )}
                </div>
                <div>
                  {order.shippingOption.name} ({order.shippingOption.timeframe})
                </div>
              </strong>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush" className="py-1">
            <ListGroup.Item>
              <h4 className="py-3">Shipping address</h4>
              <strong>
                <div>
                  {order.firstName}&nbsp;{order.lastName}
                </div>
                <div>
                  {order.shippingAddress.address1}
                  {", "}
                  {order.shippingAddress.address2}
                </div>
                <div>
                  {order.shippingAddress.city}
                  {", "}
                  {order.shippingAddress.state} {order.shippingAddress.zip}
                </div>
              </strong>
            </ListGroup.Item>
          </ListGroup>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Confirmation;
