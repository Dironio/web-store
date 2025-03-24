import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Button from "../UI/Button";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./FeaturedProducts.css";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  max_price: number;
  min_price: number;
  photo_url: string;
}

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const nextArrow = "/assets/strelka-pravo.svg";
  const prevArrow = "/assets/stelka-levo.svg";

  const formatDescription = (description: string) => {
    if (!description) return "";
    const match = description.match(/^(.*?\.)/); // подумать как разделить по слешу
    return match ? match[0] : description;
  };

  const formatPrice = (price: number) => {
    return Math.floor(price).toLocaleString("ru-RU");
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/discount`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Ошибка загрузки товаров:", err));
  }, []);

  return (
    <section className="wrapper">
      <div className="featured-products">
        {/* <h2 className="featured-products__title">Лучшие предложения</h2> */}
        <div className="featured-products__container">
          {/* Swiper */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            className="featured-products__swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="featured-products__slide">
                {/* Карточка продукта */}
                <div className="product-card">
                  <div className="product-card__content">
                    <h3 className="product-card__title">{product.name}</h3>
                    <p className="product-card__description">
                      {formatDescription(product.description)}
                    </p>
                    <p className="product-card__price-old">
                      {formatPrice(product.max_price)} ₽
                    </p>
                    <p className="product-card__price-sale">
                      {formatPrice(product.min_price)} ₽
                    </p>
                    <div className="product-card__actions">
                      <Button
                        className="product-card__button"
                        eventType="click"
                        eventData={{
                          track_id: "view_product",
                          product_id: product.id,
                          product_name: product.name,
                        }}
                      >
                        <Link to={`/product/${product.id}`}>Перейти к предложению</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="product-card__image">
                    <img src={product.photo_url} alt={product.name} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-next">
              {/* <img src={nextArrow} alt="Следующий" /> */}
            </div>
            <div className="swiper-button-prev">
              {/* <img src={prevArrow} alt="Предыдущий" /> */}
            </div>
            {/* Кастомные кнопки */}
            {/* <div className="swiper-button-next">
            <img src={nextArrow} alt="Следующий" />
          </div>
          <div className="swiper-button-prev">
            <img src={prevArrow} alt="Предыдущий" />
          </div> */}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
