import express from "express";
import { CategoryController } from "./category.controller";

const CategoryRouter: express.Router = express.Router();

CategoryRouter.get("/categories", CategoryController.getAll);
CategoryRouter.get("/categories/:id", CategoryController.getById);
CategoryRouter.post("/categories", CategoryController.create);
CategoryRouter.patch("/categories/:id", CategoryController.fullUpdate);
CategoryRouter.delete("/categories/:id", CategoryController.delete);

export { CategoryRouter };
