/*
 * Represents a registered user (auth user)
 */
export interface IUser {
    id: string;
    email: string;
    isActive: boolean;
    isAdmin: boolean;
    password: string;
    token: string;
}