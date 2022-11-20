import { IImage } from "./IImage";

export interface IProduct {
    id: string;
    name: string;
    image: string;
    images: IImage[];
    brand: string;
    category: string;
    description: string;
    price: number;
    countInStock: number;
}