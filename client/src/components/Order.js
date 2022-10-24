import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import EmptyBag from "./EmptyBag";
import { Loader } from "./shared/Loader.tsx";
import Checkout from "./pages/Checkout/Checkout";
import Confirmation from "./pages/Confirmation";
import OrderItems from "./pages/OrderItems";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
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
  
  const appearance = {
    theme: 'none',

    rules: {
      '.Tab': {
        border: '10px solid green',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
      },

      '.Tab:hover': {
        color: 'var(--colorText)',
      },

      '.Tab--selected': {
        borderColor: '#E0E6EB',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
      },

      '.Input--invalid': {
        borderColor: 'green',
        //boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
      }
    }
  };

  const options = {
    appearance
  };

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
        return <Elements stripe={stripePromise}><Checkout /></Elements>;
      case "confirmation":
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
