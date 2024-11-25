import React, { useState, useEffect } from 'react';
import sendAnalytics from '../../utils/analytics/analytics';
import Button from '../UI/Button';
import Input from '../UI/Input';
import '../Header/Header.css';

//ДОБАВИТЬ ЛИНКИ
//СДЕЛАТЬ МОДАЛКИ
//ОБРАБОТКА ОШИБОК ПОПРАВИТЬ 4 минимал логин, пароль от 4?

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/auth/current`, { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => {
                if (data?.user) {
                    setIsLoggedIn(true);
                }
            })
            .catch((err) => console.error('Ошибка получения статуса пользователя:', err));
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/carts/count`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                setCartCount(data.count || 0);
            })
            .catch((err) => console.error('Ошибка получения количества товаров в корзине:', err));
    }, []);

    const handleLogoClick = () => {
        sendAnalytics({
            event_type: 'click',
            event_data: { track_id: 'logo_click' },
            page_url: window.location.href,
        });
    };

    return (
        <header className="bg-white">
            <div className="wrapper">
                <div className="header">
                    {/* Логотип */}
                    <div className="header__logo">
                        <Button
                            className="header__logo-link"
                            eventType="click"
                            eventData={{ track_id: 'logo_click' }}
                            onClick={handleLogoClick}
                        >
                            <img src='/assets/logo.svg' alt="Web Store" />
                        </Button>
                    </div>

                    {/* Поисковая строка */}
                    <div className="header__search">
                        <div className="search-category">
                            <Button
                                className="search-category-btn"
                                eventType="click"
                                eventData={{ track_id: 'category_open' }}
                            >
                                <img src="/assets/categ.svg" alt="Категория" />
                            </Button>
                            <Button
                                className="search-category-label"
                                eventType="click"
                                eventData={{ track_id: 'category_label_click' }}
                            >
                                Категория
                            </Button>
                        </div>
                        <div className="search-divider"></div>
                        <form className="search-form">
                            <ul className="search-list">
                                <li className="search-list-item">
                                    <Input
                                        type='text'
                                        className="search-list-input"
                                        placeholder="Найти товар"
                                        trackId="search_input"
                                    />
                                </li>
                                <li className="search-list-icon">
                                    <Button
                                        className="search-list-link"
                                        eventType="click"
                                        eventData={{ track_id: 'search_button_click' }}
                                    >
                                        <img src="/assets/ep_search.svg" alt="Искать" />
                                    </Button>
                                </li>
                            </ul>
                        </form>
                    </div>

                    {/* Действия в хедере */}
                    <div className="header__actions">
                        <ul className="header__cart">
                            <li className="header__cart-icon">
                                <a href="/cart">
                                    <img src="/assets/Vector.svg" alt="Корзина" />
                                </a>
                            </li>
                            <li className="header__cart-count">
                                <a href="/cart" className="cart-count">
                                    {cartCount > 99 ? '+99' : cartCount} {/* через count */}
                                </a>
                            </li>
                        </ul>

                        {/* Авторизация */}
                        <ul className="header__auth">
                            {isLoggedIn ? (
                                <li className="header__auth-icon">
                                    <a href="/profile">
                                        <img src="/assets/login.svg" alt="Профиль" />
                                    </a>
                                </li>
                            ) : (
                                <li className="header__auth-icon">
                                    <a href="/auth">
                                        <img src="/assets/auth.svg" alt="Войти" />
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
