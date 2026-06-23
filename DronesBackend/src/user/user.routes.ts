import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../middlewares";

export const UserRouter = Router();
//
UserRouter.post("/users/register", UserController.register);
//
UserRouter.post("/users/login", UserController.login);
//
UserRouter.patch("/users/recovery", UserController.recovery);
//
UserRouter.patch("/users/recovery/:code", UserController.recoveryCode);

//
UserRouter.get("/users/me", authMiddleware, UserController.getUserInfo);
//
UserRouter.get(
	"/users/me/adresses",
	authMiddleware,
	UserController.getAddressesInfo,
);
//
UserRouter.patch("/users/me", authMiddleware, UserController.updateUser);
//
UserRouter.patch(
	"/users/me/addresses",
	authMiddleware,
	UserController.updateAddress,
);
//
UserRouter.post(
	"/users/me/addresses",
	authMiddleware,
	UserController.createAdress,
);
//
UserRouter.delete(
	"/users/me/adresses",
	authMiddleware,
	UserController.deleteAdress,
);
UserRouter.get("/users/me/order", authMiddleware, UserController.getUserOrders);
//
UserRouter.post(
	"/users/me/order/cancel",
	authMiddleware,
	UserController.cancelOrders,
);
UserRouter.get(
	"/users/me/order-status",
	authMiddleware,
	UserController.getOrderStatus,
);
UserRouter.post(
	"/users/me/order/create",
	authMiddleware,
	UserController.createOrder,
);

UserRouter.post("/support", UserController.support);
