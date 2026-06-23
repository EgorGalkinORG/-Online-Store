import styles from "./login.module.css";
import { ICONS, IMAGES } from "../../shared";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginFormState } from "./login.types";
import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/use-login";

export function LoginPage() {
	const { register, handleSubmit, formState, setError } =
		useForm<LoginFormState>();
	const [eye, setEye] = useState(false);

	const navigate = useNavigate();
	const [login, { isLoading, error }] = useLogin();

	async function onLoginSubmit(data: LoginFormState) {
		console.log("Form was submitted");

		const responseData = await login(data);

		if ("error" in responseData && responseData.error) {
			setError("root", { message: error ?? "Server Errror" });
		} else if ("data" in responseData) {
			localStorage.setItem("token", responseData.data.jwt);
		}
		
	}
	useEffect(() => {
		if (!error) return;
		setError("root", { message: error });
	}, [error]);

	const emailError = formState.errors.email;
	const passwordError = formState.errors.password;
	const rootError = formState.errors.root;

	return (
		<div className={styles.container}>
			<div className={styles.modalHeader}>
				<Link to={"/auth/registration"}>
					{" "}
					<span>Авторизація /</span> Реєстрація
				</Link>
				<ICONS.ModalCloseButton
					onClick={() => {
						navigate("/");
					}}
					className={styles.modalCloseButton}
				/>
			</div>
			<form
				className={styles.modalBody}
				onSubmit={handleSubmit(onLoginSubmit)}
			>
				<div className={styles.modalFields}>
					<div className={styles.modalField}>
						<label>Email</label>

						<input
							className={emailError && styles.errorInput}
							type="email"
							placeholder="Введіть email"
							{...register("email", {
								required: {
									value: true,
									message: "Email обов'язковий",
								},
								validate: (value) => {
									if (
										!value.includes("@") ||
										!value.includes(".")
									)
										return "Email must be valid email.";
								},
							})}
						/>
						{}
					</div>
					<div className={styles.modalField}>
						<label>Пароль</label>

						<input
							className={emailError && styles.errorInput}
							type={!eye ? "password" : "text"}
							placeholder="Введіть пароль"
							{...register("password", {
								required: {
									value: true,
									message: "Пароль обов'язковий",
								},
							})}
						/>
						{eye ? (
							<ICONS.EyeOn
								onClick={() => {
									setEye(!eye);
								}}
								className={styles.modalPasswordEye}
							/>
						) : (
							<ICONS.EyeOff
								onClick={() => {
									setEye(!eye);
								}}
								className={styles.modalPasswordEye}
							/>
						)}
					</div>
					<Link
						to={"/auth/recovery"}
						className={styles.modalForgotPassword}
					>
						Забули пароль?
					</Link>

					{rootError && (
						<p className={styles.error}>{rootError.message}</p>
					)}
				</div>
				<div className={styles.modalBottomButtons}>
					<div className={styles.modalButtons}>
						<Link to={"/"} className={styles.modalCancel}>
							<span>СКАСУВАТИ</span>
						</Link>
						<button type="submit" className={styles.modalLogin}>
							<span>УВІЙТИ</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
