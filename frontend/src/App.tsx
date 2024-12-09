import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartProduct from './pages/CartPage/CartPage';

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    img: string;
    age: number;
    birthday: Date;
    gender: string;
    address: string;
    role_id: number;
    role: string;
    created_at: Date;
    updated_at: Date;
}

const App: React.FC = () => {
    const [cartCount, setCartCount] = useState<number>(0);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        const getCount = async () => {
            try {
                setLoading(true);

                const token = localStorage.getItem("accessToken");

                if (!token) {
                    console.error("Токен отсутствует");
                    return;
                }

                const response = await axios.get<number>(`${process.env.REACT_APP_API_URL}/carts/count`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },);
                setCartCount(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке количества товаров:", error);
            }
        };

        getCount();
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
            <Header
                user={user}
                cartCount={cartCount}
            />

            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            user={user}
                        />}
                />

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

                <Route
                    path='/product/:id'
                    element={
                        <ProductPage />
                    }
                />

                <Route
                    path='/cart'
                    element={
                        user ?
                            <CartProduct
                                user={user}
                                cartCount={cartCount}
                            />
                            : <Navigate to="/auth" />
                    }
                />


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