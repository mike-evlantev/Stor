import { IAddress } from "./IAddress";
import { IName } from "./IName";

export interface IUser extends IName, IAddress {
    _id: string;
    phone: string;
    email: string;
    isActive: boolean;
    isAdmin: boolean;
    token: string;
}