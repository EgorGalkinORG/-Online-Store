import { useAppSelector } from "../../../app/store/store";
import { CartItem } from "../cartItem/cartItem";
import styles from "./cartList.module.css";

export function CartList() {
    const items = useAppSelector((state) => state.cart.items);

    return (
        <div className={styles.listWrapper}>
            {items.map((item) => (
                <CartItem 
                    key={item.id} 
                    item={item}
                />
            ))}
        </div>
    );
}