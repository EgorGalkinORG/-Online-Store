import express from "express";
import { ProductRouter } from "./product/product.routes";
import { CategoryRouter } from "./category/category.routes";
import { UserRouter } from "./user/user.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import cors from "cors";

const app: express.Express = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(ProductRouter);
app.use(CategoryRouter);
app.use(UserRouter);

const PORT: number = 8000;
const HOST: string = "localhost";
const PROTOCOL: string = `http`;

app.listen(PORT, HOST, () => {
	console.log(`Server started on ${PROTOCOL}://${HOST}:${PORT}`);
});
