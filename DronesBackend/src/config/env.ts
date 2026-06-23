import { cleanEnv, str } from "envalid";
import * as dotenv from "dotenv";

dotenv.config();

export const env = cleanEnv(process.env, {
	DATABASE_URL: str(),
	SECRET_KEY: str(),
	PROJECT_MAIL: str(),
	DEVELOPER_MAIL: str(),
	MAIL_APP_PASSWORD: str(),
});
