import { useState, useEffect } from "react";
import { HREF } from "../shared/api/config";
import { Product } from "../shared/types";

interface UseGetProductSuggestionsParams {
	limit?: number;
	offset?: number;
	popular?: boolean;
	isNew?: boolean;
	sameAs?: number;
}

export function useGetProductSuggestions({
	limit,
	offset,
	popular,
	isNew,
	sameAs,
}: UseGetProductSuggestionsParams) {
	const [suggestions, setSuggestions] = useState<Product[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchSuggestions = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const params = new URLSearchParams();

				if (limit !== undefined) params.set("limit", String(limit));
				if (offset !== undefined) params.set("offset", String(offset));
				if (popular !== undefined)
					params.set("popular", String(popular));
				if (isNew !== undefined) params.set("new", String(isNew));
				if (sameAs !== undefined) params.set("sameAs", String(sameAs));

				const response = await fetch(
					`${HREF}/products/suggestions?${params.toString()}`,
				);

				if (!response.ok) {
					throw new Error(`Ошибка сервера: ${response.status}`);
				}

				const json = await response.json();

				if (json.success) {
					setSuggestions(json.data.products);
				} else {
					setSuggestions([]);
					setError(
						json.message ||
							"Помилка при спробі оновити рекомендації",
					);
				}
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Помилка при спробі оновлення продуктів",
				);
				setSuggestions([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSuggestions();
	}, [limit, offset, popular, isNew, sameAs]);

	return { suggestions, error, isLoading };
}
