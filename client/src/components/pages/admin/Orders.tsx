import * as React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getOrders } from "../../../features/admin/adminSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Address } from "../../shared/Address";
import { Loader } from "../../shared/Loader";

export const Orders: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, orders } = useAppSelector(state => state.admin);

    React.useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);
    
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    };

    return(<>
        {loading 
            ? <Loader /> 
            : <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Items</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.length > 0 && orders.map(o => 
                        <tr key={o.id} className="small">
                            <td>
                                <Link to={`orders/${o.id}`}>
                                    {o.orderNumber}
                                </Link>
                            </td>
                            <td>{(new Date(o.createdAt)).toLocaleDateString('en-US', options)}</td>
                            <td>{o.first + " " + o.last}</td>
                            <td><Address address={o.shippingAddress} /></td>
                            <td>{o.orderItems.length}</td>
                            <td>${o.total.toFixed(2)}</td>
                        </tr>)}
                </tbody>
            </Table>}
    </>);
}