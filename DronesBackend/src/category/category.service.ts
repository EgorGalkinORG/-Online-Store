import { CategoryRepository } from "./category.repository";
import {
	CategoryErrorResponse,
	CategoryGetAllSuccessResponse,
	CategoryGetByIdResponse,
	CategoryGetByIdSuccessResponse,
	CategoryServiceContract,
	CategoryWhereInput,
} from "./category.types";
import { DuplicateError } from "./errors";

export const CategoryService: CategoryServiceContract = {
	getAll: async (query) => {
		try {
			let { skip, take } = query;

			const products = await CategoryRepository.getAll(skip, take);
			let response: CategoryGetAllSuccessResponse = {
				success: true,
				data: {
					categories: products ?? [],
				},
			};
			return response;
		} catch (error) {
			console.log(error);
			let response: CategoryErrorResponse = {
				success: false,
				message: "Server error",
			};
			return response;
		}
	},
	getById: async (id) => {
		try {
			const product = await CategoryRepository.getById(id);

			let response: CategoryGetByIdSuccessResponse = {
				success: true,
				data: product,
			};
			return response;
		} catch (error) {
			console.log(error);
			let response: CategoryErrorResponse = {
				success: false,
				message: "Server error",
			};
			return response;
		}
	},
	create: async (product) => {
		try {
			const createdCategory = await CategoryRepository.create(product);

			const response: CategoryGetByIdSuccessResponse = {
				success: true,
				data: createdCategory,
			};
			return response;
		} catch (error) {
			let errorMessage = "Server Error";

			if (error instanceof DuplicateError) {
				errorMessage = error.message;
			} else {
				console.error("unhandled err: ", error);
			}

			const errorResponse: CategoryErrorResponse = {
				success: false,
				message: errorMessage,
			};

			return errorResponse;
		}
	},
	fullUpdate: async (product, id) => {
		try {
			const updatedCategory = await CategoryRepository.fullUpdate(
				product,
				id,
			);

			return updatedCategory;
		} catch (error) {
			let errorMessage = "Server Error";
			console.error("unhandled err: ", error);

			const errorResponse: CategoryErrorResponse = {
				success: false,
				message: errorMessage,
			};

			return errorResponse;
		}
	},
	delete: async (id) => {
		try {
			let deleted = await CategoryRepository.delete(id);
			return null;
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Server error",
			};
		}
	},
};
