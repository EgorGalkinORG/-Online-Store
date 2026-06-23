import { useState, useEffect } from 'react';
import { HREF } from '../shared/api/config';
import { ProductDetail } from '../shared/types';

export function useGetProduct(id: string | undefined) {
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const prodRes = await fetch(`${HREF}/products/${id}`);
                const prodJson = await prodRes.json();

                if (prodJson.success) {
                    setProduct(prodJson.data);
                }
            } catch (e) {
                console.error("Error fetching data:", e);
                setError("Cant load data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { product, loading, error };
}