import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import "../AuthForms/SignupForm.css";

//СДЕЛАТЬ ЧТО ТО С ВВОДОМ ДАТЫ

const SignupForm: React.FC = () => {
    const [isMale, setIsMale] = useState<boolean>(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthday: "",
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
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        if (!formData.username || formData.username.length < 3) {
            newErrors.username = "Имя пользователя должно быть не менее 3 символов";
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Введите корректный email";
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = "Пароль должен быть не менее 6 символов";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Пароли не совпадают";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };

    const handleGenderChange = (gender: "male" | "female") => {
        setIsMale(gender === "male");
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setLoading(true);

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName || undefined,
                    lastName: formData.lastName || undefined,
                    birthday: formData.birthday || undefined,
                    gender: isMale ? "male" : "female",
                }),
                credentials: 'include',
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error('Ошибка регистрации:', errorData);
                throw new Error(errorData.message || "Ошибка регистрации");
            }

            const data = await res.json();
            console.log(data);
            window.location.href = "/";
        } catch (err: any) {
            console.error(err.message);
            setErrors((prev) => ({
                ...prev,
                username: err.message || "Ошибка сети. Попробуйте позже.",
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-container">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="right-initial">
                    <div className="initial-name">
                        <p className="name">Имя</p>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Иван"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="input-form"
                        />
                    </div>
                    <div className="initial-lastname">
                        <p className="lastname">Фамилия</p>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Иванов"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="input-form"
                        />
                    </div>
                </div>

                <div className="date-sex">
                    <div className="sex">
                        <p className="gender">Пол</p>
                        <div className="gender-choice">
                            <button
                                type="button"
                                className={`gender-option ${isMale ? "selected" : ""}`}
                                onClick={() => handleGenderChange("male")}
                            >
                                Мужской
                            </button>
                            <button
                                type="button"
                                className={`gender-option ${!isMale ? "selected" : ""}`}
                                onClick={() => handleGenderChange("female")}
                            >
                                Женский
                            </button>
                        </div>
                    </div>
                    <div className="date">
                        <p className="date-title">Дата рождения</p>
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            className="input-form"
                        />
                    </div>
                </div>

                <div className="login-email">
                    <div className="login">
                        <p className="info-title">Логин</p>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? "input--error" : "input-form"}
                        />
                        <span className="error">{errors.username}</span>
                    </div>
                    <div className="email">
                        <p className="info-title">Эл. почта</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="email@email.ru"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "input--error" : "input-form"}
                        />
                        <span className="error">{errors.email}</span>
                    </div>
                </div>

                <div className="password-input">
                    <div className="first-pass">
                        <p className="pass-title">Пароль</p>
                        <Input
                            type="password"
                            name="password"
                            trackId="register_password"
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? "input--error" : "input-form"}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <div className="repeate-pass">
                        <p className="pass-title">Подтвердите пароль</p>
                        <Input
                            type="password"
                            name="confirmPassword"
                            trackId="register_confirm_password"
                            placeholder="Подтвердите пароль"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? "input--error" : "input-form"}
                        />
                        {errors.confirmPassword && (
                            <span className="error">{errors.confirmPassword}</span>
                        )}
                    </div>
                </div>


                <Button
                    type="button"
                    eventType="click"
                    eventData={{ track_id: 'signup-click', }}
                    onClick={handleSubmit}
                    className="signup-btn"
                    disabled={loading}
                >
                    {loading ? "Регистрация..." : "Зарегистрироваться"}
                </Button>
            </form>
        </div>
    );
};


export default SignupForm;
