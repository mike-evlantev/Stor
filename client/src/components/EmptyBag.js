import React from "react";
import { Button, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const EmptyBag = () => {
  const history = useHistory();
  const handleShopNow = () => {
    history.push("/");
  };
  return (
    <div className="mx-auto text-center">
      <Row className="py-5">
        <h1>You haven't added anything to your bag yet!</h1>
      </Row>
      <Button type="button" variant="primary" onClick={handleShopNow}>
        <i className="fas fa-burn text-inverse"></i>
        &nbsp;&nbsp; SHOP NOW
      </Button>
    </div>
  );
};

export default EmptyBag;
