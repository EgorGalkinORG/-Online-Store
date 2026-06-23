import { TechDetail } from "..";

export interface ProductBlock {
	id: number;
	header: string;
	description: string;
	image: string;
	productId: number;
	techDetails: TechDetail[];
}
