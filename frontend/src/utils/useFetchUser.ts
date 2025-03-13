import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../App";


export const useFetchUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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

    return { user, loading };
};