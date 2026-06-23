import nodemailer from "nodemailer";
import { env } from ".";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	auth: {
		user: env.PROJECT_MAIL,
		pass: env.MAIL_APP_PASSWORD,
	},
	secure: true,
	port: 465,
});
