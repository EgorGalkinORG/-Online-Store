import { useState } from "react";
import { HREF } from "../shared/api";
import {
	UserLoginResponse,
	UserErrorResponse,
	LoginCredentials,
} from "../shared/api/responces";
import { useAppDispatch } from "../app/store/store";
import { setCredentials } from "../app/store/slices/userSlice";
import { useNavigate } from "react-router-dom";

type LoginRequestFunction = (
	credentials: LoginCredentials,
) => Promise<UserLoginResponse | { error: string }>;

type UseLoginContract = [
	LoginRequestFunction,
	{ isLoading: boolean; error: string | null },
];

export function useLogin(): UseLoginContract {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
    const navigator = useNavigate()
	const dispatch = useAppDispatch();

	const login: LoginRequestFunction = async (credentials) => {
		try {
			setIsLoading(true);
			const request = await fetch(`${HREF}/users/login`, {
				method: "POST",
				body: JSON.stringify(credentials),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (request.status === 401) {
				const message = "Wrong credentials";
				setError(message);
				return { error: message };
			} else if (request.status === 500) {
				const message = "Server Error. Try again later";
				setError(message);
				return { error: message };
			}
			const data: UserLoginResponse = await request.json();
			console.log(data);
			if (data.success === true) {
                navigator('/')
				dispatch(setCredentials({ token: data.data.jwt }));
			}
			if ("data" in data) {
				return data;	
			} else {
				console.log(data);
				setError("Network error");
				return { error: data.message };
			}
		} catch (error) {
			console.error("ERROR:", error);
			const message = "Network Error. Try again later";
			setError(message);
			return { error: message };
		} finally {
			setIsLoading(false);
		}
	};
	return [login, { isLoading, error }];
}
