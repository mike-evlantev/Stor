import * as React from "react";
import { Button } from "react-bootstrap";

interface SubmitOrderButtonProps {
    orderSubmitLoading: boolean;
    bagItems: any;
    handleSubmitOrder: () => void;
}

export const SubmitOrderButton = ({orderSubmitLoading, bagItems, handleSubmitOrder}: SubmitOrderButtonProps) => {
    return (
      <Button
        variant="primary"
        className="my-2 float-right"
        onClick={() => handleSubmitOrder()}
        disabled={
          orderSubmitLoading || !bagItems || bagItems.length === 0
        }
      >
        Submit Order
      </Button>
    );
  };