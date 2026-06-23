import { CategoryService } from "./category.service";
import {
	CategoryControllerContract,
	CategoryGetByIdSuccessResponse,
} from "./category.types";

export const CategoryController: CategoryControllerContract = {
	getAll: async (req, res) => {
		try {
			let { skip, take } = req.query;

			let parsedSkip = skip ? +skip : undefined;
			let parsedTake = take ? +take : undefined;

			let errorMessage: string | null = null;

			switch (true) {
				case parsedSkip !== undefined && isNaN(parsedSkip):
					errorMessage = "Invalid skip parameter";
					break;
				case parsedTake !== undefined && isNaN(parsedTake):
					errorMessage = "Invalid take parameter";
					break;
			}
			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}
			const query = { skip: parsedSkip, take: parsedTake };

			let products = await CategoryService.getAll(query);

			res.status(200).json(products);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: "Server error",
			});
		}
	},
	getById: async (req, res) => {
		try {
			let parsedId = +req.params.id;
			let errorMessage = "";

			switch (true) {
				case isNaN(parsedId) || parsedId < 1:
					errorMessage = "Invalid id path parameter";
					break;
			}
			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}
			let product = await CategoryService.getById(parsedId);

			res.status(200).json(product);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: "Server error",
			});
		}
	},
	create: async (req, res) => {
		try {
			let { title, image } = req.body;
			let errorMessage: string | null = null;
			switch (true) {
				case typeof title !== "string" || title.length < 3:
					errorMessage = "Invalid name";
					break;
				case typeof image !== "string" || image.length < 3:
					errorMessage = "Invalid image";
					break;

				default:
					break;
			}

			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}

			let product = await CategoryService.create(req.body);
			res.status(201).json(product);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: "Server error",
			});
		}
	},
	fullUpdate: async (req, res) => {
		try {
			let { title, image } = req.body;
			let parsedId = +req.params.id;
			let errorMessage: string | null = null;
			switch (true) {
				case typeof title !== "string" || title.length < 3:
					errorMessage = "Invalid name";
					break;
				case typeof image !== "string" || image.length < 3:
					errorMessage = "Invalid image";
					break;
				case isNaN(parsedId) || parsedId < 1:
					errorMessage = "Invalid id path parameter";
					break;

				default:
					break;
			}
			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}

			let category = await CategoryService.fullUpdate(req.body, parsedId);
			res.status(200).json(category);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: "Server error",
			});
		}
	},

	delete: async (req, res) => {
		try {
			let parsedId = +req.body.id;
			let errorMessage: string | null = null;
			switch (true) {
				case isNaN(parsedId) || parsedId < 1:
					errorMessage = "Invalid id parameter";
					break;
				default:
					break;
			}

			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
				return;
			}
			let result = await CategoryService.delete(parsedId);

			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: "Server error",
			});
		}
	},
};
