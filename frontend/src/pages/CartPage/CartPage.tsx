import React from "react";
import '../CartPage/CartPage.css';
import CartItem from "../../components/CartComponent/CartItem";
import { User } from "../../App";


// Основная страница корзины
const CartPage: React.FC<{ user: User | null; cartCount: number }> = ({ user, cartCount }) => {
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
                            <p className="left__header-count">Товаров: {cartCount}</p>
                        </header>
                        <div className="left__choice">
                            <button className="choice-product">Выбрано 2 товаров</button>
                            <button className="choice-all-products" onClick={handleSelectAll}>
                                Выбрать все
                            </button>
                        </div>
                        <section className="carts">
                            <section className="cart-section">
                                <CartItem />

                            </section>
                            <section className="cart-section">
                                <CartItem />

                            </section>
                            <section className="cart-section">
                                <CartItem />

                            </section>
                            <section className="cart-section">
                                <CartItem />

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
                        <p>г. Екатеринбург, ул. Какая-то, д. 8, кв. 12</p>
                        <p>Доставим 29 декабря</p>
                        <a
                            href="#"
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
                        <p>
                            Товары, 2 шт. <span>19 999 ₽</span>
                        </p>
                        <p>
                            Скидка <span>-999 ₽</span>
                        </p>
                        <p className="total">
                            Итого <span>19 000 ₽</span>
                        </p>
                        <button className="pay-btn" onClick={handleProceedToPayment}>
                            Перейти к оплате
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;