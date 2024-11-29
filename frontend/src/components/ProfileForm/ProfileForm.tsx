import React from "react"
import BirthdayComponent from "../UI/BirthdayComponent"
import GenderChoice from "../UI/GenderChoice"
import { User } from "../../App";

interface ProfileFormProps {
    user: User | null;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
    return (

        <section className="page-profile">
            <div className="">
                <div className="profile-person">
                    <div className="profile-person__info">
                        <div className="info-img">
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
                        <p className="first-name-input">{user?.lastName || 'Не задано'}</p>
                        {/* <!-- <input type="text"> --> */}
                    </div>
                    <div className="initial__last-name">
                        <p className="personal-data">Имя</p>
                        <p className="first-name-input">{user?.firstName || 'Не задано'}</p>
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
                <div className="gen-info__info">
                    <div className="gen-info__general">
                        <img src="/assets/gen-info-img.svg" alt="User prof" className="" />
                        <p>Общая информация</p>
                    </div>
                </div>


                <div className="initial__first-name">
                    <p className="personal-data">Фамилия</p>
                    <p className="first-name-input">{user?.username}</p>
                    {/* <!-- <input type="text"> --> */}
                </div>
                <div className="initial__last-name">
                    <p className="personal-data">Имя</p>
                    <p className="first-name-input">{user?.firstName}</p>
                    {/* <!-- <input type="text"> --> */}
                </div>
            </section>


        </section>

    )
}

export default ProfileForm;