import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import Cookies from 'js-cookie';
import ProfilePage from './pages/ProfilePage/ProfilePage';

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    img: string;
    age: number;
    birthday: Date;
    gender: string;
    role_id: number;
    role: string;
    created_at: Date;
    updated_at: Date;
}

const App: React.FC = () => {
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/carts/count`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                if (data && typeof data.count === "number") {
                    setCartCount(data.count);
                }
            } catch (error) {
                console.error("Ошибка получения количества товаров в корзине:", error);
            }
        };


        fetchCartCount();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);

                const token = localStorage.getItem("accessToken");
                if (!token) {
                    console.error("Токен отсутствует");
                    return;
                }

                const response = await axios.get<User>(
                    `${process.env.REACT_APP_API_URL}/auth/current`,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.error("Не удалось получить пользователя", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);



    if (loading) {
        return <div>Загрузка...</div>;
    }


    return (
        <div className="App">
            <Header user={user} cartCount={cartCount} />
            <Routes>
                <Route path="/" element={<HomePage user={user} />} />

                <Route
                    path="/auth"
                    element={
                        user ? <Navigate to="/profile" /> :
                            <AuthPage />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        user ?
                            <ProfilePage user={user} />
                            : <Navigate to="/auth" />
                    }
                />

                {/* <Route
                    path='/cart'
                    element={
                        user ?
                            <CartPage user={user} />
                            : <Navigate to="/auth" />
                    }
                /> */}


                {/* <Route path="/faq" element={<FAQ />} />
                <Route path="/sell-products" element={<SellProducts />} />
                <Route path="/collaboration" element={<Collaboration />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/vacancies" element={<Vacancies />} />
                <Route path="/support" element={<Support />} /> */}

            </Routes>
            <Footer />
        </div>
    );
};

export default App;