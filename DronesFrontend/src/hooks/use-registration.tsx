import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFormSetError } from "react-hook-form";
import { HREF } from "../shared";

export interface RegisterFields {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}
export interface ApiError {
	success: boolean;
	message: string;
}

export const useRegister = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const registerUser = async (
		data: RegisterFields,
		setError: UseFormSetError<RegisterFields>,
	) => {
		setIsLoading(true);

		try {
			const response = await fetch(`${HREF}/users/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				setError("root", {
					message: result.message || "Registration error",
				});
				return;
			}

			navigate("/auth/registration/success");
		} catch (err) {
			setError("root", {
				message: "Network error. try again later",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return { registerUser, isLoading };
};
