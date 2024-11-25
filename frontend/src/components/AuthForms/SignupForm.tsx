import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import "../AuthForms/SignupForm.css";

//СДЕЛАТЬ ЧТО ТО С ВВОДОМ ДАТЫ
//СДЕЛАТЬ ЗАПРОС НА БЭК
//СДЕЛАТЬ СТИЛИ ОШИБОК
//СДЕЛАТЬ ОБРАБОТКУ ОШИБОК

const SignupForm: React.FC = () => {
    const [isMale, setIsMale] = useState<boolean>(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastname: "",
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
        // birthday: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = { ...errors };
        newErrors.username =
            !formData.username || formData.username.length < 3
                ? "Имя пользователя должно быть не менее 3 символов"
                : "";
        newErrors.email =
            !formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                ? "Введите корректный email"
                : "";
        newErrors.password =
            !formData.password || formData.password.length < 6
                ? "Пароль должен быть не менее 6 символов"
                : "";
        newErrors.confirmPassword =
            formData.password !== formData.confirmPassword
                ? "Пароли не совпадают"
                : "";
        // newErrors.birthday = !formData.birthday ? "Дата рождения обязательна" : "";


        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };

    const formatDateForBackend = (date: string) => {
        const [year, month, day] = date.split("-");
        return `${month}.${day}.${year}`;
    };

    const formatDateForFrontend = (date: string) => {
        const [month, day, year] = date.split(".");
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const savedGender = localStorage.getItem("gender");
        const savedBirthday = localStorage.getItem("birthday");


        if (savedBirthday) {
            setFormData((prev) => ({
                ...prev,
                birthday: formatDateForFrontend(savedBirthday),
            }));
        }


        setIsMale(savedGender !== "female");
    }, []);


    const handleGenderChange = (gender: "male" | "female") => {
        setIsMale(gender === "male");
        localStorage.setItem("gender", gender);
    };

    const handleSubmit = async () => {
        if (!validate()) return;


        const formattedDate = formatDateForBackend(formData.birthday);


        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    ...formData,
                    birthday: formattedDate,
                    gender: isMale ? "male" : "female",
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
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="right-initial">
                    <div className="initial-name">
                        <p className="name">Имя</p>
                        <Input
                            type="text"
                            name="name"
                            trackId="register_name"
                            placeholder="Иван"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="input-form"
                        />
                        {/* {errors.firstName && <span className="error">{errors.firstName}</span>} */}
                    </div>
                    <div className="initial-lastname">
                        <p className="lastname">Фамилия</p>
                        <Input
                            type="text"
                            name="lastname"
                            trackId="register_lastname"
                            placeholder="Иванов"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="input-form"
                        />
                        {/* {errors.lastname && <span className="error">{errors.lastname}</span>} */}
                    </div>
                </div>


                <div className="date-sex">
                    <div className="sex">
                        <p className="gender">Пол</p>
                        <div className={`gender-choice ${isMale ? "" : "is-female"}`}>
                            <Button
                                className={`gender-option ${isMale ? "selected" : ""}`}
                                onClick={() => handleGenderChange("male")}
                                eventType="gender_select"
                                eventData={{ gender: "male" }}
                            >
                                Мужской
                            </Button>
                            <Button
                                className={`gender-option ${!isMale ? "selected" : ""}`}
                                onClick={() => handleGenderChange("female")}
                                eventType="gender_select"
                                eventData={{ gender: "female" }}
                            >
                                Женский
                            </Button>
                        </div>
                    </div>


                    <div className="date">
                        <p className="date-title">Дата рождения</p>
                        <div className="input-date">
                            <Input
                                type="date"
                                name="birthday"
                                trackId="register_birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                                className="input-form"
                            />
                            {/* <img
                                src="/assets/calendar.svg"
                                alt="calendar-icon"
                                className="calendar-icon"
                                onClick={() =>
                                    document.querySelector<HTMLInputElement>('input[name="birthday"]')?.click()
                                }
                            /> */}
                            {/* {errors.birthday && <span className="error">{errors.birthday}</span>} */}
                        </div>
                    </div>
                </div>


                <div className="login-email">
                    <div className="login">
                        <p className="info-title">Логин</p>
                        <Input
                            type="text"
                            name="username"
                            trackId="register_username"
                            placeholder="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? "input--error" : "input-form"}
                        />
                        {errors.username && <span className="error">{errors.username}</span>}
                    </div>
                    <div className="email">
                        <p className="info-title">Эл. почта</p>
                        <Input
                            type="email"
                            name="email"
                            trackId="register_email"
                            placeholder="email@email.ru"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "input--error" : "input-form"}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
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
                    className="signup-btn"
                    eventType="click"
                    eventData={{ track_id: 'signup_click', }}
                    onClick={() => console.log(`Зарегистрировать аккаунт: `)}
                >
                    {loading ? "Регистрация..." : "Зарегистрироваться"}
                </Button>

                <p className="signup-info">Уже есть аккаунт?</p>
            </form>
        </div>
    );
};


export default SignupForm;
