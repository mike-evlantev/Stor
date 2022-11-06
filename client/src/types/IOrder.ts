import { PaymentMethod } from "@stripe/stripe-js";
import { IAddress } from "./IAddress";
import { IBagItem } from "./IBagItem";
import { IShippingOption } from "./IShippingOption";

export interface IOrder {
    orderNumber: number;  // generated and overwritten by mongoose
    createdAt: string;  // generated and overwritten by mongoose
    first: string;
    middle?: string;
    last: string;
    orderItems: IBagItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: PaymentMethod;
    shippingAddress: IAddress;
    shippingOption: IShippingOption;
}