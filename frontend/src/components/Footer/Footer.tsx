import React from 'react';
import { Link } from 'react-router-dom';
import '../Footer/Footer.css';
import sendAnalytics from '../../utils/analytics/analytics';


const Footer: React.FC = () => {
    const handleLinkClick = (path: string) => {
        sendAnalytics({
            event_type: 'link_click',
            event_data: { link_path: path },
            page_url: window.location.href,
        });
    };


    return (
        <footer className="footer">
            <div className="footer__bg">
                <div className="wrapper">
                    <div className="footer__grid">
                        {/* Логотип */}
                        <div className="footer__column">
                            <Link to="/" className="footer__logo" onClick={() => handleLinkClick('/')}>
                                <img src="/assets/logo.svg" alt="Logo" />
                            </Link>
                        </div>


                        {/* Покупателям */}
                        <div className="footer__column">
                            <h3 className="footer__title">Покупателям</h3>
                            <ul className="footer__list">
                                <li>
                                    <Link
                                        to="/faq"
                                        className="footer__link"
                                        onClick={() => handleLinkClick('/faq')}
                                    >
                                        Вопросы и ответы
                                    </Link>
                                </li>
                            </ul>
                        </div>


                        {/* Продавцам и партнерам */}
                        <div className="footer__column">
                            <h3 className="footer__title">Продавцам и партнёрам</h3>
                            <ul className="footer__list">
                                <li>
                                    <Link
                                        to="/sell-products"
                                        className="footer__link"
                                        onClick={() => handleLinkClick('/sell-products')}
                                    >
                                        Продавать товары
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/collaboration"
                                        className="footer__link"
                                        onClick={() => handleLinkClick('/collaboration')}
                                    >
                                        Предложить сотрудничество
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/analytics"
                                        className="footer__link"
                                        onClick={() => handleLinkClick('/analytics')}
                                    >
                                        Анализ поведения пользователей
                                    </Link>
                                </li>
                            </ul>
                        </div>


                        {/* Компания */}
                        <div className="footer__column">
                            <h3 className="footer__title">Компания</h3>
                            <ul className="footer__list">
                                <li>
                                    <Link
                                        to="/about"
                                        className="footer__link"
                                        onClick={() => handleLinkClick('/about')}
                                    >
                                        О нас
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contacts"
                                        className="footer__link"
                                        onClick={() => handleLinkClick('/contacts')}
                                    >
                                        Контакты
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/vacancies"
                                        className="footer__link"
                                        onClick={() => handleLinkClick('/vacancies')}
                                    >
                                        Вакансии
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/support"
                                        className="footer__link"
                                        onClick={() => handleLinkClick('/support')}
                                    >
                                        Поддержка
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer;
