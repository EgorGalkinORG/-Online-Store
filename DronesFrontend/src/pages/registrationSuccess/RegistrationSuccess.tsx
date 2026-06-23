import styles from "./registration-success.module.css";
import { ICONS, IMAGES } from "../../shared";
import { Link, useNavigate } from "react-router-dom";

export function RegistrationSuccess() {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.modalHeader}>
				<Link to={"/auth/registration"}>
					{" "}
					<span>Реєстрація</span>
				</Link>
				<ICONS.ModalCloseButton
					onClick={() => {
						navigate("/");
					}}
					className={styles.modalCloseButton}
				/>
			</div>
			<form className={styles.modalBody}>
				{" "}
				{/* onSubmit={handleSubmit(onLoginSubmit)} */}
				<div className={styles.modalFields}>
					<Link to={"/"} className={styles.modalForgotPassword}>
						Акаунт успішно створено
					</Link>
				</div>
				<div className={styles.modalButtons}>
					<Link to={"/"} className={styles.modalLogin}>
						<span>ПЕРЕЙТИ НА САЙТ</span>
					</Link>
				</div>
			</form>
		</div>
	);
}
