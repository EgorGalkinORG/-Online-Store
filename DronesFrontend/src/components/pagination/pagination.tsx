import React from "react";
import styles from "./pagination.module.css";
import { PaginationProps } from "./pagination.types";
import { ICONS } from "../../shared";

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 1) return null;

    return (
        <div className={styles.Pagination}>
        <button
            className={styles.prevButton}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
        >
            <ICONS.PrevPageIcon />
        </button>

        <div className={styles.pageNumbers}>
            {pageNumbers.map((page) => (
            <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`${styles.pageButton} ${
                currentPage === page ? styles.active : ""
                }`}
            >
                {page}
            </button>
            ))}
        </div>

        <button
            className={styles.nextButton}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            <ICONS.NextPageIcon />
        </button>
        </div>
    );
}