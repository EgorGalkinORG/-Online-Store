import bcrypt from "bcryptjs";
import {
	sign,
	verify,
	JwtPayload,
	JsonWebTokenError,
	TokenExpiredError,
} from "jsonwebtoken";
import { UserRepository } from "./user.repository";
import { UserServiceContract } from "./user.types";
import { env } from "../config/env";
import { transporter } from "../config";

export function verifyAndDecodeJwt(token: string): JwtPayload | null {
	try {
		const decoded = verify(token, env.SECRET_KEY) as JwtPayload;
		return decoded;
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			console.error("token was expired");
		} else if (error instanceof JsonWebTokenError) {
			console.error("Envalid token");
		} else {
			console.error("verify error JWT:", error);
		}
		return null;
	}
}

export const userService: UserServiceContract = {
	async login(email, password) {
		try {
			const user = await UserRepository.getByEmail(email);
			if (user == null) {
				return { success: false, message: "Invalid credentials" };
			}
			let isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return { success: false, message: "Invalid credentials" };
			}
			return {
				success: true,
				data: {
					jwt: sign({ userId: user.id }, env.SECRET_KEY, {
						expiresIn: "7d",
					}),
				},
			};
		} catch (error) {
			console.log(error);
			return { success: false, message: "Unhandled error" };
		}
	},
	async register(body) {
		const { password, email, name } = body;
		try {
			const cryptedPassword = await bcrypt.hash(password, 12);
			const user = await UserRepository.createUser(
				email,
				cryptedPassword,
				name,
			);
			console.log(user);
			if (!user) {
				return { success: false, message: "" };
			}
			if (user === "created") {
				return { success: true, data: {} };
			}
			if (user === "duplicate") {
				return { success: false, message: "Integrity error" };
			}
			return { success: false, message: "Unhandled error" };
		} catch (error) {
			console.log(error);
			return { success: false, message: "Unhandled error" };
		}
	},
	async me(jwt) {
		try {
			let decoded = verifyAndDecodeJwt(jwt);
			if (!decoded || decoded.userId === undefined) {
				return {
					success: false,
					message: "invalid JWT",
				};
			}
			const userId: number = decoded.userId;
			const userData = await UserRepository.getById(userId);
			if (!userData) {
				return {
					success: false,
					message: "User not found",
				};
			}
			return {
				success: true,
				data: userData,
			};
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
	support: async (parsedBody) => {
		try {
			let { name, email, number, description } = parsedBody;
			await transporter.sendMail({
				from: env.PROJECT_MAIL,
				to: env.DEVELOPER_MAIL,
				subject: `🔔 New Support Ticket - ${name}`,
				html: `
				Hey there,
				
				You've got a new support ticket coming through!
				<br>
				<br>

				FROM: <b>${name}</b>
				<br>
				EMAIL: <b>${email}</b>
				<br>
				PHONE: <b>${number}</b>

				<br>
				<br>
				WHAT'S UP:
				${description}

				<br>
				<br>
				Hit 'em back ASAP to keep things smooth!
				<br>
				Your Drones Support Bot 🤖
				
				`,
			});
			console.log("Support message successfuly sended");
			return {
				success: true,
				data: {},
			};
		} catch (error) {
			console.log("error");
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
	recovery: async (email, code) => {
		try {
			const response = await UserRepository.userSetRecovery(email, code);
			if (response === "success") {
				return {
					success: true,
					data: {},
				};
			}
			if (response === "error") {
				return {
					success: false,
					message: "Unhandled Error",
				};
			}
			return {
				success: false,
				message: "Unhandled Error",
			};
		} catch (error) {
			console.log("error");
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
	recoveryCode: async (userId, password) => {
		try {
			const user = await UserRepository.updateUserPassword(
				userId,
				password,
			);
			if (!user) {
				return {
					success: false,
					message: "Invalid recovery code",
				};
			}
			return {
				success: true,
				data: {},
			};
		} catch (error) {
			console.log("error");
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
	addresses: async (jwt) => {
		try {
			let decoded = verifyAndDecodeJwt(jwt);
			if (!decoded || decoded.userId === undefined) {
				return {
					success: false,
					message: "invalid JWT",
				};
			}
			const userId: number = decoded.userId;
			const addresses = await UserRepository.getAddresses(userId);
			return {
				success: true,
				data: addresses,
			};
		} catch (error) {
			console.log("error");
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
	patchMe: async (jwt, body) => {
		try {
			let decoded = verifyAndDecodeJwt(jwt);
			if (!decoded || decoded.userId === undefined) {
				return {
					success: false,
					message: "invalid JWT",
				};
			}
			const userId: number = decoded.userId;
			const updatedUser = await UserRepository.updateUser({
				...body,
				id: userId,
			});
			if (!updatedUser) {
				return {
					success: false,
					message: "Unhandled error",
				};
			}
			return {
				success: true,
				data: updatedUser,
			};
		} catch (error) {
			console.log("error");
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
	patchAddresses: async (jwt, body) => {
		try {
			let decoded = verifyAndDecodeJwt(jwt);
			if (!decoded || decoded.userId === undefined) {
				return {
					success: false,
					message: "invalid JWT",
				};
			}
			const userId: number = decoded.userId;
			const updatedAddress = await UserRepository.updateAddress(body.id, {
				id: body.id,
				city: body.city,
				street: body.street,
				houseNumber: body.houseNumber,
				flat: body.flat,
				entrance: body.entrance,
			});
			if (!updatedAddress) {
				return {
					success: false,
					message: "Unhandled error",
				};
			}
			return {
				success: true,
				data: {
					id: updatedAddress.id,
					city: updatedAddress.city,
					street: updatedAddress.street,
					houseNumber: updatedAddress.houseNumber,
					flat: updatedAddress.flat,
					entrance: updatedAddress.entrance,
				},
			};
		} catch (error) {
			console.log("error");
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
	postAddresses: async (jwt, body) => {
		try {
			let decoded = verifyAndDecodeJwt(jwt);
			if (!decoded || decoded.userId === undefined) {
				return {
					success: false,
					message: "invalid JWT",
				};
			}
			const userId: number = decoded.userId;
			const newAddress = await UserRepository.createAddress({
				userId: userId,
				id: body.id,
				city: body.city,
				street: body.street,
				houseNumber: body.houseNumber,
				flat: body.flat,
				entrance: body.entrance,
			});
			if (!newAddress) {
				return {
					success: false,
					message: "Unhandled error",
				};
			}
			return {
				success: true,
				data: {
					id: newAddress.id,
					city: newAddress.city,
					street: newAddress.street,
					houseNumber: newAddress.houseNumber,
					flat: newAddress.flat,
					entrance: newAddress.entrance,
				},
			};
		} catch (error) {
			console.log("error");
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
	deleteAddresses: async (id) => {
		try {
			const deleted = await UserRepository.deleteAddress(id);
			if (!deleted) {
				return {
					success: false,
					message: "Unhandled error",
				};
			}
			return {
				success: true,
				data: {},
			};
		} catch (error) {
			console.log("error");
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
	orders: async (jwt) => {
		try {
			let decoded = verifyAndDecodeJwt(jwt);
			if (!decoded || decoded.userId === undefined) {
				return {
					success: false,
					message: "invalid JWT",
				};
			}
			const userId: number = decoded.userId;
			const orders = await UserRepository.getOrders(userId);
			return {
				success: true,
				data: orders,
			};
		} catch (error) {
			console.log("error");
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
	orderCancel: async (orderId) => {
		try {
			await UserRepository.cancelOrder(orderId);
			return {
				success: true,
				data: {},
			};
		} catch (error) {
			console.log("error");
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
	orderStatus: async (jwt) => {
		try {
			// let decoded = verifyAndDecodeJwt(jwt);
			// if (!decoded || decoded.userId === undefined) {
			// return {
			// success: false,
			// message: "invalid JWT",
			// };
			// }
			// const userId: number = decoded.userId;
			const orders = {
				novaPostOrderNumber: 123456789,
				status: "In Transit",
			};
			return {
				success: true,
				data: {
					orders: [orders],
				},
			};
		} catch (error) {
			console.log("error");
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
	postOrder: async (jwt, body) => {
		try {
			const newOrder = await UserRepository.createOrder(body);
			if (!newOrder) {
				return {
					success: false,
					message: "Unhandled error",
				};
			}
			return {
				success: true,
				data: newOrder,
			};
		} catch (error) {
			console.log("error");
			return {
				success: false,
				message: "Unhandled error",
			};
		}
	},
};
