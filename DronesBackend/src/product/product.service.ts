import { privateDecrypt } from "crypto";
import { ProductRepository } from "./product.repository";
import {
	ProductErrorResponse,
	ProductGetAllSuccessResponse,
	ProductGetByIdResponse,
	ProductGetByIdSuccessResponse,
	ProductServiceContract,
	ProductWhereInput,
	Product,
} from "./product.types";
import { DuplicateError } from "./errors";

const SIMILARITY_THRESHOLD = 0.5;
const PRICE_DELTA = 500;

export function generateTrigrams(text: string): string[] {
	const normalized = text.toLowerCase().trim().replace(/\s+/g, " ");
	const padded = `  ${normalized} `;
	const trigrams: string[] = [];

	for (let i = 0; i < padded.length - 2; i++) {
		trigrams.push(padded.slice(i, i + 3));
	}

	return trigrams;
}

export function prepareTrigramsForDB(text: string): string {
	return generateTrigrams(text).join(",");
}

export function calculateSimilarity(
	trigrams1: string[],
	trigrams2: string[],
): number {
	const set1 = new Set(trigrams1);
	const set2 = new Set(trigrams2);

	const intersection = new Set([...set1].filter((x) => set2.has(x)));
	const union = new Set([...set1, ...set2]);

	return union.size === 0 ? 0 : intersection.size / union.size;
}

export const ProductService: ProductServiceContract = {
	getAll: async (query) => {
		try {
			let {
				page,
				limit,
				skip,
				take,
				category_id,
				min_price,
				max_price,
				discount,
			} = query;

			const products = await ProductRepository.getAll(
				skip,
				take,
				category_id,
				min_price,
				max_price,
				discount,
			);
			let response: ProductGetAllSuccessResponse = {
				success: true,
				data: {
					products: products ?? [],
				},
			};
			return response;
		} catch (error) {
			console.log(error);
			let response: ProductErrorResponse = {
				success: false,
				message: "Server error",
			};
			return response;
		}
	},
	getById: async (id) => {
		try {
			const product = await ProductRepository.getById(id);

			let response: ProductGetByIdSuccessResponse = {
				success: true,
				data: product,
			};
			return response;
		} catch (error) {
			console.log(error);
			let response: ProductErrorResponse = {
				success: false,
				message: "Server error",
			};
			return response;
		}
	},
	create: async (product) => {
		try {
			let name_trigrams = prepareTrigramsForDB(product.name);
			let query = { ...product, name_trigrams};
			const createdProduct = await ProductRepository.create(query);

			const response: ProductGetByIdSuccessResponse = {
				success: true,
				data: createdProduct,
			};
			return response;
		} catch (error) {
			let errorMessage = "Server Error";

			if (error instanceof DuplicateError) {
				errorMessage = error.message;
			} else {
				console.error("unhandled err: ", error);
			}

			const errorResponse: ProductErrorResponse = {
				success: false,
				message: errorMessage,
			};

			return errorResponse;
		}
	},
	fullUpdate: async (product, id) => {
		try {
			const updatedProduct = await ProductRepository.fullUpdate(
				product,
				id,
			);

			return updatedProduct;
		} catch (error) {
			let errorMessage = "Server Error";
			console.error("unhandled err: ", error);

			const errorResponse: ProductErrorResponse = {
				success: false,
				message: errorMessage,
			};

			return errorResponse;
		}
	},
	delete: async (id) => {
		try {
			let deleted = await ProductRepository.delete(id);
			return null;
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Server error",
			};
		}
	},
	suggestions: async (params) => {
		try {
			let { limit, offset, popular, new: isNew, sameAs } = params;

			limit = limit ?? 10;
			offset = offset ?? 0;

			if (popular && isNew) {
				return {
					success: false,
					message:
						"Parameters 'popular' and 'new' cannot be used together",
				};
			}
			let result: Product[];

			if (sameAs) {
				let products = await ProductRepository.getAll(
					+sameAs,
					offset,
					limit,
				);

				if (!Array.isArray(products)) {
					return products;
				}

				let sameAsProduct = await ProductRepository.getById(+sameAs);
				if (!sameAsProduct || !sameAsProduct.name_trigrams) {
					return {
						success: false,
						message: "sameAs product was not found",
					};
				}

				let sameAsTrigrams = sameAsProduct.name_trigrams.split(",");
				const targetPrice = sameAsProduct.price;
				const targetCategory = sameAsProduct.categoryId;

				let similarByName = products
					.filter((product) => {
						if (!product.name_trigrams) return false;

						const productTrigrams =
							product.name_trigrams.split(",");
						const similarity = calculateSimilarity(
							sameAsTrigrams,
							productTrigrams,
						);

						return similarity >= SIMILARITY_THRESHOLD;
					})
					.sort((a, b) => {
						const similarityA = calculateSimilarity(
							sameAsTrigrams,
							a.name_trigrams!.split(","),
						);
						const similarityB = calculateSimilarity(
							sameAsTrigrams,
							b.name_trigrams!.split(","),
						);
						return similarityB - similarityA;
					});

				if (similarByName.length >= limit) {
					result = similarByName.slice(0, limit);
				} else {
					let remainingLimit = limit - similarByName.length;
					let similarByCategory = products
						.filter((product) => {
							const alreadyAdded = similarByName.some(
								(p) => p.id === product.id,
							);
							return (
								!alreadyAdded &&
								product.categoryId === targetCategory
							);
						})
						.slice(0, remainingLimit);

					let combined = [...similarByName, ...similarByCategory];
					if (combined.length >= limit) {
						result = combined.slice(0, limit);
					} else {
						remainingLimit = limit - combined.length;
						let similarByPrice = products
							.filter((product) => {
								const alreadyAdded = combined.some(
									(p) => p.id === product.id,
								);
								const isInPriceRange =
									Math.abs(product.price - targetPrice) <=
									PRICE_DELTA;
								return !alreadyAdded && isInPriceRange;
							})
							.sort((a, b) => {
								const priceDiffA = Math.abs(
									a.price - targetPrice,
								);
								const priceDiffB = Math.abs(
									b.price - targetPrice,
								);
								return priceDiffA - priceDiffB;
							})
							.slice(0, remainingLimit);
						result = [...combined, ...similarByPrice];
					}
					console.log(result);
				}
			} else if (popular) {
				const products = await ProductRepository.getPopular(offset, limit);
				if (!Array.isArray(products)) {
					return products;
				}
				result = products;
			} else if (isNew) {
				const products = await ProductRepository.getNew(offset, limit);
				if (!Array.isArray(products)) {
					return products;
				}
				result = products;
			} else {
				result = await ProductRepository.getAll(offset, limit);
			}
			return {
				success: true,
				data: { products: result },
			};
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Server error",
			};
		}
	},
};
