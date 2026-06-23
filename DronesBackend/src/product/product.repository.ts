import { PRISMA_CLIENT } from "../config/client";
import {
	ProductCreateBody,
	ProductDeleteResponse,
	ProductRepositoryContract,
} from "./product.types";

function mapBlocksToPrismaCreate(blocks: ProductCreateBody["blocks"]) {
	return {
		create: blocks.map((block) => ({
			header: block.header,
			description: block.description,
			image: block.image,
			techDetails: {
				create: block.details.map((detail) => ({
					characteristic: detail.characteristic,
					description: detail.description,
				})),
			},
		})),
	};
}
export const ProductRepository: ProductRepositoryContract = {
	getAll: async (skip, take, category_id, min_price, max_price, discount) => {
		try {
			console.log(discount, typeof discount);
			return await PRISMA_CLIENT.product.findMany({
				...(skip !== undefined && { skip }),
				...(take !== undefined && { take }),
				where: {
					...(category_id ? { categoryId: category_id } : {}),

					...(min_price ? { price: { gte: min_price } } : {}),
					...(max_price ? { price: { lte: max_price } } : {}),
					// Дисконт на потом
					// ...(discount !== undefined ? { discount: discount ? { gt: 0 } : { equals: 0 }} : {} )
				},
				include: {
					category: true,
				},
			});
		} catch (error) {
			console.log(error);
			return [];
		}
	},
	getById: async (id) => {
		try {
			return PRISMA_CLIENT.product.findUnique({
				where: {
					id: id,
				},
				include: {
					category: true,
					blocks: {
						include: {
							techDetails: true,
						},
					},
				},
			});
		} catch (error) {
			console.log(error);
			throw Error;
		}
	},
	create: async (product) => {
		try {
			let {
				name,
				price,
				discount,
				category_id,
				blocks,
				amount,
				name_trigrams,
				image,
			} = product;

			const blocksPrismaFormat = mapBlocksToPrismaCreate(blocks);

			const categoryExists = await PRISMA_CLIENT.category.findUnique({
				where: { id: category_id },
			});

			if (!categoryExists) {
				throw new Error(`category not found`);
			}

			return PRISMA_CLIENT.product.create({
				data: {
					name,
					price,
					discount,
					amount,
					name_trigrams,
					image,
					category: {
						connect: {
							id: category_id,
						},
					},

					blocks: blocksPrismaFormat,
				},

				include: {
					category: true,
					blocks: {
						include: {
							techDetails: true,
						},
					},
				},
			});
		} catch (error) {
			console.log(error);
			throw new Error("undefined error");
		}
	},
	fullUpdate: async (query, id) => {
		try {
			let { name, price, discount, category_id, blocks, amount } = query;

			const blocksPrismaFormat = mapBlocksToPrismaCreate(blocks);

			const categoryExists = await PRISMA_CLIENT.category.findUnique({
				where: { id: category_id },
			});

			if (!categoryExists) {
				throw new Error(`category not found`);
			}

			let updatedd = await PRISMA_CLIENT.product.update({
				where: { id },
				data: {
					name,
					price,
					discount,
					amount,

					category: {
						connect: {
							id: category_id,
						},
					},

					blocks: blocksPrismaFormat,
				},

				include: {
					category: true,
					blocks: {
						include: {
							techDetails: true,
						},
					},
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
			let result: ProductDeleteResponse = {
				success: false,
				message: "Server Error",
			};
			return result;
		}
	},
	getNew: async (offset, limit) => {
		try {
			return await PRISMA_CLIENT.product.findMany({
				include: {
					category: true,
				},
				orderBy: {
					id: "desc",
				},
				skip: offset || 0,
				take: limit || 3,
			});
		} catch (error) {
			console.log(error);
			let result: ProductDeleteResponse = {
				success: false,
				message: "Server Error",
			};
			return result;
		}
	},
	getPopular: async (offset, limit) => {
		try {
			const popular = await PRISMA_CLIENT.orderDetail.groupBy({
				by: ["productId"],
				_sum: {
					quantity: true,
				},
				orderBy: {
					_sum: {
						quantity: "desc",
					},
				},
			});
			const productIds = popular.map((p) => p.productId);

			let result = await PRISMA_CLIENT.product.findMany({
				where: {
					id: { in: productIds },
				},
				include: {
					category: true,
				},
				skip: offset || 0,
				take: limit || 10,
			});
			return {
				success: true,
				data: {
					products: result,
				},
			};
		} catch (error) {
			console.log(error);
			let result: ProductDeleteResponse = {
				success: false,
				message: "Server Error",
			};
			return result;
		}
	},
};
