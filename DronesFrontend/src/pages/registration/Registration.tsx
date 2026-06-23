import styles from "./registration.module.css";
import { ICONS, IMAGES } from "../../shared";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { RegistrationFormState } from "./registration.types";
import { useRegister } from "../../hooks";
import { RegisterFields } from "../../hooks/use-registration";

export function RegistrationPage() {
	const navigate = useNavigate();
	const { register, handleSubmit, formState, setError } =
		useForm<RegistrationFormState>();
	const [eye, setEye] = useState(false);
	const [eye2, setEye2] = useState(false);
	const { registerUser, isLoading } = useRegister();
	const onSubmit = (data: RegisterFields) => {
		registerUser(data, setError);
	};

	const emailError = formState.errors.email;
	const passwordError = formState.errors.password;
	const rootError = formState.errors.root;
	return (
		<div className={styles.container}>
			<div className={styles.modalHeader}>
				<Link to={"/auth/login"}>
					{" "}
					Авторизація<span> / Реєстрація</span>
				</Link>
				<ICONS.ModalCloseButton
					onClick={() => {
						navigate("/");
					}}
					className={styles.modalCloseButton}
				/>
			</div>
			<form className={styles.modalBody} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.modalFields}>
					<div className={styles.modalField}>
						<label>Ім'я</label>

						<input
							className={emailError && styles.errorInput}
							type="text"
							placeholder="Введіть ім'я"
							{...register("name", {
								required: {
									value: true,
									message: "Ім'я обов'язкове",
								},
							})}
						/>
						{}
					</div>
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
					<div className={styles.modalField}>
						<label>Підтвердження пароля</label>

						<input
							className={emailError && styles.errorInput}
							type={!eye2 ? "password" : "text"}
							placeholder="Повторіть пароль"
							{...register("password", {
								required: {
									value: true,
									message:
										"Підтвердження пароля обов'язкове обов'язковий",
								},
							})}
						/>
						{eye2 ? (
							<ICONS.EyeOn
								onClick={() => {
									setEye2(!eye2);
								}}
								className={styles.modalPasswordEye}
							/>
						) : (
							<ICONS.EyeOff
								onClick={() => {
									setEye2(!eye2);
								}}
								className={styles.modalPasswordEye}
							/>
						)}
					</div>
					<Link
						to={"/auth/login"}
						className={styles.modalForgotPassword}
					>
						Вже є акаунт? Увійти
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
							<span>ЗАРЕЄСТРУВАТИСЯ</span>
						</button>
					</div>
					<p>
						При вході або реєстрації, я підтверджую згоду <br />з
						умовами <span>публічного договору</span>
					</p>
				</div>
			</form>
		</div>
	);
}
