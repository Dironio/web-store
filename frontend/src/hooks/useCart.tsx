import axios from "axios";
import { useState } from "react";


export const useCart = () => {
    const [addedToCart, setAddedToCart] = useState<number[]>([]);

    const addToCart = async (productId: number) => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                console.error("Токен отсутствует");
                return;
            }

            const res = await axios({
                url: `${process.env.REACT_APP_API_URL}/carts/add`,
                method: 'POST',
                data: { product_id: productId },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setAddedToCart((prev) => [...prev, productId]);
        } catch (err) {
            console.error('Ошибка при добавлении в корзину:', err);
        }
    };

    return { addToCart, addedToCart };
};