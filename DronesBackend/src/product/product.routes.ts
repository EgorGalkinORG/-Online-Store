import express from "express";
import { ProductController } from "./product.controller";

const ProductRouter: express.Router = express.Router();

ProductRouter.get("/products", ProductController.getAll);
ProductRouter.post("/products", ProductController.create);
ProductRouter.get("/products/suggestions", ProductController.suggestions);
ProductRouter.get("/products/:id", ProductController.getById);
ProductRouter.patch("/products/:id", ProductController.fullUpdate);
ProductRouter.delete("/products/:id", ProductController.delete);
// ProductRouter.patch("/products/:id", ProductController.partialUpdate);

export { ProductRouter };
