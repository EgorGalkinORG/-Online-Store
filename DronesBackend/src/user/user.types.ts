import { JwtPayload } from "jsonwebtoken";
import { Prisma } from "../generated/prisma";
import { Request, Response } from "express";

export interface UserCreate {
	email: string;
	password: string;
	name: string;
}

export type OrderDetailsType = Prisma.OrderDetailGetPayload<{}>;
export type OrderType = Prisma.OrderGetPayload<{
	include: {
		orderDetails: true;
	};
}>;
export type AddressType = Omit<Prisma.AddressGetPayload<{}>, "userId">;
export type AddressTypeCreate = Prisma.AddressGetPayload<{}>;
export type UserType = Prisma.UserGetPayload<{}>;
export type UserCreateType = Prisma.UserUncheckedCreateInput;

export interface UserErrorResponse {
	success: false;
	message: string;
}

export interface UserSuccessResponse {
	success: true;
	data: {};
}

export interface UserLoginSuccessResponse {
	success: true;
	data: {
		jwt: string;
	};
}

export interface UserMeSuccessResponse {
	success: true;
	data: Partial<
		Omit<
			Prisma.UserGetPayload<{}>,
			"password" | "recoveryCode" | "id" | "username"
		>
	>;
}

export interface UserAddressesSuccessResponse {
	success: true;
	data: {
		id: number;
		city: string;
		street: string;
		houseNumber: string;
		flat: string | null;
		entrance: string | null;
	}[];
}

export type UserMePatch = Partial<
	Omit<UserType, "id" | "username" | "password" | "recoveryCode">
>;
export type UserMePatchRepository = Partial<
	Omit<UserType, "username" | "password" | "recoveryCode">
>;

export interface UserAddressesPatch {
	id: number;
	city: string;
	street: string;
	houseNumber: string;
	flat: string | null;
	entrance: string | null;
}

export interface UserAddressesPatchSuccessResponse {
	success: true;
	data: {
		id: number;
		city: string;
		street: string;
		houseNumber: string;
		flat: string | null;
		entrance: string | null;
	};
}

export interface UserOrderSuccessResponse {
	success: true;
	data:
		| ({
				orderDetails: {
					id: number;
					quantity: number;
					price: number;
					orderId: number;
					productId: number;
				}[];
		  } & {
				name: string;
				id: number;
				email: string;
				phoneNumber: string | null;
				surname: string;
				middleName: string | null;
				deliveryAddress: string;
				commentForOrder: string | null;
				novaPostOrderNumber: string | null;
				departureNumber: string | null;
				typeOfPayment: string;
				priceReduced: number | null;
				fullPrice: number;
				userId: number;
				addressId: number;
		  })
		| null;
}

export interface UserOrderStatusSuccessResponse {
	success: true;
	data: {
		orders: {
			novaPostOrderNumber: number;
			status: string;
		}[];
	};
}

export interface Support {
	name: string;
	number: string;
	email: string;
	description: string;
}

export interface UserServiceContract {
	register(
		userData: UserCreate,
	): Promise<UserSuccessResponse | UserErrorResponse>;
	login(
		email: string,
		password: string,
	): Promise<UserErrorResponse | UserLoginSuccessResponse>;
	recovery(
		email: string,
		code: string,
	): Promise<UserSuccessResponse | UserErrorResponse>;
	recoveryCode(
		userId: number,
		password: string,
	): Promise<UserSuccessResponse | UserErrorResponse>;
	me(jwt: string): Promise<UserErrorResponse | UserMeSuccessResponse>;
	addresses(
		jwt: string,
	): Promise<UserErrorResponse | UserAddressesSuccessResponse>;
	patchMe(
		jwt: string,
		body: UserMePatch,
	): Promise<UserErrorResponse | UserMeSuccessResponse>;
	patchAddresses(
		jwt: string,
		body: UserAddressesPatch,
	): Promise<UserErrorResponse | UserAddressesPatchSuccessResponse>;
	postAddresses(
		jwt: string,
		body: UserAddressesPatch,
	): Promise<UserErrorResponse | UserAddressesPatchSuccessResponse>;
	deleteAddresses(
		id: number,
	): Promise<UserErrorResponse | UserSuccessResponse>;
	orders(jwt: string): Promise<UserErrorResponse | UserOrderSuccessResponse>;
	orderCancel(
		orderId: number,
	): Promise<UserErrorResponse | UserSuccessResponse>;
	orderStatus(
		jwt: string,
	): Promise<UserErrorResponse | UserOrderStatusSuccessResponse>;
	postOrder(
		jwt: string,
		body: OrderType,
	): Promise<UserErrorResponse | UserSuccessResponse>;
	support(message: Support): Promise<UserErrorResponse | UserSuccessResponse>;
}

