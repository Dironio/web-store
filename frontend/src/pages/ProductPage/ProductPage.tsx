import { useParams } from "react-router-dom";
import { Product } from "../../components/Products/Products";
import { useEffect, useState } from "react";


const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                <div className="product-details">
                    <div className="product-image">
                        <img src={product.photo_url} alt={product.name} />
                    </div>
                    <div className="product-info">
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-description">{product.description}</p>
                        <div className="product-pricing">
                            <p className="current-price">{product.price.toLocaleString("ru-RU")} ₽</p>
                            {product.max_price && (
                                <p className="old-price">
                                    {product.max_price.toLocaleString("ru-RU")} ₽
                                </p>
                            )}
                            {product.max_price && product.price < product.max_price && (
                                <p className="discount">
                                    Скидка:{" "}
                                    {Math.round(
                                        ((product.max_price - product.price) / product.max_price) * 100
                                    )}
                                    %
                                </p>
                            )}
                        </div>
                        <button
                            className="add-to-cart-btn"
                            onClick={() => console.log(`Добавить в корзину: ${product.name}`)}
                        >
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;