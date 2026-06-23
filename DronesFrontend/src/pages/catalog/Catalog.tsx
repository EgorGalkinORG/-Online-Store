import { Link } from 'react-router-dom'
import { ICONS, IMAGES } from '../../shared'
import styles from './catalog.module.css'
import { ProductList, SelectCategory } from '../../components/index'
import { Pagination } from "../../components/pagination";
import { useGetProducts } from '../../hooks'
import { useState, useMemo, useEffect } from 'react';
import { Product } from "../../shared/types";

export function CatalogPage() {
    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
    const [searchValue, setSearchValue] = useState<string>("");
    const [page, setPage] = useState(1);
    
    const ITEMS_PER_PAGE = 16;

    const { products, isLoading, error } = useGetProducts();

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let result = products;

        if (searchValue) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            result = result.filter(product =>
                product.category.id === selectedCategory
            );
        }

        return result;
    }, [products, searchValue, selectedCategory]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (page - 1) * ITEMS_PER_PAGE;
        const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
        return filteredProducts.slice(firstPageIndex, lastPageIndex);
    }, [page, filteredProducts]);

    useEffect(() => {
        setPage(1);
    }, [selectedCategory, searchValue]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.catalogPage}>
            <div className={styles.catalogPageHeading}>
                <p className={styles.catalogHeading}>КАТАЛОГ</p>
            </div>

            <div className={styles.catalogCategories}>
                <SelectCategory 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                />
            </div>

            <div className={styles.productList}>
                <ProductList filteredProducts={currentTableData} />
            </div>

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <Pagination 
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(p) => setPage(p)}
                    />
                </div>
            )}
        </div>
    );
}
