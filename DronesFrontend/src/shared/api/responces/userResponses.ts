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
export type UserLoginResponse = UserErrorResponse | UserLoginSuccessResponse;
export type UserRegistrationResponse = UserErrorResponse | UserSuccessResponse;

export interface LoginCredentials {
	email: string;
	password: string;
}
