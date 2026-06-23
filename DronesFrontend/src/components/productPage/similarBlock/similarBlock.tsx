import React from 'react';
import { useGetProductSuggestions } from '../../../hooks/use-get-suggestions';
import styles from './similar-block.module.css';
import { SimilarBlockProps } from './similar-block.types';

export const SimilarBlock: React.FC<SimilarBlockProps> = ({ currentId }) => {
    const { suggestions, error } = useGetProductSuggestions({sameAs: currentId ? Number(currentId) : undefined });

    if (error) {
        return (
            <div className={styles.errorWrapper}>
                <p>Не вдалося завантажити рекомендації: {error}</p>
            </div>
        );
    }

    if (!suggestions || suggestions.length === 0) {
        return null;
    }

    return (
        <section className={styles.similarSection}>
            <div className={styles.similarLabel}>СХОЖІ ТОВАРИ</div>
            
            <div className={styles.similarGrid}>
                {suggestions.map((item) => (
                    <div key={item.id} className={styles.simCard}>
                        <div className={styles.imgWrapper}>
                            <img 
                                src={item.image} 
                                alt={item.name} 
                            />
                        </div>
                        <h4>{item.name}</h4>
                        <div className={styles.simPrice}>
                            {item.price.toLocaleString()} ₴
                        </div>
                    </div>
                ))}
            </div>

            <button className={styles.viewAllBtn}>ДИВИТИСЬ ВСІ →</button>
        </section>
    );
};