import { UserRepositoryContract } from "./user.types";
import { PRISMA_CLIENT } from "../config/client";

export const UserRepository: UserRepositoryContract = {
	async createUser(email, password, username) {
		try {
			const existingUser = await PRISMA_CLIENT.user.findUnique({
				where: { email },
			});
			const existingUser2 = await PRISMA_CLIENT.user.findUnique({
				where: { username },
			});
			if (existingUser !== null || existingUser2 !== null) {
				return "duplicate";
			}
			const user = await PRISMA_CLIENT.user.create({
				data: {
					email,
					password,
					username,
					name: "",
					surname: "",
				},
			});
			return "created";
		} catch (error) {
			console.error(error);
			return null;
		}
	},
	async updateUser(data) {
		try {
			if (!data.id) {
				throw new Error("User ID is required for update");
			}
			const user = await PRISMA_CLIENT.user.update({
				where: { id: data.id },
				data,
			});
			return user;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	async updateUserPassword(userId, password) {
		try {
			const user = await PRISMA_CLIENT.user.update({
				where: { id: userId },
				data: { password },
			});
			return user;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	async getById(userId) {
		try {
			const user = await PRISMA_CLIENT.user.findUnique({
				where: { id: userId },
				omit: {
					password: true,
					id: true,
					recoveryCode: true,
				},
			});
			return user;
		} catch (error) {
			console.error(error);
			return null;
		}
	},

	async getOrders(userId) {
		try {
			const order = await PRISMA_CLIENT.order.findFirst({
				where: { userId },
				include: {
					orderDetails: true,
				},
			});
			return order;
		} catch (error) {
			console.error(error);
			return null;
		}
	},
	async cancelOrder(orderId) {
		try {
			const order = await PRISMA_CLIENT.order.delete({
				where: { id: orderId },
			});
			return null;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	async getAddresses(userId) {
		try {
			const addresses = await PRISMA_CLIENT.address.findMany({
				where: { userId },
			});
			return addresses;
		} catch (error) {
			console.error(error);
			return [];
		}
	},
	async createAddress(data) {
		const { id, userId, city, street, houseNumber, flat, entrance } = data;
		try {
			const address = await PRISMA_CLIENT.address.create({
				data: {
					id,
					userId,
					city,
					street,
					houseNumber,
					flat,
					entrance,
				},
			});
			return address;
		} catch (error) {
			console.error(error);
			return null;
		}
	},
	async deleteAddress(addressId) {
		try {
			await PRISMA_CLIENT.address.delete({
				where: { id: addressId },
			});
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	},
	async updateAddress(addressId, data) {
		try {
			const address = await PRISMA_CLIENT.address.update({
				where: { id: addressId },
				data,
			});
			return address;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	async getByEmail(email) {
		try {
			const user = await PRISMA_CLIENT.user.findUnique({
				where: { email },
			});
			return user;
		} catch (error) {
			console.error(error);
			return null;
		}
	},
	userSetRecovery: async (email, code) => {
		try {
			await PRISMA_CLIENT.user.update({
				where: {
					email,
				},
				data: {
					recoveryCode: code,
				},
			});
			return "success";
		} catch (error) {
			console.error(error);
			return "error";
		}
	},
	createOrder: async (data) => {
		try {
			const { orderDetails, id, ...orderData } = data;
			const order = await PRISMA_CLIENT.order.create({
				data: {
					...orderData,
					orderDetails: {
						create: data.orderDetails.map((detail) => ({
							quantity: detail.quantity,
							price: detail.price,
							productId: detail.productId,
						})),
					},
				},
				include: {
					orderDetails: true,
				},
			});
			return order;
		} catch (error) {
			console.error("Error creating order:", error);
			return null;
		}
	},
};
