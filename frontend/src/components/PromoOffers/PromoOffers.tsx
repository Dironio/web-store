import React from 'react';
import Button from '../UI/Button';
import '../PromoOffers/PromoOffers.css';

const PromoOffers: React.FC = () => {
    return (
        <div className="wrapper">
            <section className="promo">
                <div className="promo__item">
                    <img className="promo__item-img" src="/assets/sale.svg" alt="Sale" />
                    <Button
                        className="promo__item-btn"
                        eventType="click"
                        eventData={{ track_id: 'promo_sale_click', page: 'sale_page' }}
                        onClick={() => window.location.assign('/sale')}
                    >
                        <p>Распродажа товаров</p>
                        <img className="promo__item-arrow" src="/assets/strelka2.svg" alt="Arrow" />
                    </Button>
                </div>

                <div className="promo__item">
                    <img className="promo__item-img" src="/assets/newprod.svg" alt="New" />
                    <Button
                        className="promo__item-btn"
                        eventType="click"
                        eventData={{ track_id: 'promo_new_click', page: 'new_page' }}
                        onClick={() => window.location.assign('/new')}
                    >
                        <p>Новые товары на площадке</p>
                        <img className="promo__item-arrow" src="/assets/strelka2.svg" alt="Arrow" />
                    </Button>
                </div>

                <div className="promo__item">
                    <img className="promo__item-img" src="/assets/smallprice.svg" alt="Discount" />
                    <Button
                        className="promo__item-btn"
                        eventType="click"
                        eventData={{ track_id: 'promo_discount_click', page: 'discount_page' }}
                        onClick={() => window.location.assign('/discount')}
                    >
                        <p>Товары до 500 рублей</p>
                        <img className="promo__item-arrow" src="/assets/strelka2.svg" alt="Arrow" />
                    </Button>
                </div>

                <div className="promo__item">
                    <img className="promo__item-img" src="/assets/personsale.svg" alt="Limited" />
                    <Button
                        className="promo__item-btn"
                        eventType="click"
                        eventData={{ track_id: 'promo_limited_click', page: 'limited_page' }}
                        onClick={() => window.location.assign('/limited')}
                    >
                        <p>Персональные скидки</p>
                        <img className="promo__item-arrow" src="/assets/strelka2.svg" alt="Arrow" />
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default PromoOffers;
