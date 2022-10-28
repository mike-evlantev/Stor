import { IProduct } from "./IProduct";

export interface IOrderItem extends IProduct{
    orderId: number;
    qty: number;
}