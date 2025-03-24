import { useContext, useEffect, useState } from "react";
import { User } from "../../App";
import Button from "../UI/Button";
import '../SpecialProducts/SpecialProducts.css'
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";

interface Product {
    id: number;
    seller_id: number;
    name: string;
    category: string;
    full_category: string;
    brand: string;
    seller: string;
    rating: string;
    price: number;
    description: string;
    sales: number;
    url: string;
    photo_url: string;
    max_price: number;
    min_price: number;
    avg_price: number;
    created_at: Date;
    updated_at: Date;
}

interface SpecialProductsProps {
    user: User | null;
}


const SpecialProducts: React.FC<SpecialProductsProps> = ({ user }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, addedToCart } = useCart();


    const formatPrice = (price: number) => Math.floor(price).toLocaleString('ru-RU');


    const fetchProducts = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
                credentials: 'include',
            });
            const data: Product[] = await res.json();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error('Ошибка загрузки специальных предложений:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchProducts();
        }
    }, [user]);


    if (!user || loading) {
        return null;
    }


    return (
        <div className="wrapper">
            <section className="special">
                <h2 className="special-title">Специальные предложения</h2>
                <div className="special__container">
                    {products.slice(0, 4).map((product) => (
                        <article key={product.id} className="special__container-item">
                            <Link to={`/product/${product.id}`}>
                                <a href="#" className="container-item-link">
                                    <div className="container-item-img">
                                        <img src={product.photo_url} alt={product.name} />
                                    </div>
                                    <div className="container-item-price">
                                        <h2 className="price-sale">{formatPrice(product.price)} ₽</h2>
                                        {product.max_price && product.price < product.max_price && (
                                            <p className="price-percent">
                                                {Math.round(
                                                    ((product.max_price - product.price) / product.max_price) * 100
                                                )}
                                                %
                                            </p>
                                        )}
                                    </div>
                                    {/* {product.max_price && (
                                    <div className="container-item-oldprice">{formatPrice(product.max_price)} ₽</div>
                                )} */}

                                    <div className="container-item-oldprice">
                                        {product.max_price && product.max_price !== product.price ? (
                                            formatPrice(product.max_price) + ' ₽'
                                        ) : (
                                            <div className="container-item-oldprice-hidden"></div>
                                        )}
                                    </div>

                                    <p className="container-item-name">{product.name}</p>
                                    <footer className="container-item-buy">
                                        <Button
                                            className="item-buy-btn"
                                            eventType="click"
                                            eventData={{ track_id: 'buy_click', product_id: product.id }}
                                            onClick={() => console.log(`Купить продукт: ${product.name}`)}
                                        >
                                            <Link to={`/product/${product.id}`}>Посмотреть</Link>
                                        </Button>

                                        <Button
                                            className={`item-cart-btn ${addedToCart.includes(product.id) ? 'added' : ''}`}
                                            eventType="click"
                                            eventData={{ track_id: 'add_to_cart_click', product_id: product.id }}
                                            onClick={() => addToCart(product.id)}
                                        >
                                            {addedToCart.includes(product.id) ? (
                                                <img src="/assets/check.svg" alt="Добавлено" />
                                            ) : (
                                                <img src="/assets/cartprod.svg" alt="Добавить в корзину" />
                                            )}
                                        </Button>
                                    </footer>
                                </a>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );


    //     <div className="wrapper">
    //     <section className="special">
    //         <h2 className="special-title">Специальные предложения</h2>
    //         <div className="special__container">
    //             {products.slice(0, 4).map((product) => (
    //                 <article key={product.id} className="special__container-item">
    //                     {/* Обертка для карточки */}
    //                     <Link to={`/product/${product.id}`} className="container-item-link">
    //                         {/* Картинка */}
    //                         <div className="container-item-img">
    //                             <img src={product.photo_url} alt={product.name} />
    //                         </div>

    //                         {/* Цена и скидка */}
    //                         <div className="container-item-price">
    //                             <h2 className="price-sale">{formatPrice(product.price)} ₽</h2>
    //                             {product.max_price && product.price < product.max_price && (
    //                                 <p className="price-percent">
    //                                     {Math.round(
    //                                         ((product.max_price - product.price) / product.max_price) * 100
    //                                     )}
    //                                     %
    //                                 </p>
    //                             )}
    //                         </div>

    //                         {/* Старая цена */}
    //                         <div className="container-item-oldprice">
    //                             {product.max_price && product.max_price !== product.price ? (
    //                                 formatPrice(product.max_price) + ' ₽'
    //                             ) : (
    //                                 <div className="container-item-oldprice-hidden"></div>
    //                             )}
    //                         </div>

    //                         {/* Название товара */}
    //                         <p className="container-item-name">{product.name}</p>

    //                         {/* Кнопка "Посмотреть" */}
    //                         <footer className="container-item-buy">
    //                             <Button
    //                                 className="item-buy-btn"
    //                                 eventType="click"
    //                                 eventData={{ track_id: 'buy_click', product_id: product.id }}
    //                                 onClick={(e) => {
    //                                     e.stopPropagation(); // Остановка всплытия события
    //                                     console.log(`Купить продукт: ${product.name}`);
    //                                 }}
    //                             >
    //                                 Посмотреть
    //                             </Button>
    //                         </footer>
    //                     </Link>

    //                     {/* Кнопка корзины */}
    //                     <Button
    //                         className={`item-cart-btn ${addedToCart.includes(product.id) ? 'added' : ''}`}
    //                         eventType="click"
    //                         eventData={{ track_id: 'add_to_cart_click', product_id: product.id }}
    //                         onClick={(e) => {
    //                             e.stopPropagation(); // Остановка всплытия события
    //                             addToCart(product.id);
    //                         }}
    //                     >
    //                         {addedToCart.includes(product.id) ? (
    //                             <img src="/assets/check.svg" alt="Добавлено" />
    //                         ) : (
    //                             <img src="/assets/cartprod.svg" alt="Добавить в корзину" />
    //                         )}
    //                     </Button>
    //                 </article>
    //             ))}
    //         </div>
    //     </section>
    // </div>
};




export default SpecialProducts;