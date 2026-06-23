import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../shared";
import styles from "./new-list.module.css";
import { Product } from "../../shared/types";
import { NewCard } from "../newOnSiteCard";
import { useGetProductSuggestions } from "../../hooks/use-get-suggestions";

export function NewList() {
	const { suggestions, error, isLoading } = useGetProductSuggestions({
		isNew: true,
		limit: 3,
	});
    console.log({ suggestions, error, isLoading })
	return (
		<div className={styles.newList}>
			{error && (
				<p className={styles.error}>
					Помилка при спробі оновити нові про
				</p>
			)}
			{!error &&
				suggestions.map((product, index) => (
					<NewCard
						key={product.id}
						id={product.id}
						title={product.name}
						imagee={product.image}
						price={product.price}
                        type={index}
					/>
				))}
		</div>
	);
}
