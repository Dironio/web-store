import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Input from "../UI/Input";
import Button from "../UI/Button";
import "../AuthForms/LoginForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//ЗАПРОСЫ НА БЭК
interface LoginResponse {
  user: {
    username: string;
    email: string;
    password: string;
  };
  token: string;
}


const LoginForm: React.FC = () => {
  const navigate = useNavigate();


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
      const response = await axios.post<LoginResponse>(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        loginData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );


      // Данные теперь имеют строго типизированный доступ
      const data = response.data;


      Cookies.set("lastIdentifier", loginData.identifier, { expires: 30 });
      console.log("Успешный вход:", data);


      navigate("/profile");
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
    <div>
      <form className="login-form">
        <div className="login-input">
          <div className="login">
            <p className="info-title">Логин или эл. почта</p>
            <Input
              type="text"
              name="identifier"
              trackId="login_identifier"
              placeholder="username"
              value={loginData.identifier}
              onChange={handleChange}
              className={errors.identifier ? "input--error" : "input-form"}
            />
            {errors.identifier && <span className="error">{errors.identifier}</span>}
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
              // value={formData.password}
              onChange={handleChange}
              // className="input-form"
              className={errors.password ? "input--error" : "input-form"}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
        </div>

        <p className="forgot-pass">Забыли пароль?</p>

        <Button
          className="form-btn"

          eventType="click"
          eventData={{ track_id: 'login_click', }}
          onClick={handleSubmit}
        >
          {loading ? "Вход..." : "Войти"}
        </Button>

        <p className="form-info">Уже есть аккаунт?</p>
      </form>
    </div>
  );
};

export default LoginForm;
