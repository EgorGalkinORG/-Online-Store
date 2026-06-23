import { useGetProductSuggestions } from "../../hooks/use-get-suggestions";
import { Link } from 'react-router-dom'
import { ICONS, IMAGES } from '../../shared'
import styles from './home.module.css'
import { ProductList } from '../../components'
import { useGetProducts } from '../../hooks'
import { useEffect, useMemo } from 'react'
import { NewList } from "../../components/newOnSiteList";
	
export function HomePage() {
	const { products, isLoading, error } = useGetProducts();
	
    const homeProducts = useMemo(() => {
		return products ? products.slice(0, 4) : [];
    }, [products]);
	
	if (!products || products.length === 0) return null;
	
	const [first_new, second_new, last_new] = products.slice(0, 3);
		
	return (
		<>
			<div className={styles.heading}>
				<p className={styles.headingText}>ТЕХНОЛОГІЇ</p>
				<p className={styles.headingText}>ЯКІ ЗМІНЮЮТЬ РЕАЛЬНІСТЬ</p>
			</div>
			<ICONS.BigDrone className={styles.BigDrone} />
			<div className={styles.toCatalog}>
				<span>
					Передові технології в одному місці.
					<br /> Обирай найкраще для найважливішого.
				</span>
				<Link to="/catalog">ДО КАТАЛОГУ</Link>
			</div>
			<div className={styles.whiteEllipse} />
			<div className={styles.whiteSpace} />
			<div className={styles.aboutUsBlock}>
				<h3>ПРО НАС</h3>
				<span>
					Ми — команда, що об'єднує технології та надійність.
					<br /> Пропонуємо дрони й тепловізори, перевірені у
					найскладніших умовах.
					<br /> Обираємо тільки те, чому довіряємо самі.
				</span>
				<Link to="/about">
					<p>ЧИТАТИ БІЛЬШЕ</p>
					<ICONS.RightArrow />
				</Link>
			</div>
			<h3 className={styles.newOnSite}>НОВЕ НА САЙТІ</h3>
			{<NewList />}
		<div className={styles.CatalogBlock}>
			<h3>
				КАТАЛОГ
			</h3>
			<div className={styles.catalogProducts}>
				{
					isLoading ? <p>Products are loading, please wait</p> : <></>
				}
				{
					error ? <p>Error when trying to get products. Please try again later</p> : <ProductList filteredProducts={homeProducts} />
				}
			</div>
			<Link className={styles.toCatalogButton} to='/catalog' >
				<p>ДИВИТИСЬ ВСІ</p>
				<ICONS.WhiteRightArrow/>
			</Link>
		</div>
	</>
	)
}