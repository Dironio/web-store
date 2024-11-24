import React, { useState } from "react";
import "./Auth.css";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const Auth: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "male",
        birthDate: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGenderChange = (gender: "male" | "female") => {
        setFormData((prev) => ({ ...prev, gender }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Логика регистрации пользователя
        console.log("Регистрация:", formData);
    };

    return (
        <div className="auth">
            <section className="auth__container">
                {/* Левая часть с изображением */}
                <div className="auth__image">
                    <img src="/assets/auth-container-img.svg" alt="Welcome" />
                </div>

                {/* Правая часть с формой */}
                <div className="auth__form">
                    <h2 className="auth__title">Регистрация аккаунта</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Имя и Фамилия */}
                        <div className="auth__row">
                            <div className="auth__field">
                                <label htmlFor="firstName" className="auth__label">Имя</label>
                                <Input
                                    type="text"
                                    className="firstName"
                                    id="firstName"
                                    value={formData.firstName}
                                    placeholder="Введите имя"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="auth__field">
                                <label htmlFor="lastName" className="auth__label">Фамилия</label>
                                <Input
                                    type="text"
                                    className="lastName"
                                    
                                    value={formData.lastName}
                                    placeholder="Введите фамилию"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Пол и Дата рождения */}
                        <div className="auth__row">
                            <div className="auth__field">
                                <label className="auth__label">Пол</label>
                                <div className="auth__gender">
                                    <button
                                        type="button"
                                        className={`auth__gender-btn ${formData.gender === "male" ? "active" : ""}`}
                                        onClick={() => handleGenderChange("male")}
                                    >
                                        Мужской
                                    </button>
                                    <button
                                        type="button"
                                        className={`auth__gender-btn ${formData.gender === "female" ? "active" : ""}`}
                                        onClick={() => handleGenderChange("female")}
                                    >
                                        Женский
                                    </button>
                                </div>
                            </div>
                            <div className="auth__field">
                                <label htmlFor="birthDate" className="auth__label">Дата рождения</label>
                                <div className="auth__date">
                                    <Input
                                        type="date"
                                        className="birthDate"
                                        id="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                    />
                                    <img src="/assets/calendar.svg" alt="Календарь" />
                                </div>
                            </div>
                        </div>

                        {/* Логин и Эл. почта */}
                        <div className="auth__row">
                            <div className="auth__field">
                                <label htmlFor="username" className="auth__label">Логин</label>
                                <Input
                                    type="text"
                                    className="username"
                                    id="username"
                                    value={formData.username}
                                    placeholder="Введите логин"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="auth__field">
                                <label htmlFor="email" className="auth__label">Эл. почта</label>
                                <Input
                                    type="email"
                                    className="email"
                                    id="email"
                                    value={formData.email}
                                    placeholder="Введите email"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Пароль и Подтверждение */}
                        <div className="auth__row">
                            <div className="auth__field">
                                <label htmlFor="password" className="auth__label">Пароль</label>
                                <Input
                                    type="password"
                                    className="password"
                                    id="password"
                                    value={formData.password}
                                    placeholder="Введите пароль"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="auth__field">
                                <label htmlFor="confirmPassword" className="auth__label">Подтвердите пароль</label>
                                <Input
                                    type="password"
                                    className="confirmPassword"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    placeholder="Повторите пароль"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Кнопки */}
                        <Button type="submit" className="auth__submit">Зарегистрироваться</Button>
                        <p className="auth__text">Уже есть аккаунт?</p>
                        <Button type="button" className="auth__login">Войти</Button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Auth;
