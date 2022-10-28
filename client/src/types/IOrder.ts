import { IAddress } from "./IAddress";
import { IOrderItem } from "./IOrderItem";
import { IShippingOption } from "./IShippingOption";

export interface IOrder {
    first: string;
    middle?: string;
    last: string;
    orderItems: IOrderItem[];
    taxAmount: number;
    totalAmount: number;
    paymentMethod: string;
    shippingAddress: IAddress;
    shippingOption: IShippingOption;
}