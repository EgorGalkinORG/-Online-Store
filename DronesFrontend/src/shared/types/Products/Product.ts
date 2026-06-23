import { Category } from "../Categories/Category";

export interface Product {
    id: number;
    discount?: number;
    name:  string;
    amount: number;
    price: number;
    category: Category;
    name_trigrams: string;
    image: string;
}
