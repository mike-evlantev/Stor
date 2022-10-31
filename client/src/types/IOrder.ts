import { PaymentMethod } from "@stripe/stripe-js";
import { IAddress } from "./IAddress";
import { IBagItem } from "./IBagItem";
import { IShippingOption } from "./IShippingOption";

export interface IOrder {
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