import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ICONS } from '../../../shared/icons';
import { addToCart } from '../../../app/store/slices/cartSlice';
import { Category } from '../../../shared/types'; // Імпортуємо тип категорій
import styles from './product-card.module.css';

interface ProductCardProps {
    name: string;
    price: number;
    image: string;
    id: number;
    discount?: number;
}

export function ProductCard({ name, price, image, id, discount }: ProductCardProps) {
    const dispatch = useDispatch();
    const finalPrice = discount ? Math.round(price - (price * discount / 100)) : price;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        dispatch(addToCart({
            id,
            name,
            price: finalPrice,
            image,
            discount: discount || 0,
            amount: 1,
            category: "Drones" as unknown as Category,
            name_trigrams: name.toLowerCase()
        }));
    };

    return (
        <Link to={`/products/${id}`} className={styles.catalogProduct}>
            <img src={image} alt={name} />
            <div className={styles.catalogProductText}>
                <p>{name}</p>
                <div className={styles.catalogProductPricing}>
                    {discount ? (
                        <>
                            <p className={styles.oldPrice}>{price} ₴</p>
                            <p className={styles.currentPrice}>{finalPrice} ₴</p>
                        </>
                    ) : (
                        <p className={styles.normalPrice}>{price} ₴</p>
                    )}
                </div>
                <button type="button" className={styles.cartButton} onClick={handleAddToCart}>
                    <ICONS.blackCart />
                </button>
            </div>
        </Link>
    );
}