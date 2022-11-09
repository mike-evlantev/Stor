import * as React from "react";
import { Col, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { availableShippingOptions } from "../../../constants/shippingOptions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IName } from "../../../types/IName";
import { IShippingOption } from "../../../types/IShippingOption";
import { Address } from "../../shared/Address";

export const ShippingInfoSummary: React.FC = () => {
    const history = useHistory();
    const { customer, bag } = useAppSelector(state => state);
    const handleEditClick = (prevStep: number) => history.push(`checkout${prevStep}`);
    
    return (
        <ListGroup variant="flush" className="py-1">
            <ListGroup.Item className="d-flex align-items-center">
                <Col sm={6}>
                    <h4 className="py-3 flex-grow-1">
                        <i className="far fa-check-circle"></i>{" "}
                        Notification email:
                    </h4>
                </Col>
                <Col sm={5}>
                    <strong>{customer.email}</strong>
                </Col>
                <Col sm={1}>
                    <u className="float-end" onClick={() => handleEditClick(1)} style={{cursor: "pointer"}}>Edit</u>
                </Col>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center">
                <Col sm={6}>
                    <h4 className="py-3 flex-grow-1">
                        <i className="far fa-check-circle"></i>{" "}
                        Shipping address:
                    </h4>
                </Col>
                <Col sm={5}>
                    <strong><Address name={customer as IName} address={customer.shippingAddress} /></strong>
                </Col>
                <Col sm={1}>
                    <u className="float-end" onClick={() => handleEditClick(1)} style={{cursor: "pointer"}}>Edit</u>
                </Col>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center">
                <Col sm={6}>
                    <h4 className="py-3 flex-grow-1">
                        <i className="far fa-check-circle"></i>{" "}
                        Estimated delivery:
                    </h4>
                </Col>
                <Col sm={5}>
                    <strong>{availableShippingOptions.find((o: IShippingOption) => o.id === bag.shipping.id)!.name}</strong>
                </Col>
                <Col sm={1}>
                    <u className="float-end" onClick={() => handleEditClick(1)} style={{cursor: "pointer"}}>Edit</u>
                </Col>
            </ListGroup.Item>
        </ListGroup>
    );
};