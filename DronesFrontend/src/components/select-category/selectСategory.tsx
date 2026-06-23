import React from 'react';
import { useGetCategories } from "../../hooks";
import { SelectCategoryProps } from "./select-category.types";
import styles from './select-category.module.css';

export function SelectCategory({ selectedCategory, setSelectedCategory }: SelectCategoryProps) {
    const { categories, isLoading, error } = useGetCategories();

    if (isLoading || error) return null;

    return (
        <nav className={styles.container}>
            <button
                type="button"
                className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.active : ''}`}
                onClick={() => setSelectedCategory('all')}
            >
                <p className={styles.allText}>Всі</p>
            </button>

            {categories.map((cat) => (
                <button
                    key={cat.id}
                    type="button"
                    className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                >
                    {cat.image && (
                        <img 
                            src={cat.image} 
                            alt={cat.title} 
                            className={styles.categoryImage} 
                        />
                    )}
                </button>
            ))}
        </nav>
    );
}