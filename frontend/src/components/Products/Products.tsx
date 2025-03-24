import React, { useState, useEffect } from 'react';
import Button from '../UI/Button'; // Кнопка с аналитикой
import '../Products/Products.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';

export interface Product {
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

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const { addToCart, addedToCart } = useCart();

    const PAGE_SIZE = 10;

    const formatPrice = (price: number) => {
        return Math.floor(price).toLocaleString("ru-RU");
    };

    const fetchProducts = async (page: number) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/?page=${page}&limit=${PAGE_SIZE}`, {
                credentials: 'include',
            });
            const data: Product[] = await res.json();
            if (data.length < PAGE_SIZE) setHasMore(false);
            setProducts((prev) => [...prev, ...data]);
            setLoading(false);
        } catch (err) {
            console.error('Ошибка загрузки продуктов:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    return (
        <main>
            <div className="wrapper">
                <section className="recomendation">
                    <h2 className="recomendation-title">Рекомендуем для вас</h2>
                    <InfiniteScroll
                        dataLength={products.length}
                        next={() => setPage((prev) => prev + 1)}
                        hasMore={hasMore}
                        loader={<div className="loader">Загрузка...</div>}
                        endMessage={<p className="end-message">Вы просмотрели все товары!</p>}
                    >
                        <div className="recomendation__container">
                            {products.map((product) => (
                                <article key={product.id} className="recomendation__container-item">
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
                                        {product.max_price && (
                                            <div className="container-item-oldprice">
                                                {formatPrice(product.max_price)} ₽
                                            </div>
                                        )}
                                        <p className="container-item-name" title={product.name}>{product.name}</p>
                                    </a>
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
                                            className="item-cart-btn"
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
                                </article>
                            ))}
                        </div>
                    </InfiniteScroll>
                </section>
            </div>
        </main>
    );
};

export default Products;
