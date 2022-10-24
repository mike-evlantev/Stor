import { IUser } from "./IUser";

export interface IProduct {
    id: number;
    user: IUser;
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    avgRating: number;
    numReviews: number;
    price: number;
    countInStock: number;
}