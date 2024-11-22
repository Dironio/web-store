import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import PromoOffers from './components/PromoOffers/PromoOffers';
import Products from './components/Products/Products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage';

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
    role_id: number;
    created_at: Date;
    updated_at: Date;
}

export const UserContext = createContext<User | null>(null);

const App: React.FC = () => {
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get<User>(`${process.env.REACT_APP_API_URL}/auth/current`, {
                    withCredentials: true,
                });
                setUser(response.data);
            } catch (error) {
                console.log("Не удалось получить пользователя", error);
                setUser(null);
            }
        };


        fetchUser();
    }, []);



    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/carts/count`, {
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
            <UserContext.Provider value={user}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* <Route path="/auth" element={<AuthPage />} /> */}
                </Routes>
            </UserContext.Provider>
            <Footer />
        </div>


        // // <div className="App">
        // <Router>
        //     <div className="App">

        //         {/* Главный контент */}
        //         {/* <Routes> */}
        //         {/* <Route path="/" element={<Home />} />
        //                 <Route path="/faq" element={<FAQ />} />
        //                 <Route path="/sell-products" element={<SellProducts />} />
        //                 <Route path="/collaboration" element={<Collaboration />} />
        //                 <Route path="/analytics" element={<AnalyticsPage />} />
        //                 <Route path="/about" element={<About />} />
        //                 <Route path="/contacts" element={<Contacts />} />
        //                 <Route path="/vacancies" element={<Vacancies />} />
        //                 <Route path="/support" element={<Support />} /> */}
        //         {/* </Routes> */}


        //         {/* Футер */}
        //         <Header />
        //         <FeaturedProducts />
        //         <PromoOffers />
        //         {/* <Products /> */}

        //         <Footer />
        //     </div>
        // </Router>



        // </div>
    );
};

export default App;