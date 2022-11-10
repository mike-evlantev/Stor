import * as React from "react";
import { Button, ButtonGroup, Card, ListGroup } from "react-bootstrap";
import { availableShippingOptions } from "../../../constants/shippingOptions";
import { updateShipping } from "../../../features/bag/bagSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { IShippingOption } from "../../../types/IShippingOption";

export const ShippingMethodForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [shippingOptionId, setShippingOptionId] = React.useState(1);

  const handleShippingOptionClick = (id: number) => {
    const selectedShippingOption: IShippingOption = availableShippingOptions.find(o => o.id === id) as IShippingOption;
    setShippingOptionId(id);
    dispatch(updateShipping(selectedShippingOption));
  };

  return (
    <ListGroup variant="flush" className="py-3">
      <ListGroup.Item>
        <h2 className="py-3">Shipping options</h2>
        <ButtonGroup className="w-100">
          {availableShippingOptions.map((option: IShippingOption) => (
            <Card
              as={Button}
              key={option.id}
              variant="outline-dark"
              name="shipping"
              value={option.id}
              active={option.id === shippingOptionId}
              onClick={() => handleShippingOptionClick(option.id)}
            >
              <Card.Body>
                <Card.Title className="mb-4">{option.timeframe}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <i className={`${option.icon} fa-3x`}></i>
                </Card.Subtitle>
                <Card.Text>{option.name}</Card.Text>
                <Card.Title>
                  <strong>
                    {option.cost === 0 ? "FREE" : `$${option.cost}`}
                  </strong>
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </ButtonGroup>
      </ListGroup.Item>
    </ListGroup>
  );
};