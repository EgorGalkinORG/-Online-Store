import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../config/env";

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			res.status(401).json({ success: false, message: "Unauthorized" });
			return;
		}

		const token = authHeader.replace("Bearer ", "");
		const payload = verify(token, env.SECRET_KEY) as { userId: number };
		res.locals.jwt = token;
	} catch (error) {
		res.status(401).json({ success: false, message: "Unauthorized" });
		return;
	}
	next();
}
