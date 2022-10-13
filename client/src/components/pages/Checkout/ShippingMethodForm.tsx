import * as React from "react";
import { ButtonGroup, Card, ListGroup, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateShipping } from "../../../actions/bagActions";

interface ShippingOption {
    id: number,
    icon: string,
    name: string,
    timeframe: string,
    cost: number,
  }

export const ShippingMethodForm = () => {
    const dispatch = useDispatch();
    const shippingOptions = useSelector((state: any) => state.shippingOptions);
    const [shippingOptionId, setShippingOptionId] = React.useState(1);

    const handleShippingOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const selectedId = parseInt(e.currentTarget.value);
        const selectedShippingOption = shippingOptions.find((o: ShippingOption) => o.id === selectedId);
        setShippingOptionId(selectedId);
        dispatch(updateShipping(selectedShippingOption));
    };

    return (
      <ListGroup variant="flush" className="py-1">
        <ListGroup.Item>
          <h2 className="py-3">Shipping options</h2>
          <ButtonGroup toggle>
            {shippingOptions.map((option: ShippingOption, i: number) => (
              <Card
                as={ToggleButton}
                key={i}
                type="radio"
                variant="outline-dark"
                name="shipping"
                value={option.id}
                checked={option.id === shippingOptionId}
                onChange={handleShippingOptionChange}
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