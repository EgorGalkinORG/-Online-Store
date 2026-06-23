import styles from "./checkout-page.module.css";

export function CheckoutPage() {
    return (
        <div className={styles.whiteSpace}>
            <div className={styles.leftContent}>
                <p className={styles.PlaceAnOrder} >ОФОРМИТИ ЗАМОВЛЕННЯ</p>
                <div className={styles.sections} >
                    <div className={styles.line}></div>
                </div>
            </div>
        </div>
    )
}