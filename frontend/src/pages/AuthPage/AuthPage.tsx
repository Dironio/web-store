import { useContext, useState } from "react";
import LoginForm from "../../components/AuthForms/LoginFrom";
import SignupForm from "../../components/AuthForms/SignupForm";
import "../AuthPage/AuthPage.css";
import Button from "../../components/UI/Button";

const AuthPage: React.FC = () => {
    const [isLoginForm, setIsLoginForm] = useState(false);


    return (
        <section className="auth-page">
            <div className="wrapper">
                <div className="auth__container">
                    <div className="container-left">
                        <img src="/assets/auth-container-img.svg" alt="AuthImage" />
                    </div>
                    <div className="container-right">

                        <h1>{isLoginForm ? <h2 className="container-title">Вход в аккаунт</h2>
                            :
                            <h2 className="container-title">Регистрация аккаунта</h2>}</h1>
                        {isLoginForm ? (
                            <LoginForm />
                        ) : (
                            <SignupForm />
                        )}



                        <div className="switch-btn">
                            {isLoginForm ?
                                <Button
                                    className="signup-btn"
                                    eventType="click"
                                    eventData={{ track_id: 'login-form_click', }}
                                    onClick={() => setIsLoginForm((prev) => !prev)}

                                >
                                    Зарегистрироваться
                                </Button>
                                :
                                <Button
                                    className="login-form-btn"
                                    eventType="click"
                                    eventData={{ track_id: 'login-form_click', }}
                                    onClick={() => console.log(`Зарегистрировать аккаунт: `)}
                                >
                                    Войти
                                </Button>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};



export default AuthPage;
