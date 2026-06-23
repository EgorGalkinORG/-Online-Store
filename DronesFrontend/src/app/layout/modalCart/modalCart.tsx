import styles from "./modalCart.module.css";
import { useAppSelector } from "../../../app/store/store";
import { CartList } from "../../../components/modalCartComponent/cartList/cartList";

export function ModalCart() {
    const items = useAppSelector((state) => state.cart.items);

    const totalPrice = items.reduce((acc, item) => acc + (item.oldPrice || item.price) * item.count, 0);
    const finalPrice = items.reduce((acc, item) => acc + item.price * item.count, 0);
    const saved = totalPrice - finalPrice;

    return (
        <div className={styles.modalCart}>
            <p className={styles.cartTitle}>Кошик</p>
            
            {items.length > 0 ? (
                <>
                    <div className={styles.cartList}>
                        <CartList />
                    </div>

                    <div className={styles.footerContainer}>
                        <div className={styles.cartSummary}>
                            <div className={styles.summaryLine}>
                                <span>Загальна сума </span>
                                <span>{totalPrice.toLocaleString()} ₴</span>
                            </div>
                            
                            {saved > 0 && (
                                <div className={styles.summaryLine}>
                                    <span>Заощаджено </span>
                                    <span className={styles.savedAmount}>- {saved.toLocaleString()} ₴</span>
                                </div>
                            )}

                            <div className={styles.totalLine}>
                                <span>Зі знижкою </span>
                                <span className={styles.finalPrice}>{finalPrice.toLocaleString()} ₴</span>
                            </div>
                        </div>

                        <div className={styles.cartActions}>
                            <button className={styles.goToCartButton}>ПЕРЕЙТИ ДО КОШИКА</button>
                            <button className={styles.checkoutButton}>
                                ОФОРМИТИ ЗАМОВЛЕННЯ →
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles.emptyCartContainer}>
                    <div className={styles.emptyCartP}>                     
                        <p className={styles.emptyCartText}>
                            Ваш кошик порожній.<br/>
                            Почніть вибирати товари, щоб вони з’явилися тут
                        </p>
                    </div>

                    <div className={styles.buttonWrapper}>
                        <button className={styles.continueButton}>
                            ПРОДОВЖИТИ ПОКУПКИ
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}