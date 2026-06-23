import { Category, ProductBlock } from "..";

export interface ProductDetail {
	id: number;
	discount: number;
	name: string;
	amount: number;
	price: number;
	categoryId: number;
	category: Category;
	blocks: ProductBlock[];
}
