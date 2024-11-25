import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Input from "../UI/Input";
import Button from "../UI/Button";
import "../AuthForms/LoginForm.css";

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedIdentifier = Cookies.get("lastIdentifier");
    if (savedIdentifier) {
      setLoginData((prev) => ({ ...prev, identifier: savedIdentifier }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {
      identifier: "",
      password: "",
    };

    if (!loginData.identifier) {
      newErrors.identifier = "Введите логин или email";
    }

    if (!loginData.password) {
      newErrors.password = "Введите пароль";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrors((prev) => ({
          ...prev,
          identifier: errorData.message || "Ошибка входа",
        }));
        setLoading(false);
        return;
      }

      const data = await res.json();
      Cookies.set("lastIdentifier", loginData.identifier, { expires: 30 });
      console.log("Успешный вход:", data);
    } catch (err) {
      console.error("Ошибка сети:", err);
      setErrors((prev) => ({
        ...prev,
        identifier: "Ошибка сети. Попробуйте позже.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Войти</h2>
      <form>
        <Input
          type="text"
          name="identifier"
          trackId="login_identifier"
          placeholder="Логин или email"
          value={loginData.identifier}
          onChange={handleChange}
          className={errors.identifier ? "input--error" : ""}
        />
        {errors.identifier && <span className="error">{errors.identifier}</span>}

        <Input
          type="password"
          name="password"
          trackId="login_password"
          placeholder="Пароль"
          value={loginData.password}
          onChange={handleChange}
          className={errors.password ? "input--error" : ""}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <Button
          onClick={handleSubmit}
          className="login-button"
          eventType="login_attempt"
        >
          {loading ? "Вход..." : "Войти"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
