import CartProduct from "../../pages/CartPage/CartPage";

interface CartItemProps {
    cartProduct: CartProduct;
    onQuantityChange: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ cartProduct, onQuantityChange }) => {
    const { product, quantity } = cartProduct;

    const increment = async () => {

        onQuantityChange();
    };

    const decrement = async () => {

        onQuantityChange();
    };

    const removeItem = async () => {

        onQuantityChange();
    };

    return (
        <div className="cart__products">
            <div className="select-btn-container">
                <button className="select-btn">✔</button>
            </div>

            <div className="cart__products-item-img">
                <img src="" alt="Товар" />
            </div>
            
            <div className="cart__product-item">
                <div className="products-item-title">{product.name}</div>
                <button className="remove-btn" onClick={removeItem}>
                    Удалить
                </button>
            </div>

            <div className="cart__product-count">
                <button className="decrement">-</button>
                <span className="count">1</span>
                <button className="increment">+</button>
            </div>
            <div className="cart__product-price">
                <div className="product-price__new">{product.price.toLocaleString("ru-RU")} ₽</div>
                <div className="product-price__old">{product.max_price.toLocaleString("ru-RU")} ₽</div>
                <div className="product-price__sale">
                    -{Math.round(((product.max_price - product.price) / product.max_price) * 100)}%
                </div>
            </div>
        </div>
    )
}

export default CartItem;