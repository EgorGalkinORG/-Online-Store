import { Product } from "../Products/Product";

export interface CartItem extends Product {
    count: number;
    oldPrice?: number;
}