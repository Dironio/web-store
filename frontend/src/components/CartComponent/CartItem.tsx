

const CartItem: React.FC = () => (
    <div className="cart__products">
        <div className="select-btn-container">
            <button className="select-btn">✔</button>
        </div>

        <div className="cart__products-item-img">
            <img src="" alt="Товар" />
        </div>
        <div className="cart__product-item">
            <div className="products-item-title">
                Wi-Fi роутер Keenetic Giga KN-1012
            </div>
            <button className="remove-btn">Удалить</button>
        </div>
        <div className="cart__product-count">
            <button className="decrement">-</button>
            <span className="count">1</span>
            <button className="increment">+</button>
        </div>
        <div className="cart__product-price">
            <div className="product-price__new">15 000 ₽</div>
            <div className="product-price__old">25 000 ₽</div>
            <div className="product-price__sale">-40%</div>
        </div>
    </div>
);


export default CartItem;