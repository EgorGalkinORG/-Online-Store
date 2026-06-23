import { Request, Response } from "express";
import { Prisma } from "../generated/prisma";

export type Product = Prisma.ProductGetPayload<{
	include: {
		category: true;
	};
}>;
export type ProductDetail = Prisma.ProductGetPayload<{
	include: {
		category: true;
		blocks: {
			include: {
				techDetails: true;
			};
		};
	};
}>;
export interface ProductTechDetail {
	characteristic: string;
	description: string;
}

export interface ProductBlock {
	header: string;
	description: string;
	image: string;
	details: ProductTechDetail[];
}

export interface ProductCreateBody {
	name: string;
	price: number;
	discount: number;
	category_id: number;
	amount: number;
	image: string;
	name_trigrams: string;
	blocks: ProductBlock[];
}
export interface ProductGetAllSuccessResponse {
	success: true;
	data: {
		products: Product[];
	};
}
export interface ProductGetByIdSuccessResponse {
	success: boolean;
	data: ProductDetail | null | undefined;
}

export interface ProductErrorResponse {
	success: false;
	message: string;
}
export interface ProductDeleteSuccessResponse {
	success: true;
	data: null;
}

export interface ProductPartialUpdateBody {
	name?: string;
	price?: number;
	discount?: number;
	category_id?: number;
	amount?: number;
	blocks?: {
		header?: string;
		description?: string;
		image?: string;
		details?: {
			characteristic?: string;
			description?: string;
		}[];
	}[];
}
export interface ProductDeleteBody {
	id: number;
}

export type ProductFullUpdateBody = ProductCreateBody;

export type ProductGetAllResponse =
	| ProductErrorResponse
	| ProductGetAllSuccessResponse;
export type ProductGetByIdResponse =
	| ProductErrorResponse
	| ProductGetByIdSuccessResponse;
export type ProductCreateResponse =
	| ProductErrorResponse
	| ProductGetByIdSuccessResponse;
export type ProductFullUpdateResponse =
	| ProductErrorResponse
	| ProductGetByIdSuccessResponse;
export type ProductPartialUpdateResponse =
	| ProductErrorResponse
	| ProductGetByIdSuccessResponse;
export type ProductDeleteResponse =
	| ProductErrorResponse
	| ProductDeleteSuccessResponse;

export interface ProductGetAllQuery {
	page?: string;
	limit?: string;
	skip?: string;
	take?: string;
	category_id?: string;
	min_price?: string;
	max_price?: string;
	discount?: string;
}

export interface ProductGetAllQueryParsed {
	page: number;
	limit: number;
	skip?: number | undefined;
	take?: number | undefined;
	category_id?: number | undefined;
	min_price?: number | undefined;
	max_price?: number | undefined;
	discount: boolean;
}

export interface ProductControllerContract {
	getAll: (
		req: Request<object, ProductGetAllResponse, object, ProductGetAllQuery>,
		res: Response<ProductGetAllResponse>,
	) => Promise<void>;
	getById: (
		req: Request<{ id: string }, ProductGetByIdResponse>,
		res: Response<ProductGetByIdResponse>,
	) => Promise<void>;
	create: (
		req: Request<object, ProductCreateResponse, ProductCreateBody>,
		res: Response<ProductCreateResponse>,
	) => Promise<void>;
	fullUpdate: (
		req: Request<
			{ id: string },
			ProductFullUpdateResponse,
			ProductFullUpdateBody
		>,
		res: Response<ProductFullUpdateResponse>,
	) => Promise<void>;
	delete: (
		req: Request<object, ProductDeleteResponse | null, ProductDeleteBody>,
		res: Response<ProductDeleteResponse | null>,
	) => Promise<void>;
	suggestions: (
		req: Request<
			object,
			ProductGetAllResponse,
			object,
			ProductSuggestionsQueryContract
		>,
		res: Response<ProductGetAllResponse>,
	) => Promise<void>;
}

export interface ProductServiceContract {
	getAll: (query: ProductGetAllQueryParsed) => Promise<ProductGetAllResponse>;
	getById: (id: number) => Promise<ProductGetByIdResponse>;
	create: (
		query: Omit<ProductCreateBody, "name_trigrams">,
	) => Promise<ProductCreateResponse>;
	fullUpdate: (
		query: ProductFullUpdateBody,
		id: number,
	) => Promise<ProductFullUpdateResponse>;
	delete: (id: number) => Promise<ProductDeleteResponse | null>;
	suggestions: (
		params: ProductSuggestionsParamsContract,
	) => Promise<ProductGetAllResponse>;
}

export interface ProductRepositoryContract {
	getAll: (
		skip?: number,
		take?: number,
		category_id?: number,
		min_price?: number,
		max_price?: number,
		discount?: boolean,
	) => Promise<Product[]>;
	getById: (id: number) => Promise<ProductDetail | null | undefined>;
	create: (product: ProductCreateBody) => Promise<ProductDetail>;
	fullUpdate: (
		query: ProductFullUpdateBody,
		id: number,
	) => Promise<ProductFullUpdateResponse>;
	delete: (id: number) => Promise<ProductDeleteResponse | null>;
	getNew: (
		offset?: number,
		limit?: number,
	) => Promise<Product[] | ProductErrorResponse>;
	getPopular: (
		offset?: number,
		limit?: number,
	) => Promise<ProductGetAllResponse>;
}

export type ProductWhereInput = Prisma.ProductWhereInput;

export interface ProductSuggestionsQueryContract {
	limit?: string;
	offset?: string;
	popular?: string;
	new?: string;
	sameAs?: string;
}

export interface ProductSuggestionsParamsContract {
	limit?: number;
	offset?: number;
	popular?: boolean;
	new?: boolean;
	sameAs?: string;
}
