import { Link } from "react-router-dom";
import { ICONS } from "../../shared";
import styles from "./footer.module.css";

export function Footer() {
	return (
		<footer>
			<div className={styles.whiteEllipse} />
			<div className={styles.insideFooter}>
				<div className={styles.cifry}>
					<div>
						<p className={styles.zh}>1K+</p>
						<p className={styles.prst}>Успішних відправок</p>
					</div>
					<div>
						<p className={styles.zh}>1.5K+</p>
						<p className={styles.prst}>Задоволених клієнтів</p>
					</div>
					<div>
						<p className={styles.zh}>24/7</p>
						<p className={styles.prst}>Підтримка клієнтів</p>
					</div>
				</div>
				<ICONS.BigDronesFooter className={styles.bigDroness} />
				<div className={styles.footerBar}>
					<Link to="/catalog">КАТАЛОГ</Link>
					<Link to="/about">ПРО НАС</Link>
					<Link to="/contacts">КОНТАКТИ</Link>
					<Link to="/cart">КОШИК</Link>
					<Link to="/profile">КАБІНЕТ</Link>
				</div>
				<div className={styles.underLine}>
					<div className={styles.Line}></div>
					<p>© 2025 Drones Всі права захищені.</p>
				</div>
			</div>
		</footer>
	);
}
