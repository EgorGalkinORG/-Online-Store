import { ReactNode } from "react";

import styles from "./auth-main.module.css";
import { ICONS } from "../../shared";
import { Link } from "react-router-dom";

interface AuthMainProps {
	children?: ReactNode;
}

export function AuthMain(props: AuthMainProps) {
	const { children } = props;

	return (
		<main className={styles.amain}>
			<div className={styles.heading}>
				<p className={styles.headingText}>ТЕХНОЛОГІЇ</p>
				<p className={styles.headingText}>ЯКІ ЗМІНЮЮТЬ РЕАЛЬНІСТЬ</p>
			</div>
			<ICONS.BigDrone className={styles.BigDrone} />
			<div className={styles.toCatalog}>
				<span>
					Передові технології в одному місці.
					<br /> Обирай найкраще для найважливішого.
				</span>
				<Link to="/catalog">ДО КАТАЛОГУ</Link>
			</div>
			<div className={styles.whiteEllipse} />

			<div className={styles.overlay}>{children}</div>
		</main>
	);
}
