import { useParams } from "react-router-dom";
import { Product } from "../../components/Products/Products";
import { useEffect, useState } from "react";
import './ProductPage.css';
import Button from "../../components/UI/Button";
import { useCart } from "../../hooks/useCart";


const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart, addedToCart } = useCart();

    const fetchProduct = async (productId: string) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
                credentials: "include",
            });
            if (!res.ok) throw new Error("Не удалось загрузить данные о продукте.");
            const data: Product = await res.json();
            setProduct(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Ошибка загрузки данных о продукте.");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProduct(id);
    }, [id]);

    if (loading) return <div className="loader">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="wrapper">
            {product && (
                <>
                    <div className="product-page-details">
                        <div className="product-page-image">
                            <img src={product.photo_url} alt={product.name} />
                        </div>
                        <div className="product-page-info">
                            <h1 className="product-page-title">{product.name}</h1>
                            <p className="product-page-description">{product.description}</p>
                            <div className="product-page-pricing">
                                <p className="product-page-current-price">{product.price.toLocaleString("ru-RU")} ₽</p>
                                {product.max_price && (
                                    <p className="product-page-old-price">
                                        {product.max_price.toLocaleString("ru-RU")} ₽
                                    </p>
                                )}
                                {product.max_price && product.price < product.max_price && (
                                    <p className="product-page-discount">
                                        Скидка:{" "}
                                        {Math.round(
                                            ((product.max_price - product.price) / product.max_price) * 100
                                        )}
                                        %
                                    </p>
                                )}
                            </div>
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
                        </div>
                    </div>
                    <div className="">
                        Похожие товары
                    </div>

                    <div className="product-page-reviews-section">
                        <h2 className="product-page-reviews-title">Отзывы</h2>
                        <p className="product-page-reviews-unavailable">
                            Раздел отзывов находится в разработке
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductPage;