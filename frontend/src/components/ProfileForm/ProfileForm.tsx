import React from "react"
import BirthdayComponent from "../UI/BirthdayComponent"
import GenderChoice from "../UI/GenderChoice"
import "../ProfileForm/ProfileForm.css"
import { User } from "../../App";
import Button from "../UI/Button";

interface ProfileFormProps {
    user: User | null;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
    return (

        <section className="page-profile">
            <div className="">
                <div className="profile-person">
                    <div className="profile-person__info">
                        <div className="profile-person__info-img">
                            <img className="info-person-img" src={user?.img || "/assets/login.svg"} alt="profile-img" />
                        </div>
                        <div className="info-user">
                            <p className="user-role">{user?.role}</p>
                            <p className="user-username">{user?.username}</p>
                            <p className="user-email">{user?.email}</p>
                        </div>
                    </div>
                    <div className="update-user">
                        <button className="update-user-btn">Редактировать профиль</button>
                    </div>
                </div>
            </div>

            <hr className="separation-line" />

            <section className="gen-info">
                <div className="gen-info__info">
                    <div className="gen-info__general">
                        <img src="/assets/gen-info-img.svg" alt="User prof" className="" />
                        <p>Общая информация</p>
                    </div>
                </div>

                <div className="gen-info__initial">
                    <div className="initial__first-name">
                        <p className="personal-data">Фамилия</p>
                        <p className="first-name-input">{user?.last_name || 'Не задано'}</p>
                        {/* <!-- <input type="text"> --> */}
                    </div>
                    <div className="initial__last-name">
                        <p className="personal-data">Имя</p>
                        <p className="first-name-input">{user?.first_name || 'Не задано'}</p>
                        {/* <!-- <input type="text"> --> */}
                    </div>
                    <div className="initial__birthday">
                        <p className="personal-data">Дата рождения</p>
                        <BirthdayComponent
                        // onChange={(value) => setFormData((prev) => ({ ...prev, birthday: value }))}
                        />
                    </div>
                </div>
                <div className="profile__gender-choice">
                    <p className="gender-title">Пол</p>
                    <GenderChoice />
                </div>
            </section>

            <section className="account-info">
                <div className="account-info__info">
                    <div className="account-info__general">
                        <img src="/assets/account-info.svg" alt="User prof" className="" />
                        <p>Информация аккаунта</p>
                    </div>
                </div>

                <div className="general-personal">
                    <div className="initial__first-name">
                        <p className="personal-data">Фамилия</p>
                        <p className="first-name-input">{user?.username}</p>
                        {/* <!-- <input type="text"> --> */}
                    </div>
                    <div className="initial__last-name">
                        <p className="personal-data">Имя</p>
                        <p className="first-name-input">{user?.email}</p>
                        {/* <!-- <input type="text"> --> */}
                    </div>
                    <div className="initial__first-name">
                        <p className="personal-data">Пароль</p>
                        <div className="password-btn">
                            <Button
                                eventType="change-password-profile-btn"
                                className="change-password-btn">
                                Сменить пароль
                            </Button>
                            <img src="/assets/strelka2.svg" alt="" className="change-password" />
                        </div>
                    </div>
                </div>

                <div className="password-list">
                    <div className="initial__first-name">
                        <p className="personal-data">Старый пароль</p>
                        <p className="first-name-input">***</p>
                        {/* <!-- <input type="text"> --> */}
                    </div>
                    <div className="initial__last-name">
                        <p className="personal-data">Новый пароль</p>
                        <p className="first-name-input">***</p>
                        {/* <!-- <input type="text"> --> */}
                    </div>
                    <div className="initial__first-name">
                        <p className="personal-data">Подтвердите новый пароль</p>
                        <p className="first-name-input">***</p>
                        {/* <!-- <input type="text"> --> */}
                    </div>
                </div>


            </section>

            <section className="delivery-address">
                <div className="delivery-address__info">
                    <div className="delivery-address__general">
                        <img src="/assets/account-info.svg" alt="User prof" className="" />
                        <p>Адрес доставки</p>
                    </div>
                </div>

                <div className="general-delivery">
                    <p className="address-personal">Доставка</p>
                    <div className="general-delivery__address">
                        <p className="first-name-input">{user?.address || 'Не задано'}</p>
                        <Button
                            eventType="delivery-address-btn"
                            className="address-change-btn">
                            Сменить адрес доставки <img src="/assets/strelka2.svg" alt="" />
                        </Button>
                    </div>
                </div>

            </section>


            <section className="payment-method">
                <div className="payment-method__info">
                    <div className="payment-method__general">
                        <img src="/assets/gen-info-img.svg" alt="User prof" className="" />
                        <p>Способы оплаты</p>
                    </div>
                </div>

                <div className="payment-method__title">
                    <div className="title__first">
                        <p className="first-data">Основной способ оплаты</p>
                        <p className="first-input">{user?.last_name || 'Не задано'}</p>
                        {/* <!-- <input type="text"> --> */}
                    </div>
                    <div className="title__second">
                        <p className="second-data">Дополнительный способ оплаты</p>
                        <p className="second-input">{user?.first_name || 'Не задано'}</p>
                        {/* <!-- <input type="text"> --> */}
                    </div>
                    <div className="title__btn">
                        <Button
                            className="payment-btn"
                            eventType="payment-method-btn">Изменить способ оплаты</Button>
                    </div>
                </div>
            </section>

        </section>

    )
}

export default ProfileForm;