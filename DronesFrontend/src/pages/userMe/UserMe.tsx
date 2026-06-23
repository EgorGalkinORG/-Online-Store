import { Link, useNavigate, useParams } from "react-router-dom";
// import { ICONS } from "../../shared";
import { useEffect, useState } from "react";
import styles from "./userMe.module.css";

export function UserMePage() {
	const { id } = useParams<{ id: string }>();
	const userId = Number(id);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		surname: "",
		name: "",
		thirdname: "",
		birthDate: "",
		phone: "",
		email: "",
	});

	useEffect(() => {
		if (isNaN(userId)) {
			// navigate("/")
		}
	}, [userId]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.usermeContent}>
				<div className={styles.usermeContentNavigate}>
					<h2 className={styles.sidebarTitle}>ОСОБИСТИЙ КАБІНЕТ</h2>

					<nav className={styles.navLinks}>
						<Link
							to="#"
							className={`${styles.navLink} ${styles.active}`}
						>
							КОНТАКТНІ ДАНІ
						</Link>
						<Link to="#" className={styles.navLink}>
							МОЇ ЗАМОВЛЕННЯ
						</Link>
						<Link to="#" className={styles.navLink}>
							АДРЕСА ДОСТАВКИ
						</Link>
					</nav>

					<div className={styles.separator}></div>

					<button className={styles.logoutButton}>ВИЙТИ</button>
				</div>

				<div className={styles.usermeContentMain}>
					<h3 className={styles.sectionTitle}>Контактні дані</h3>

					<form className={styles.formGrid}>
						<div className={styles.formGroup}>
							<label>Прізвище</label>
							<input
								type="text"
								name="surname"
								placeholder="Ваше Прізвище"
								value={formData.surname}
								onChange={handleInputChange}
							/>
						</div>

						<div className={styles.formGroup}>
							<label>Ім'я</label>
							<input
								type="text"
								name="name"
								placeholder="Ваше Ім'я"
								value={formData.name}
								onChange={handleInputChange}
							/>
						</div>

						<div className={styles.formGroup}>
							<label>По батькові</label>
							<input
								type="text"
								name="thirdname"
								placeholder="По батькові"
								value={formData.thirdname}
								onChange={handleInputChange}
							/>
						</div>

						<div className={styles.formGroup}>
							<label>Дата народження</label>
							<input
								type="text"
								name="birthDate"
								placeholder="DD / MM / YYYY"
								value={formData.birthDate}
								onChange={handleInputChange}
							/>
						</div>

						<div className={styles.formGroup}>
							<label>Телефон</label>
							<input
								type="tel"
								name="phone"
								placeholder="+ 38 0"
								value={formData.phone}
								onChange={handleInputChange}
							/>
						</div>

						<div className={styles.formGroup}>
							<label>E-mail</label>
							<input
								type="email"
								name="email"
								placeholder="Ваш E-mail"
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>

						<button type="submit" className={styles.saveButton}>
							ЗБЕРЕГТИ ЗМІНИ
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
