import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
import './FeaturedProducts.css';
import 'swiper/css';
import Button from '../UI/Button';



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


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/discount`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Ошибка загрузки товаров:', err));
  }, []);


  return (
    <div className="featured-products">
      <h2 className="featured-products__title">Лучшие предложения</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="featured-products__slide">
            <div className="product-card">
              <div className="product-card__content">
                <h3 className="product-card__title">{product.name}</h3>
                <p className="product-card__description">{product.description}</p>
                <p className="product-card__price-old">{product.max_price}₽</p>
                <p className="product-card__price-sale">{product.min_price}₽</p>
                <div className="product-card__actions">
                  <Button
                    className="product-card__button"
                    eventType="click"
                    eventData={{ track_id: 'view_product', product_id: product.id }}
                  >
                    Перейти к предложению
                  </Button>
                </div>
              </div>
              <div className="product-card__image">
                <img src={product.photo_url} alt={product.name} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


export default FeaturedProducts;
