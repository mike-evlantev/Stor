import * as React from "react";
import { Image, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getOrders } from "../../../features/admin/adminSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IAddress } from "../../../types/IAddress";
import { IOrder } from "../../../types/IOrder";
import { getDisplayImageUrl, handleError } from "../../../utils/imageUtils";
import { Address } from "../../shared/Address";
import { Last4 } from "../../shared/Last4";
import { Loader } from "../../shared/Loader";

interface Params {
    id: string;
}

export const OrderDetails: React.FC = () => {
    const { id } = useParams<Params>();
    const dispatch = useAppDispatch();
    const { loading, orders } = useAppSelector(state => state.admin);
    const [ order, setOrder ] = React.useState<IOrder | undefined>();
    
    React.useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    React.useEffect(() => {
        setOrder(orders.find(o => o.id === id));
    }, [orders, id]);
    
    return(<>
        {loading
            ? <Loader />
            : order && <OrderDetailsInternal order={order} />}
    </>);
};

const OrderDetailsInternal = ({order}: {order: IOrder}) => {
    const { orderNumber, first, last, shippingAddress, shippingOption, orderItems, paymentMethod, subtotal, tax, total, createdAt } = order;
    const { name, address } = { ...paymentMethod.billing_details }; // this spread notation allows to destructure potentially undefined objects
    const localDate = new Date(createdAt).toLocaleString("en-US");

    return(
        <div className="d-flex flex-column">
            <div className="d-flex">
                <h5 className="mb-3">Order # {orderNumber}</h5>
                <div className="ms-auto">{localDate}</div>
            </div>           
            <div className="d-flex align-items-start">
                <Table className="table-sm">
                    <thead>
                        <tr>
                            <th colSpan={2}>Shipping</th>
                            <th colSpan={2}>Billing</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <Address name={{first, last}} address={shippingAddress as IAddress} />
                            </td>
                            <td colSpan={2}>
                                <>
                                    {name && <div>{name}</div>}
                                    <div>{address?.line1}{", "}{address?.line2}</div>
                                    <div>{address?.city}{", "}{address?.state}&nbsp;{address?.postal_code}</div>
                                </>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>Item#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th className="text-center">Qty</th>
                            <th className="text-center">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems?.length > 0 && orderItems.map(o => 
                            <tr key={o.id} className="align-middle">
                                <td>
                                    <Link to={`../products/${o.id}`}>
                                        {o.id}
                                    </Link>
                                </td>
                                <td>
                                    <Image width={50} src={getDisplayImageUrl(o.images)} alt={o.name} onError={handleError} fluid className="hover-zoom" />
                                </td>
                                <td>{o.name}</td>
                                <td className="text-center">{o.quantity}</td>
                                <td className="text-end">${o.price.toFixed(2)}</td>
                            </tr>)}
                        <tr className="table-dark align-middle">
                            <th colSpan={4}>Subtotal</th>
                            <td className="text-end">${subtotal?.toFixed(2)}</td>
                        </tr>
                        <tr className="table-dark align-middle">
                            <th colSpan={2}>Shipping</th>
                            <td colSpan={2}>
                                <div className="d-flex align-items-center">
                                    <i className={shippingOption?.icon}></i>
                                    <div className="mx-2">{shippingOption?.timeframe}</div>
                                </div>
                            </td>
                            <td className="text-end">{shippingOption?.cost === 0 ? "FREE" : `$${shippingOption?.cost.toFixed(2)}`}</td>    
                        </tr>
                        <tr className="table-dark align-middle">
                            <th colSpan={4}>Tax</th>
                            <td className="text-end">${tax?.toFixed(2)}</td>    
                        </tr>
                        <tr className="table-dark align-middle">
                            <th colSpan={2}>Total</th>
                            <td colSpan={2}>
                                <Last4 boldText={false} brand={paymentMethod?.card?.brand} last4={paymentMethod?.card?.last4} />
                            </td>
                            <td className="text-end">${total?.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}