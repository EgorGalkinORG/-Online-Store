import React from 'react';
import styles from './standart-block.module.css';
import { StandartBlockProps } from './standart-block.types';

export const StandartBlock: React.FC<StandartBlockProps> = ({ header, description, image, isOdd }) => {
    return (
        <div className={`${styles.featureBlock} ${isOdd ? styles.odd : styles.even}`}>
            <div className={styles.featureText}>
                <h2>{header}</h2>
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            {image && (
                <div className={styles.featureMedia}>
                    <img src={image} alt={header} />
                </div>
            )}
        </div>
    );
};