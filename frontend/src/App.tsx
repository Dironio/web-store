import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';

const App: React.FC = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/count`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                if (data && typeof data.count === 'number') {
                    setCartCount(data.count);
                }
            } catch (error) {
                console.error('Ошибка получения количества товаров в корзине:', error);
            }
        };

        fetchCartCount();
    }, []);

    return (
        <div className="App">
            <Header />

        </div>
    );
};

export default App;