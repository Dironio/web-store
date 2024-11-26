import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import Cookies from 'js-cookie';

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

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}


export const UserContext = createContext<UserContextType | null>(null);


const App: React.FC = () => {
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const token = Cookies.get("authToken");
        if (token) {
            fetch(`${process.env.REACT_APP_API_URL}/auth/current`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => setUser(data.user))
                .catch((err) => console.error("Ошибка получения пользователя:", err));
        }
    }, []);


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


    console.log(user);

    return (
        // <div className="App">
        //     <Header />
        //     <UserContext.Provider value={{ user, setUser }}>
        //         <Routes>
        //             <Route path="/" element={<HomePage />} />
        //             <Route path="/auth" element={<AuthPage />} />
        //         </Routes>
        //     </UserContext.Provider>
        //     <Footer />
        // </div>



        <div className="App">
            <UserContext.Provider value={{ user, setUser }}>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/auth"
                        element={user ? <Navigate to="/profile" /> : <AuthPage />}
                    />
                    <Route
                        path="/profile"
                    // element={user ? <ProfilePage /> : <Navigate to="/auth" />}
                    />
                </Routes>
                <Footer />
            </UserContext.Provider>
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