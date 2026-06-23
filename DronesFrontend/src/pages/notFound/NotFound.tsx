import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../shared";
import styles from "./notfound.module.css";

export function NotFoundPage() {
	return (
		<div className={styles.container}>
			<div className={styles.decorativeCircle1}></div>
			<div className={styles.decorativeCircle2}></div>
			<div className={styles.decorativeCircle3}></div>

			<div className={styles.content}>
				<div className={styles.errorCode}>404</div>
				<div className={styles.divider}></div>
				<h1 className={styles.title}>Сторінка не знайдена</h1>
				<p className={styles.description}>
					Можливо, вона була переміщена або видалена
				</p>
			</div>
		</div>
	);
}
