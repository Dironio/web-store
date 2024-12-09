import React, { useEffect, useState } from "react";
import '../CartPage/CartPage.css';
import CartItem from "../../components/CartComponent/CartItem";
import { User } from "../../App";
import { Product } from "../../components/Products/Products";
import axios from "axios";

interface CartProduct {
    cart_id: number;
    product: Product;
    quantity: number;
}

const CartProduct: React.FC<{ user: User | null; cartCount: number }> = ({ user, cartCount }) => {
    const [cartItems, setCartItems] = useState<CartProduct[]>([]);
    const [totalWithoutDiscount, setTotalWithoutDiscount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [totalWithDiscount, setTotalWithDiscount] = useState(0);

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("Токен отсутствует");
                return;
            }

            const res = await axios.get<CartProduct[]>(`${process.env.REACT_APP_API_URL}/carts/items`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = res.data;
            setCartItems(data);

            calculateTotals(data);
        } catch (err) {
            console.error("Ошибка при загрузке товаров корзины:", err);
        }
    };

    const calculateTotals = (items: CartProduct[]) => {
        let totalWithoutDiscount = 0;
        let discount = 0;

        items.forEach(({ product, quantity }) => {
            totalWithoutDiscount += product.max_price * quantity;
            discount += (product.max_price - product.price) * quantity;
        });

        setTotalWithoutDiscount(totalWithoutDiscount);
        setDiscount(discount);
        setTotalWithDiscount(totalWithoutDiscount - discount);
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const formatPrice = (price: number) => {
        return Math.floor(price).toLocaleString("ru-RU");
    };

    const handleSelectAll = () => {
        console.log("Выбраны все товары");
    };

    const handleProceedToPayment = () => {
        console.log("Переход к оплате");
    };

    return (
        <div className="wrapper">
            <div className="cart-container">
                <div className="cart-container__left">
                    <div className="left-padding">
                        <header className="left__header">
                            <h2 className="left__header-title">Корзина</h2>
                            <p className="left__header-count">Товаров: {cartItems.length}</p>
                        </header>
                        <div className="left__choice">
                            <button className="choice-product">Выбрано 2 товаров</button>
                            <button className="choice-all-products" onClick={handleSelectAll}>
                                Выбрать все
                            </button>
                        </div>
                        <section className="carts">
                            <section className="cart-section">
                                {cartItems.length === 0 ? (
                                    <p>Ваша корзина пуста</p>
                                ) : (
                                    cartItems.map((item) => (
                                        item.product ? (
                                            <CartItem
                                                key={item.cart_id}
                                                cartProduct={item}
                                                onQuantityChange={() => fetchCartItems()}
                                            />
                                        ) : (
                                            <p key={item.cart_id || Math.random()} style={{ color: 'red' }}>
                                                Ошибка
                                            </p>
                                        )))
                                )}
                            </section>
                        </section>
                    </div>
                </div>

                <div className="cart-container__right">
                    <h3 className="right-title">Способ оплаты</h3>
                    <div className="payment-details">
                        <p>Основной способ оплаты</p>
                        <p>
                            **** **** **** 1234{" "}
                            <button className="edit-btn" onClick={() => console.log("Изменить способ оплаты")}>
                                ✏️
                            </button>
                        </p>
                    </div>

                    <h3 className="right-title">Доставка</h3>
                    <div className="delivery-details">
                        <p>{user?.address || 'Не указано'}</p>
                        <p>Доставим 29 декабря</p>
                        <a
                            href="/profile"
                            className="change-delivery"
                            onClick={(e) => {
                                e.preventDefault();
                                console.log("Сменить адрес доставки");
                            }}
                        >
                            Сменить адрес доставки
                        </a>
                    </div>

                    <hr />

                    <div className="order-summary">
                        <p>Товары <span>{formatPrice(totalWithoutDiscount)} ₽</span></p>

                        <p>Скидка <span>-{formatPrice(discount)} ₽</span></p>

                        <p className="total">Итого <span>{formatPrice(totalWithDiscount)} ₽</span></p>

                        <button className="pay-btn" onClick={() => console.log("Переход на оплату")}>
                            Перейти к оплате
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;