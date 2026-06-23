import { PRISMA_CLIENT } from "../config/client";
import {
	CategoryCreateBody,
	CategoryDeleteResponse,
	CategoryRepositoryContract,
} from "./category.types";

export const CategoryRepository: CategoryRepositoryContract = {
	getAll: async (skip, take) => {
		try {
			return await PRISMA_CLIENT.category.findMany({
				...(skip !== undefined && { skip }),
				...(take !== undefined && { take }),
			});
		} catch (error) {
			console.log(error);
			return [];
		}
	},
	getById: async (id) => {
		try {
			return PRISMA_CLIENT.category.findUnique({
				where: {
					id: id,
				},
			});
		} catch (error) {
			console.log(error);
			throw Error;
		}
	},
	create: async (product) => {
		try {
			let { title, image } = product;

			return PRISMA_CLIENT.category.create({
				data: {
					title,
					image,
				},
			});
		} catch (error) {
			console.log(error);
			throw new Error("undefined error");
		}
	},
	fullUpdate: async (query, id) => {
		try {
			let { title, image } = query;

			let updatedd = await PRISMA_CLIENT.category.update({
				where: { id },
				data: {
					title,
					image,
				},
			});
			return {
				success: true,
				data: updatedd,
			};
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Server Error",
			};
		}
	},
	delete: async (id) => {
		try {
			await PRISMA_CLIENT.product.delete({
				where: {
					id: id,
				},
			});
			return null;
		} catch (error) {
			console.log(error);
			let result: CategoryDeleteResponse = {
				success: false,
				message: "Server Error",
			};
			return result;
		}
	},
};
