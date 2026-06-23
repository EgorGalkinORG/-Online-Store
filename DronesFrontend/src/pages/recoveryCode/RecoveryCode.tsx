import styles from "./recovery-code.module.css";
import { ICONS, IMAGES } from "../../shared";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RecoveryCodeFormState } from "./recovery-code.types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoveryCode } from "../../hooks";

type FormValues = {
	code: string;
	password: string;
	passwordConfirmation: string;
};

export function RecoveryCodePage() {
	const { register, handleSubmit, formState, setError } =
		useForm<FormValues>();

	const navigate = useNavigate();

	const { code } = useParams(); 
	
	console.log(code)

	const [fEye, setfEye] = useState(false);
	const [sEye, setsEye] = useState(false);
	
	let { send } = useRecoveryCode()


	async function onRecoveryCodeSubmit({code, password, passwordConfirmation}: FormValues) {
		console.log("Form was submitted");
		if(!(password === passwordConfirmation)){
			return
		}

		const responseData = await send(+code, password);
		
		console.log(responseData)
		
	}

	const passwordError = formState.errors.password;
	const passwordConfirmationError = formState.errors.passwordConfirmation;
	const rootError = formState.errors.root;

	return (
		<div className={styles.container}>
			<div className={styles.modalHeader}>
				<Link to={"/auth/registration"}>
					{" "}
					<span>Новий пароль</span>
				</Link>
				<ICONS.ModalCloseButton
					onClick={() => {
						navigate("/");
					}}
					className={styles.modalCloseButton}
				/>
			</div>
			<form className={styles.modalBody} onSubmit={handleSubmit(onRecoveryCodeSubmit)}>
				{" "}
				{/* onSubmit={handleSubmit(onLoginSubmit)} */}
				<div className={styles.modalFields}>
					<div className={styles.modalField}>
						<label>Пароль</label>

						<input
							className={
								passwordConfirmationError && styles.errorInput
							}
							type={!fEye ? "password" : "text"}
							placeholder="Введіть пароль"
							{...register("password", {
								required: {
									value: true,
									message: "Пароль обов'язковий",
								},
							})}
						/>
						{fEye ? (
							<ICONS.EyeOn
								onClick={() => {
									setfEye(!fEye);
								}}
								className={styles.modalPasswordEye}
							/>
						) : (
							<ICONS.EyeOff
								onClick={() => {
									setfEye(!fEye);
								}}
								className={styles.modalPasswordEye}
							/>
						)}
					</div>
					<div className={styles.modalField}>
						<label>Підтвердження пароля</label>

						<input
							className={
								passwordConfirmationError && styles.errorInput
							}
							type={!sEye ? "password" : "text"}
							placeholder="Введіть пароль"
							{...register("passwordConfirmation", {
								required: {
									value: true,
									message: "Пароль обов'язковий",
								},
							})}
						/>
						{sEye ? (
							<ICONS.EyeOn
								onClick={() => {
									setsEye(!sEye);
								}}
								className={styles.modalPasswordEye}
							/>
						) : (
							<ICONS.EyeOff
								onClick={() => {
									setsEye(!sEye);
								}}
								className={styles.modalPasswordEye}
							/>
						)}
					</div>
					{rootError && (
						<p className={styles.error}>{rootError.message}</p>
					)}
				</div>
				<div className={styles.modalButtons}>
					<Link to={"/"} className={styles.modalCancel}>
						<span>СКАСУВАТИ</span>
					</Link>
					<button type="submit" className={styles.modalLogin}>
						<span>ЗБЕРЕГТИ НОВИЙ ПАРОЛЬ</span>
					</button>
				</div>
			</form>
		</div>
	);
}
