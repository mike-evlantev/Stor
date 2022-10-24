import * as React from "react";
import { Button, ButtonGroup, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateShipping } from "../../../actions/bagActions";
import { IShippingOption } from "../../../types/IShippingOption";

export const ShippingMethodForm: React.FC = () => {
    const dispatch = useDispatch();
    const shippingOptions = useSelector((state: any) => state.shippingOptions);
    const [shippingOptionId, setShippingOptionId] = React.useState(1);

    const handleShippingOptionClick = (id: number) => {
      const selectedShippingOption = shippingOptions.find((o: IShippingOption) => o.id === id);
      setShippingOptionId(id);
      dispatch(updateShipping(selectedShippingOption));
    };

    return (
      <ListGroup variant="flush" className="py-1">
        <ListGroup.Item>
          <h2 className="py-3">Shipping options</h2>
          <ButtonGroup>
            {shippingOptions.map((option: IShippingOption, i: number) => (
              <Card
                as={Button}
                key={i}
                variant="outline-dark"
                name="shipping"
                value={option.id}
                active={option.id === shippingOptionId}
                onClick={() => handleShippingOptionClick(option.id)}
              >
                <Card.Body>
                  <Card.Title className="mb-4">{option.timeframe}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <i className={option.icon}></i>
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