import React, { useState, useEffect, useContext } from 'react';
import sendAnalytics from '../../utils/analytics/analytics';
import Button from '../UI/Button';
import Input from '../UI/Input';
import '../Header/Header.css';
import { User } from '../../App';
import ModalProfile from '../Modal/ModalProfile';
import { Link, useNavigate } from 'react-router-dom';

//ДОБАВИТЬ ЛИНКИ
//СДЕЛАТЬ МОДАЛКИ

const Header: React.FC<{ user: User | null; cartCount: number }> = ({ user, cartCount }) => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogoClick = (path: string) => {
        sendAnalytics({
            event_type: "click",
            event_data: { track_id: "logo_click" },
            page_url: window.location.href,
        });
    };


    const handleProfileClick = (event: React.MouseEvent) => {
        event.preventDefault();
        if (user) {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    // async function logout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    //     event.preventDefault()
    //     console.log()
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`, {
    //         withCredentials: true
    //     })
    //     console.log(response.data)
    //     navigate('/')
    //     navigate(0)
    // }

    const handleLogout = () => {
        // сделать потом
        setIsModalOpen(false);
    };

    return (
        <header className="bg-white">
            <div className="wrapper">
                <div className="header">

                    {/* Логотип */}
                    <div className="header__logo">
                        <Link
                            to="/"
                            className="header__logo-link"
                            onClick={() => handleLogoClick('/')}>
                            <img
                                src='/assets/logo.svg'
                                alt="Web Store"
                            />
                        </Link>
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
                            {user ? (
                                <li className="header__auth-icon">
                                    <a href="#" onClick={handleProfileClick}>
                                        <img
                                            src={user.img || "/assets/login.svg"}
                                            alt="Профиль"
                                            className="profile-avatar"
                                        />
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

                        {/* Модальное окно */}
                        {isModalOpen
                            && user
                            && (
                                <div className="modal-backdrop" onClick={handleCloseModal}>
                                    <div
                                        className="modal-profile"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ModalProfile
                                            user={user}
                                            onClose={handleCloseModal}
                                            onLogout={handleLogout}
                                        />
                                    </div>
                                </div>
                            )}





                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;
