import React, { Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Loader } from "../shared/Loader.tsx";

const Confirmation = () => {
  const history = useHistory();
  const { success, loading, error, ...order } = useAppSelector(
    (state) => state.order
  );

  if (!success || !order) {
    history.push("/");
    return null;
  }

  const options = {
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
                  {new Date(order?.createdAt).toLocaleDateString(
                    undefined,
                    options
                  )}
                </div>
                <div>
                  {order?.shippingOption.name} ({order?.shippingOption.timeframe})
                </div>
              </strong>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush" className="py-1">
            <ListGroup.Item>
              <h4 className="py-3">Shipping address</h4>
              <strong>
                <div>
                  {order?.first}&nbsp;{order?.last}
                </div>
                <div>
                  {order?.shippingAddress?.address1}
                  {", "}
                  {order?.shippingAddress?.address2}
                </div>
                <div>
                  {order?.shippingAddress?.city}
                  {", "}
                  {order?.shippingAddress?.state} {order?.shippingAddress?.zip}
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
