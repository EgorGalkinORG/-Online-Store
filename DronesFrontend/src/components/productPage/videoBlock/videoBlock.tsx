import React from 'react';
import styles from './video-block.module.css';
import { VideoBlockProps } from './video-block.types';

export const VideoBlock: React.FC<VideoBlockProps> = ({ title, description, videoUrl }) => {
    return (
        <div className={styles.videoBlock}>
            <div className={styles.videoText}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            <div className={styles.videoWrapper}>
                <iframe
                    src={videoUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
};