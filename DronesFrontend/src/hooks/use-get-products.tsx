import { useEffect, useState } from "react";
import { Product } from "../shared/types";
import { HREF } from "../shared";

interface UseGetProductsContract {
    isLoading: boolean;
    products: Product[];
    totalPages: number;
    error: string | null;
}
export interface ProductErrorResponse {
	success: false;
	message: string;
}

export interface ProductGetAllSuccessResponse {
	success: true;
	data: {
		products: Product[];
	};
}
export type ProductGetAllResponse =
	| ProductErrorResponse
	| ProductGetAllSuccessResponse;

export function useGetProducts(page: number = 1, limit: number = 16): UseGetProductsContract {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getProducts() {
            try {
                setIsLoading(true);
                
                const url = new URL(`${HREF}/products`);
                url.searchParams.append('page', page.toString());
                url.searchParams.append('limit', limit.toString());

                const response = await fetch(url.toString(), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                console.log("BACKEND RESPONSE:", data);

                if (data.success) {
                    setProducts(data.data.products);
                    setTotalPages(data.data.totalPages || 1);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                console.error("FETCH ERROR:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setIsLoading(false);
            }
        }
        getProducts();
    }, [page, limit]);

    return { products, totalPages, isLoading, error };
}
