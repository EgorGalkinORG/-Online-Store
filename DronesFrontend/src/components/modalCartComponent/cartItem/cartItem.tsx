import styles from "./cartItem.module.css";
import { CartItemProps } from "./cartItem.types";
import { 
    incrementCount, 
    decrementCount, 
    removeFromCart 
} from "../../../app/store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { ICONS } from "../../../shared/icons";
import { Link } from "react-router-dom";

export function CartItem(props: CartItemProps) {
    const { item } = props;
    const dispatch = useDispatch();

    return (
        <div className={styles.cartItem}>
        <img src={item.image} alt={item.name} className={styles.itemImg} />

        <div className={styles.itemInfo}>
            <Link to={`/product/${item.id}`} className={styles.itemName}>
                {item.name}
            </Link>
            
            <div className={styles.itemPricing}>
                {item.oldPrice && (
                    <span className={styles.oldPrice}>{item.oldPrice} ₴</span>
                )}
                <span className={styles.currentPrice}>{item.price} ₴</span>
            </div>
        </div>

        <div className={styles.counter}>
            <button 
                onClick={() => dispatch(decrementCount(item.id))}
                className={styles.counterBtn}
            >
                    −
            </button>
                <span className={styles.countValue}>{item.count}</span>
            <button 
                onClick={() => dispatch(incrementCount(item.id))}
                className={styles.counterBtn}
            >
                +
            </button>
        </div>

        <button 
            className={styles.deleteBtn}
            onClick={() => dispatch(removeFromCart(item.id))}
        >
            <ICONS.Trash />
        </button>
        </div>
    );
}
