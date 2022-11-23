import { IAddress } from "./IAddress";
import { IName } from "./IName";

/*
 * Represents a registered user (auth user)
 */
export interface IUser extends Partial<IName>, Partial<IAddress> {
    id: string;
    email: string;
    isActive: boolean;
    isAdmin: boolean;
    password: string;
    token: string;
}