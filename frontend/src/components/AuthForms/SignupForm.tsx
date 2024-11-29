import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import "../AuthForms/SignupForm.css";
import BirthdayComponent from "../UI/BirthdayComponent";
import { useNavigate } from "react-router-dom";
import GenderChoice from "../UI/GenderChoice";


const SignupForm: React.FC = () => {
    const [isMale, setIsMale] = useState<boolean>(true);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthday: "",
        gender: "Мужской"
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

    const handleGenderChange = (gender: "Мужской" | "Женский") => {
        setIsMale(gender === "Мужской");
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
                    gender: isMale ? "Мужской" : "Женский",
                }),
                credentials: "include",
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Некорректный ответ от сервера.");
            }

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Ошибка регистрации:", errorData);
                throw new Error(errorData.message || "Ошибка регистрации");
            }

            const data = await res.json();
            console.log(data);
            navigate("/");
            navigate(0);
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

    useEffect(() => {
        const savedFormData = localStorage.getItem("signupFormData");
        if (savedFormData) {
            setFormData((prev) => ({
                ...prev,
                ...JSON.parse(savedFormData),
                password: "",
                confirmPassword: ""
            }));
        }
    }, []);


    useEffect(() => {
        const { password, confirmPassword, ...dataToSave } = formData;
        console.log("localStorage:", dataToSave);
        localStorage.setItem("signupFormData", JSON.stringify(dataToSave));
    }, [formData]);



    return (
        <div className="registration-container">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="right-initial">
                    <div className="initial-name">
                        <p className="name">Имя</p>
                        <Input
                            type="text"
                            name="firstName"
                            trackId="firstname-signup"
                            placeholder="Иван"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="input-form"
                        />
                    </div>
                    <div className="initial-lastname">
                        <p className="lastname">Фамилия</p>
                        <Input
                            type="text"
                            name="lastName"
                            trackId="lastname-signup"
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
                        <GenderChoice
                            onGenderChange={(gender) => setFormData((prev) => ({ ...prev, gender }))}
                        />
                    </div>
                    <div className="date">
                        <p className="date-title">Дата рождения</p>
                        <div className="input-date">
                            <BirthdayComponent value={formData.birthday}
                                onChange={(value) => setFormData((prev) => ({ ...prev, birthday: value }))}
                            />
                            <img
                                src="/assets/calendar.svg"
                                alt="calendar-icon"
                                className="calendar-icon"
                                onClick={() =>
                                    document.querySelector<HTMLInputElement>(`imput-date`)?.click()
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="login-email">
                    <div className="login">
                        <p className="info-title">Логин</p>
                        <Input
                            type="text"
                            name="username"
                            trackId="username-signup"
                            placeholder="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? "input--error" : "input-form"}
                        />
                        <span className="error">{errors.username}</span>
                    </div>
                    <div className="email">
                        <p className="info-title">Эл. почта</p>
                        <Input
                            type="email"
                            name="email"
                            trackId="email-signup"
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
