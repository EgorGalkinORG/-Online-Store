import { Link } from "react-router-dom";
import styles from './product-list.module.css'
import { ProductCard } from "../productCard";
import { ProductListProps } from "./product-list.types";


export function ProductList({filteredProducts}: ProductListProps){
    return (
        <div className={styles.productList}>
            {filteredProducts.map(product => 
            <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} image={product.image} discount={product.discount}/>)}
        </div>
    )
}