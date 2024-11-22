import { useContext, useEffect, useState } from "react";
import { User, UserContext } from "../../App";
import Button from "../UI/Button";

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
        <section className="special">
            <h2 className="special-title">Специальные предложения</h2>
            <div className="special__container">
                {products.slice(0, 4).map((product) => (
                    <article key={product.id} className="special__container-item">
                        <a href="#" className="container-item-link">
                            <div className="container-item-img">
                                <img src={product.photo_url} alt={product.name} />
                            </div>
                            <div className="container-item-price">
                                <h2 className="price-sale">{formatPrice(product.price)} ₽</h2>
                                {product.max_price && (
                                    <p className="price-percent">
                                        {Math.round(((product.max_price - product.price) / product.max_price) * 100)}%
                                    </p>
                                )}
                            </div>
                            {product.max_price && (
                                <div className="container-item-oldprice">{formatPrice(product.max_price)} ₽</div>
                            )}
                            <p className="container-item-name">{product.name}</p>
                            <footer className="container-item-buy">
                                <Button
                                    className="item-buy-btn"
                                    eventType="click"
                                    eventData={{ track_id: 'buy_click', product_id: product.id }}
                                    onClick={() => console.log(`Купить продукт: ${product.name}`)}
                                >
                                    Купить
                                </Button>
                                <Button
                                    className="item-cart-btn"
                                    eventType="click"
                                    eventData={{ track_id: 'add_to_cart_click', product_id: product.id }}
                                    onClick={() => console.log(`Добавить в корзину: ${product.name}`)}
                                >
                                    <img src="/assets/cartprod.svg" alt="Добавить в корзину" />
                                </Button>
                            </footer>
                        </a>
                    </article>
                ))}
            </div>
        </section>
    );
};




export default SpecialProducts;