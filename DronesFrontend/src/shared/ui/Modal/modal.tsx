import { ModalProps } from "./modal.types";
import styles from "./modal.module.css";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal( props : ModalProps) {
const { isOpen, onClose, children, className, container = document.body, doCloseOnClickOutside = true } = props;
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!isOpen || !onClose || !doCloseOnClickOutside || !modalRef.current) return;
            const target = event.target as HTMLElement;
            if (!modalRef.current.contains(target)) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, doCloseOnClickOutside]);
    
    if(!isOpen) return null
    return createPortal(
        <div className={styles.overlay}>
            <div ref={modalRef} className={`${styles.modal} ${className}`}>
                {children}
            </div>
        </div>,
        container
    )   ;
    
}