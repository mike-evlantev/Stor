import * as React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IName } from "../../../types/IName";
import { IShippingOption } from "../../../types/IShippingOption";
import { Address } from "../../shared/Address";

interface Props {
    onStepChange: (step: number) => void;
}

export const ShippingInfoSummary = ({onStepChange}: Props) => {
    const shippingOptions = useSelector((state: any) => state.shippingOptions);
    const shippingOptionId = 1; // TODO: useSelector
    const customer = useSelector((state: any) => state.customer);
    
    return (
        <ListGroup variant="flush" className="py-1">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <h4 className="py-3">Notification email:</h4>
                <strong>{customer.email}</strong>
                <u onClick={() => onStepChange(1)}>Edit</u>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <h4 className="py-3">Shipping address:</h4>
                <strong><Address name={customer as IName} address={customer.shippingAddress} /></strong>
                <u onClick={() => onStepChange(1)}>Edit</u>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <h4 className="py-3">Estimated delivery:</h4>
                <strong>{shippingOptions.find((o: IShippingOption) => o.id === shippingOptionId).name}</strong>
                <u onClick={() => onStepChange(1)}>Edit</u>
            </ListGroup.Item>
        </ListGroup>
    );
};