export interface UserRepositoryContract {
	getOrders(userId: number): Promise<OrderType | null>;
	cancelOrder(orderId: number): Promise<null>;
	createOrder(data: OrderType): Promise<OrderType | null>;
	getAddresses(userId: number): Promise<AddressType[]>;
	createAddress(data: AddressTypeCreate): Promise<AddressTypeCreate | null>;
	deleteAddress(addressId: number): Promise<boolean>;
	updateAddress(addressId: number, data: AddressType): Promise<AddressType>;
	createUser(
		email: string,
		password: string,
		name: string,
	): Promise<"created" | "duplicate" | null>;
	updateUser(
		data: UserMePatchRepository,
	): Promise<UserMePatchRepository | null>;
	updateUserPassword(userId: number, password: string): Promise<UserType>;
	getByEmail(email: string): Promise<UserType | null>;
	getById(
		userId: number,
	): Promise<Omit<UserType, "id" | "password" | "recoveryCode"> | null>;
	userSetRecovery(email: string, code: string): Promise<string>;
	// userClearRecovery(email: string): Promise<string>
}

export type ControllerAddressType = Prisma.AddressGetPayload<{}>;

interface ControllerSupportBody {
	name: string;
	number: string;
	email: string;
	description: string;
}
interface ControllerLoginBody {
	email: string;
	password: string;
}
interface ControllerRegisterBody {
	name: string;
	password: string;
	email: string;
}
interface ControllerSuccessResponse {
	success: true;
	data: {};
}
interface ControllerErrorResponse {
	success: false;
	message: string;
}
interface ControllerRecoveryBody {
	email: string;
}
interface ControllerRecoveryCodeBody {
	password: string;
}
interface ControllerGetUserInfoBody {
	name: string | null;
	surname: string | null;
	middleName: string | null;
	email: string;
	phoneNumber: string | null;
	birthday: string | null;
}
interface ControllerGetAdressesInfoBody {
	id: number;
	city: string;
	street: string;
	houseNumber: string;
	flat: string | null;
	entrance: string | null;
}
[];
interface ControllerGetUserOrdersBody {
	orderDetails:
		| ({
				id: number;
				quantity: number;
				price: number;
				orderId: number;
				productId: number;
		  }[] & {
				name: string;
				id: number;
				email: string;
				phoneNumber: string | null;
				surname: string;
				middleName: string | null;
				deliveryAddress: string;
				commentForOrder: string | null;
				novaPostOrderNumber: string | null;
				departureNumber: string | null;
				typeOfPayment: string;
				priceReduced: number | null;
				fullPrice: number;
				userId: number;
				addressId: number;
		  })
		| null;
}

export interface UserControllerContract {
	register: (
		req: Request<
			object,
			ControllerSuccessResponse | ControllerErrorResponse,
			ControllerRegisterBody
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;
	login: (
		req: Request<
			object,
			ControllerSuccessResponse | ControllerErrorResponse,
			ControllerLoginBody
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;
	recovery: (
		req: Request<
			object,
			ControllerSuccessResponse | ControllerErrorResponse,
			ControllerRecoveryBody
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;
	recoveryCode: (
		req: Request<
			{ code: string },
			ControllerSuccessResponse | ControllerErrorResponse,
			ControllerRecoveryCodeBody,
			object,
			{ jwt: string }
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;
	support: (
		req: Request<
			object,
			ControllerSuccessResponse | ControllerErrorResponse,
			ControllerSupportBody
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;

	getUserInfo: (
		req: Request<
			{ userId: string },
			ControllerSuccessResponse | ControllerErrorResponse,
			ControllerGetUserInfoBody,
			object,
			{ jwt: string }
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;

	getAddressesInfo: (
		req: Request<
			object,
			ControllerSuccessResponse | ControllerErrorResponse,
			ControllerGetAdressesInfoBody,
			object,
			{ jwt: string }
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;

	updateUser: (
		req: Request<
			object,
			ControllerSuccessResponse | ControllerErrorResponse,
			UserMePatch,
			object,
			{ jwt: string }
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;

	updateAddress: (
		req: Request<
			{ id: string },
			ControllerSuccessResponse | ControllerErrorResponse,
			ControllerAddressType
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;

	createAdress: (
		req: Request<
			object,
			ControllerSuccessResponse | ControllerErrorResponse,
			ControllerAddressType
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;

	deleteAdress: (
		req: Request<
			{ id: string },
			ControllerSuccessResponse | ControllerErrorResponse
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;

	getUserOrders: (
		req: Request<
			object,
			ControllerSuccessResponse | ControllerErrorResponse,
			ControllerGetUserOrdersBody
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;

	cancelOrders: (
		req: Request<
			{ orderId: string },
			ControllerSuccessResponse | ControllerErrorResponse
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;

	getOrderStatus: (
		req: Request<
			object,
			ControllerSuccessResponse | ControllerErrorResponse
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;

	createOrder: (
		req: Request<
			object,
			ControllerSuccessResponse | ControllerErrorResponse,
			OrderType,
			object,
			{ jwt: string }
		>,
		res: Response<ControllerSuccessResponse | ControllerErrorResponse>,
	) => Promise<void>;
}
