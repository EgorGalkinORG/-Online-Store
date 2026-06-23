import { ReactNode } from "react"

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
    container?: HTMLElement;
    doCloseOnClickOutside?: boolean;
}