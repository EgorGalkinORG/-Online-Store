import { Request, Response } from "express";
import { Prisma } from "../generated/prisma";

export type Category = Prisma.CategoryGetPayload<{}>;

export type CategoryCreateBody = Omit<Prisma.CategoryGetPayload<{}>, "id">;

export interface CategoryGetAllSuccessResponse {
	success: true;
	data: {
		categories: Category[];
	};
}
export interface CategoryGetByIdSuccessResponse {
	success: boolean;
	data: Category | null | undefined;
}

export interface CategoryErrorResponse {
	success: false;
	message: string;
}
export interface CategoryDeleteSuccessResponse {
	success: true;
	data: null;
}

export interface CategoryDeleteBody {
	id: number;
}

export type CategoryFullUpdateBody = CategoryCreateBody;

export type CategoryGetAllResponse =
	| CategoryErrorResponse
	| CategoryGetAllSuccessResponse;
export type CategoryGetByIdResponse =
	| CategoryErrorResponse
	| CategoryGetByIdSuccessResponse;
export type CategoryCreateResponse =
	| CategoryErrorResponse
	| CategoryGetByIdSuccessResponse;
export type CategoryFullUpdateResponse =
	| CategoryErrorResponse
	| CategoryGetByIdSuccessResponse;
export type CategoryPartialUpdateResponse =
	| CategoryErrorResponse
	| CategoryGetByIdSuccessResponse;
export type CategoryDeleteResponse =
	| CategoryErrorResponse
	| CategoryDeleteSuccessResponse;

export interface CategoryGetAllQuery {
	skip?: string;
	take?: string;
}

export interface CategoryGetAllQueryParsed {
	skip?: number | undefined;
	take?: number | undefined;
}

export interface CategoryControllerContract {
	getAll: (
		req: Request<
			object,
			CategoryGetAllResponse,
			object,
			CategoryGetAllQuery
		>,
		res: Response<CategoryGetAllResponse>,
	) => Promise<void>;
	getById: (
		req: Request<{ id: string }, CategoryGetByIdResponse>,
		res: Response<CategoryGetByIdResponse>,
	) => Promise<void>;
	create: (
		req: Request<object, CategoryCreateResponse, CategoryCreateBody>,
		res: Response<CategoryCreateResponse>,
	) => Promise<void>;
	fullUpdate: (
		req: Request<
			{ id: string },
			CategoryFullUpdateResponse,
			CategoryFullUpdateBody
		>,
		res: Response<CategoryFullUpdateResponse>,
	) => Promise<void>;
	delete: (
		req: Request<object, CategoryDeleteResponse | null, CategoryDeleteBody>,
		res: Response<CategoryDeleteResponse | null>,
	) => Promise<void>;
}

export interface CategoryServiceContract {
	getAll: (
		query: CategoryGetAllQueryParsed,
	) => Promise<CategoryGetAllResponse>;
	getById: (id: number) => Promise<CategoryGetByIdResponse>;
	create: (query: CategoryCreateBody) => Promise<CategoryCreateResponse>;
	fullUpdate: (
		query: CategoryFullUpdateBody,
		id: number,
	) => Promise<CategoryFullUpdateResponse>;
	delete: (id: number) => Promise<CategoryDeleteResponse | null>;
}

export interface CategoryRepositoryContract {
	getAll: (skip?: number, take?: number) => Promise<Category[]>;
	getById: (id: number) => Promise<Category | null | undefined>;
	create: (Category: CategoryCreateBody) => Promise<Category>;
	fullUpdate: (
		query: CategoryFullUpdateBody,
		id: number,
	) => Promise<CategoryFullUpdateResponse>;
	delete: (id: number) => Promise<CategoryDeleteResponse | null>;
}

export type CategoryWhereInput = Prisma.CategoryWhereInput;
