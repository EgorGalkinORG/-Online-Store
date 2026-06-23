import React from 'react';
import styles from './characteristic-block.module.css';
import { CharacteristicBlockProps } from './characteristic-block.types';

export const CharacteristicBlock: React.FC<CharacteristicBlockProps> = ({ block }) => {
    return (
        <div className={styles.techBlock}>
            <h2>{block.header}</h2>
            {block.description && (
                <p className={styles.blockDesc}>{block.description}</p>
            )}
            <div className={styles.techGrid}>
                {block.techDetails?.map((detail) => (
                    <div key={detail.id} className={styles.techItem}>
                        <div className={styles.techChar}>{detail.characteristic}</div>
                        <div className={styles.techDesc}>{detail.description}</div>
                    </div>
                ))}
            </div>
            {block.image && (
                <div className={styles.techImgWrapper}>
                    <img src={block.image} alt={block.header} />
                </div>
            )}
        </div>
    );
};