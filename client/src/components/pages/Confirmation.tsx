import * as React from "react";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IAddress } from "../../types/IAddress";
import { IName } from "../../types/IName";
import { Address } from "../shared/Address";
import { Loader } from "../shared/Loader";

export const Confirmation: React.FC = () => {
    const history = useHistory();
    const { success, loading, error, ...order } = useAppSelector(state => state.order);

    // If the user clicks the back button after submitting the order redirect home
    React.useEffect(() => {
        return () => {
            if (history.action === "POP") {
                history.push("/");
            }
        };
    }, [history]);

    if (!loading && (!success)) {
        history.push("/");
        return null;
    }

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return (
        <>
            {loading 
                ? <Loader /> 
                : <>
                    <ListGroup variant="flush" className="py-1">
                        <ListGroup.Item>
                            <h4 className="py-3">Order Information</h4>
                            <strong>
                                <div>Order number: {order.orderNumber}</div>
                                <div>
                                    Order date:{" "}
                                    {new Date(order.createdAt as string).toLocaleDateString(undefined, options)}
                                </div>
                                <div>{order.shippingOption?.name} ({order.shippingOption?.timeframe})</div>
                            </strong>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup variant="flush" className="py-1">
                        <ListGroup.Item>
                            <h4 className="py-3">Shipping address</h4>
                            <strong>
                                <Address name={order as IName} address={order.shippingAddress as IAddress} />
                            </strong>
                        </ListGroup.Item>
                    </ListGroup>
                </>
            }
        </>
    );
}