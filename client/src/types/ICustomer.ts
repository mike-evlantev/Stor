import { PaymentMethod } from "@stripe/stripe-js";
import { IAddress } from "./IAddress";
import { IAddressErrors } from "./IAddressErrors";
import { ICreditCardValidation } from "./ICreditCardValidation";
import { INameErrors } from "./INameErrors";

export interface ICustomerErrors extends INameErrors {
    shippingAddress: IAddressErrors;
    billingAddress: IAddressErrors;
    email: string;
    phone: string;
    nameOnCard: string;
}

/*
* Represents an unregistered (non-authenticated) user aka a guest user 
*/
export interface ICustomer {
    errors: ICustomerErrors;
    first: string;
    last: string;
    shippingAddress: IAddress;
    billingAddress: IAddress;
    phone: string;
    email: string;
    card: ICreditCardValidation & { nameOnCard: string; paymentMethod: PaymentMethod | undefined};
}