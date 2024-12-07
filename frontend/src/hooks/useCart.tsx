import axios from "axios";


export const addItemToCart = async (product_id: number): Promise<void> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        console.error("Токен отсутствует");
        return;
    }

    await axios.post(`${process.env.REACT_APP_API_URL}/carts/add`,
        { product_id },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        },
    );
};