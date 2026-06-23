import { useParams, Route, Link } from 'react-router-dom';
import { useGetProduct } from '../../hooks/use-get-product';
import { ICONS } from "../../shared";
import { StandartBlock } from '../../components/productPage/standartBlock';
import { CharacteristicBlock } from '../../components/productPage/characteristicBlock';
import { VideoBlock } from '../../components/productPage/videoBlock';
import { SimilarBlock } from '../../components/productPage/similarBlock'; // Импорт нового блока
import styles from './product.module.css';

export function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const { product, loading, error } = useGetProduct(id);

    if (loading) return <div className={styles.loader}>Завантаження...</div>;
    if (error || !product) return <div className={styles.error}>Товар не знайдено</div>;

    const contentBlocks = product.blocks?.filter(block => !(block.techDetails && block.techDetails.length > 0)) || [];
    const techBlocks = product.blocks?.filter(block => block.techDetails && block.techDetails.length > 0) || [];

    const mainImage = product.blocks?.[0]?.image || "";
    const currentPrice = product.discount ? product.price - product.discount : product.price;

    return (
        <div className={styles.container}>
            <div className={styles.priceCard}>
                <div className={styles.pcTop}>
                    {mainImage && <img src={mainImage} alt={product.name} className={styles.pcImg} />}
                    <div className={styles.pcInfo}>
                        <span className={styles.pcName}>{product.name}</span>
                        <div className={styles.pcPrices}>
                            <span className={`${styles.pcPrice} ${product.discount ? styles.crossed : ''}`}>
                                {product.price.toLocaleString()} ₴
                            </span>
                            {product.discount && (
                                <span className={styles.pcDiscount}>
                                    {currentPrice.toLocaleString()} ₴
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.pcActions}>
                    <button className={styles.pcCart} aria-label="Кошик">
                        <ICONS.CartPriceCard className={styles.pcCartImg}/>
                    </button>
                    <button className={styles.pcBuy}>Замовити</button>
                </div>
            </div>

            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>{product.name}</h1>
                <p className={styles.heroSubtitle}>
                    
                </p>
                <div className={styles.heroDrone}>
                    {mainImage && <img src={mainImage} alt={product.name} />}
                </div>
                <div className={styles.heroEllipse} />
            </section>
            <div className={styles.contentBody}>
                {product.blocks && product.blocks.length > 0 ? (
                    <>
                        {contentBlocks.map((block, index) => {
                            if (block.image.includes('youtube.com')) {
                                return (
                                    <VideoBlock 
                                        key={block.id || index}
                                        title={block.header} 
                                        description={block.description}
                                        videoUrl={block.image} 
                                    />
                                );
                            }
                            return (
                                <StandartBlock 
                                    key={block.id || index}
                                    header={block.header}
                                    description={block.description}
                                    image={block.image}
                                    isOdd={index % 2 === 0} 
                                />
                            );
                        })}
                        {techBlocks.map((block, index) => (
                            <CharacteristicBlock key={block.id || `tech-${index}`} block={block} />
                        ))}
                    </>
                ) : (
                    <Link to=''/>
                )}
            </div>

            <SimilarBlock currentId={id} />
        </div>
    );
}