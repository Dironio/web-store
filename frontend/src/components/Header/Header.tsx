import React, { useState, useEffect } from 'react';
import '../Header/Header.module.css';


const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartCount, setCartCount] = useState(0);


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/auth/current`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.user) {
                    setIsLoggedIn(true);
                }
            })
            .catch((err) => console.error('Ошибка получения статуса пользователя:', err));
    }, []);


    return (
        <header className="bg-white">
            <div className="wrapper">
                <div className="header">
                    <div className="header__logo">
                        <a href="/" className="header__logo-link">
                            <img src="/assets/logo.svg" alt="Web Store" />
                        </a>
                    </div>

                    <div className="header__search">
                        <div className="search-category">
                            <a href="#" className="search-category-btn">
                                <img src="/assets/categ.svg" alt="Категория" />
                            </a>
                            <a href="#" className="search-category-label">
                                Категория
                            </a>
                        </div>
                        <div className="search-divider"></div>
                        <form className="search-form">
                            <ul className="search-list">
                                <li className="search-list-item">
                                    <input
                                        type="text"
                                        className="search-list-input"
                                        placeholder="Найти товар"
                                        onFocus={() => console.log('Пользователь открыл поиск')}
                                    />
                                </li>
                                <li className="search-list-icon">
                                    <button type="submit" className="search-list-link">
                                        <img src="/assets/ep_search.svg" alt="Искать" />
                                    </button>
                                </li>
                            </ul>
                        </form>
                    </div>


                    <div className="header__actions">
                        <ul className="header__cart">
                            <li className="header__cart-icon">
                                <a href="/cart">
                                    <img src="/assets/Vector.svg" alt="Корзина" />
                                </a>
                            </li>
                            <li className="header__cart-count">
                                <a href="/cart" className="cart-count">
                                    {cartCount > 99 ? '+99' : cartCount}
                                </a>
                            </li>
                        </ul>


                        <ul className="header__auth">
                            {isLoggedIn ? (
                                <li className="header__auth-icon">
                                    <a href="/profile">
                                        <img src="/assets/profile.svg" alt="Профиль" />
                                    </a>
                                </li>
                            ) : (
                                <li className="header__auth-icon">
                                    <a href="/login">
                                        <img src="/assets/login.svg" alt="Войти" />
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};


export default Header;
