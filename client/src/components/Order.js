import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import EmptyBag from "./EmptyBag";
import Loader from "./Loader";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import OrderItems from "./pages/OrderItems";

const Order = ({ orderStage }) => {
  const [stageDisplayTitle, setStageDisplayTitle] = useState("");
  const [stageDisplaySubtitle, setStageDisplaySubtitle] = useState("");

  const { isAuthenticated, loggedInUser, loading: authLoading } = useSelector(
    (state) => state.auth
  );
  const { bagItems, shipping, subtotal, tax, total } = useSelector(
    (state) => state.bag
  );
  const { loading: orderSubmitLoading } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderStage === "checkout") {
      setStageDisplayTitle("Checkout");
    }
    if (orderStage === "confirmation") {
      setStageDisplayTitle("Thank you for your order");
      setStageDisplaySubtitle(
        "Please note it may take 30 minutes for your order confirmation email to be sent. We appreciate your patience."
      );
    }
    // eslint-disable-next-line
  }, [orderStage]);

  const renderLeft = () => {
    switch (orderStage) {
      case "checkout":
        console.log(stageDisplayTitle);
        return <Checkout />;
      case "confirmation":
        console.log(stageDisplayTitle);
        console.log(stageDisplaySubtitle);
        return <Confirmation />;
      default:
        return <span>Unknown order stage</span>;
    }
  };

  return (
    <Container className="d-flex flex-column py-5">
      {bagItems.length === 0 ? (
        <EmptyBag />
      ) : authLoading || orderSubmitLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <Row className="py-1 px-3">
            <h1>{stageDisplayTitle}</h1>
          </Row>
          <Row className="py-1 px-3">
            <span>{stageDisplaySubtitle}</span>
          </Row>
          <Row className="py-3">
            {/* LEFT COLUMN */}
            <Col md={7}>{renderLeft()}</Col>
            {/* RIGHT COLUMN */}
            <Col md={5}>
              <div className="sticky-top">
                <OrderItems
                  items={bagItems}
                  shipping={shipping}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                />
              </div>
            </Col>
          </Row>
        </Fragment>
      )}
    </Container>
  );
};

export default Order;
