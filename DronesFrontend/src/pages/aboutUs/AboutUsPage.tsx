import styles from "./aboutUs.module.css";
import { ICONS, IMAGES } from "../../shared";

export function AboutUsPage() {
	return (
		<div className={styles.contentContainer}>
			<div className={styles.firstContainer}>
				<div className={styles.firstTextContainer}>
					<p>ПРО НАС</p>
					<span>
						Ми — команда, яка об'єднана спільною метою: зробити
						передові технології доступними для
						<br /> кожного, хто потребує точності, безпеки та
						інновацій.
						<br /> З 2022 року ми спеціалізуємось на постачанні
						дронів і тепловізорів для професійного,
						<br /> цивільного та волонтерського використання.
						<br />
					</span>
				</div>
				<img src={IMAGES.aboutUsFirst} alt="Building image" />
			</div>
			<div className={styles.secondContainer}>
				<div className={styles.secondTextContainer}>
					<p>НАША МІСІЯ</p>
					<span>
						Допомагати тим, хто стоїть на передовій — у прямому й
						переносному сенсі.
						<br /> Ми обираємо тільки надійну техніку, яку
						перевіряємо самі. Наша мета — якість,
						<br /> простота, і підтримка на кожному етапі: від
						покупки до використання.
					</span>
				</div>
				<img src={IMAGES.aboutUsSecond} alt="Interior image" />
			</div>
			<div className={styles.secondContainer}>
				<img src={IMAGES.aboutUsThird} alt="Interior image" />
				<div className={styles.secondTextContainer}>
					<p>
						КОМАНДА, ЯКІЙ МОЖНА
						<br /> ДОВІРЯТИ
					</p>
					<span>
						Ми — не просто магазин. Ми — фахівці, які самі працюють
						із цією технікою й <br />
						консультують з досвіду. Засновники проєкту — волонтери,
						військові та IT-
						<br />
						спеціалісти, які об'єднали зусилля задля важливої
						справи.
					</span>
				</div>
			</div>
		</div>
	);
}
