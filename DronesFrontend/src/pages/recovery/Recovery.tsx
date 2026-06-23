import styles from "./recovery.module.css";
import { ICONS, IMAGES } from "../../shared";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RecoveryFormState } from "./recovery.types";
import { useEffect } from "react";
import { useRecovery } from "../../hooks";

export function RecoveryPage() {
	const { register, handleSubmit, formState, setError } =
		useForm<RecoveryFormState>();

	const navigate = useNavigate();

	const {send} = useRecovery();
	
	async function onRecoverySubmit(data: RecoveryFormState) {
		console.log("Form was submitted");

		const responseData = await send(data.email);

		if (responseData) {
			setError("root", { message: "Повідомлення на пошту успішно відправлено." });
		}
		
	}

	const emailError = formState.errors.email;
	const rootError = formState.errors.root;

	return (
		<div className={styles.container}>
			<div className={styles.modalHeader}>
				<Link to={"/auth/recovery"}>
					{" "}
					<span>Відновлення пароля</span>
				</Link>
				<ICONS.ModalCloseButton
					onClick={() => {
						navigate("/");
					}}
					className={styles.modalCloseButton}
				/>
			</div>
			<form className={styles.modalBody} onSubmit={handleSubmit(onRecoverySubmit)}>
				
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
					</div>
				</div>
				<div className={styles.modalButtons}>
					<Link to={"/"} className={styles.modalCancel}>
						<span>СКАСУВАТИ</span>
					</Link>
					<button type="submit" className={styles.modalLogin}>
						<span>НАДІСЛАТИ ЛИСТ</span>
					</button>
				</div>
			</form>
		</div>
	);
}
