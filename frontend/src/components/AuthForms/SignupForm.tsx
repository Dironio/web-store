import React, { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

const Registration: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // Убираем ошибку при вводе
    };

    const validate = () => {
        const newErrors = { ...errors }; // Копируем текущие ошибки
        newErrors.username = !formData.username || formData.username.length < 3
            ? "Имя пользователя должно быть не менее 3 символов"
            : "";
        newErrors.email = !formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
            ? "Введите корректный email"
            : "";
        newErrors.password = !formData.password || formData.password.length < 6
            ? "Пароль должен быть не менее 6 символов"
            : "";
        newErrors.confirmPassword = formData.password !== formData.confirmPassword
            ? "Пароли не совпадают"
            : "";
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };


    const handleSubmit = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setErrors((prev) => ({
                    ...prev,
                    username: errorData.message || "Ошибка регистрации",
                }));
                setLoading(false);
                return;
            }

            const data = await res.json();
            console.log("Регистрация успешна:", data);
        } catch (err) {
            console.error("Ошибка сети:", err);
            setErrors((prev) => ({
                ...prev,
                username: "Ошибка сети. Попробуйте позже.",
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-container">
            <h2>Регистрация</h2>
            <form>
                <Input
                    type="text"
                    name="username"
                    trackId="register_username"
                    placeholder="Имя пользователя"
                    value={formData.username}
                    onChange={handleChange}
                    className={errors.username ? "input--error" : ""}
                />
                {errors.username && <span className="error">{errors.username}</span>}

                <Input
                    type="email"
                    name="email"
                    trackId="register_email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "input--error" : ""}
                />
                {errors.email && <span className="error">{errors.email}</span>}

                <Input
                    type="password"
                    name="password"
                    trackId="register_password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "input--error" : ""}
                />
                {errors.password && <span className="error">{errors.password}</span>}

                <Input
                    type="password"
                    name="confirmPassword"
                    trackId="register_confirm_password"
                    placeholder="Подтвердите пароль"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "input--error" : ""}
                />
                {errors.confirmPassword && (
                    <span className="error">{errors.confirmPassword}</span>
                )}

                <Button
                    onClick={handleSubmit}
                    className="register-button"
                    eventType="register_attempt"
                >
                    {loading ? "Регистрация..." : "Зарегистрироваться"}
                </Button>
            </form>
        </div>
    );
};

export default Registration;
