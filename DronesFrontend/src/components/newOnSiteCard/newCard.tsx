import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../shared";
import styles from "./new-card.module.css";
import { ProductList } from "../../components";
import { useGetProducts } from "../../hooks";

interface NewCardProps {
	id: number;
	title: string;
	description?: string;
	price: number;
	imagee: string;
    type: number
}
export function NewCard({
	id,
	title,
	description,
	price,
	imagee,
    type
}: NewCardProps) {
    if(type === 0 ){
        return (
            <div className={styles.CardContainer}>
                <img
                    className={styles.firstNewCardImage}
                    src={imagee}
                    alt={`image of ${title}`}
                />
                <div className={styles.firstNewCard}>
                    <div className={styles.gradientOfFirstNewCard}>
                        <div className={styles.firstNewCardContent}>
                            <div className={styles.firstNewCardTextBlock}>
                                <p className={styles.firstNewCardTextTitle}>
                                    {title}
                                </p>
                                <span className={styles.firstNewCardTextDesc}>
                                    {description}
                                </span>
                            </div>
                            <div className={styles.firstNewCardToBuyBlock}>
                                <p className={styles.firstNewCardToBuyPrice}>
                                    from to ${price}
                                </p>
                                <Link to={`/products/${id}`}>
                                    <p>КУПИТИ</p>
                                    <ICONS.WhiteRightArrow></ICONS.WhiteRightArrow>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if(type === 1){
        return (
            <div className={styles.CardContainer}>
                <img
                    className={styles.firstNewCardImage}
                    src={imagee}
                    alt={`image of ${title}`}
                />
                <div className={styles.secondNewCard}>
                    <div className={styles.gradientOfSecondNewCard}>
                        <div className={styles.firstNewCardContent}>
                            <div className={styles.firstNewCardTextBlock}>
                                <p className={styles.firstNewCardTextTitle}>
                                    {title}
                                </p>
                                <span className={styles.firstNewCardTextDesc}>
                                    {description}
                                </span>
                            </div>
                            <div className={styles.firstNewCardToBuyBlock}>
                                <p className={styles.firstNewCardToBuyPrice}>
                                    from to ${price}
                                </p>
                                <Link to={`/products/${id}`}>
                                    <p>КУПИТИ</p>
                                    <ICONS.WhiteRightArrow></ICONS.WhiteRightArrow>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.CardContainer}>
                <img
                    className={styles.firstNewCardImage}
                    src={imagee}
                    alt={`image of ${title}`}
                />
                <div className={styles.thirdNewCard}>
                    <div className={styles.gradientOfThirdNewCard}>
                        <div className={styles.firstNewCardContent}>
                            <div className={styles.firstNewCardTextBlock}>
                                <p className={styles.firstNewCardTextTitle}>
                                    {title}
                                </p>
                                <span className={styles.firstNewCardTextDesc}>
                                    {description}
                                </span>
                            </div>
                            <div className={styles.firstNewCardToBuyBlock}>
                                <p className={styles.firstNewCardToBuyPrice}>
                                    from to ${price}
                                </p>
                                <Link to={`/products/${id}`}>
                                    <p>КУПИТИ</p>
                                    <ICONS.WhiteRightArrow></ICONS.WhiteRightArrow>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
