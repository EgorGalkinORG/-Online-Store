import { Link, useNavigate } from "react-router-dom";
import styles from "./recovery-success.module.css";
import { ICONS } from "../../shared";
// import { ICONS, IMAGES } from "../../shared";

export function RecoverySuccessPage() {
	const navigate = useNavigate();
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
			<form className={styles.modalBody}>
				{" "}
				{/* onSubmit={handleSubmit(onLoginSubmit)} */}
				<div className={styles.modalFields}>
					<Link to={"/"} className={styles.modalForgotPassword}>
						Пароль успішно змінено!
						<br />
						Тепер ви можете увійти з новим паролем.{" "}
					</Link>
				</div>
				<div className={styles.modalButtons}>
					<Link to={"/auth/login"} className={styles.modalLogin}>
						<span>УВІЙТИ</span>
					</Link>
				</div>
			</form>
		</div>
	);
}
