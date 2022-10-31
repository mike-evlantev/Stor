import { IProduct } from "./IProduct";

export interface IBagItem  extends IProduct {
    quantity: number;
}