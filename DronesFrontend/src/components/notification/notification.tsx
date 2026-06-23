import React, { useEffect } from 'react';
import styles from './notification.module.css';
import { NotificationProps } from './notification.types';

export function Notification({ message, onClose }: NotificationProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={styles.notificationBar}>
            {message}
        </div>
    );
};