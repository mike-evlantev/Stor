import * as React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Address } from "../../../types/Address";
import { Name } from "../../../types/Name";
import { ShippingOption } from "../../../types/ShippingOption";

interface Props {
    shippingOptionId: number;
    handleStepChange: (step: number) => void;
}

export const ShippingInfoSummary = ({shippingOptionId, handleStepChange}: Props) => {
    const shippingOptions = useSelector((state: any) => state.shippingOptions);
    const customer = useSelector((state: any) => state.customer);
    const {first, last, email} = customer as Name & {email: string};
    const {address1, address2, city, state, zip} = customer.shippingAddress as Address;
    
    return (
        <ListGroup variant="flush" className="py-1">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <h4 className="py-3">Notification email:</h4>
                <strong>{email}</strong>
                <u onClick={() => handleStepChange(1)}>Edit</u>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <h4 className="py-3">Shipping address:</h4>
                <strong>
                <div>
                    {first}&nbsp;{last}
                </div>
                <div>
                    {address1}
                    {", "}
                    {address2}
                </div>
                <div>
                    {city}
                    {", "}
                    {state} {zip}
                </div>
                </strong>
                <u onClick={() => handleStepChange(1)}>Edit</u>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <h4 className="py-3">Estimated delivery:</h4>
                <strong>{shippingOptions.find((o: ShippingOption) => o.id === shippingOptionId).name}</strong>
                <u onClick={() => handleStepChange(1)}>Edit</u>
            </ListGroup.Item>
        </ListGroup>
    );
};