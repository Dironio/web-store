import { useState } from "react";
import { User } from "../../App";
import EditProfileForm from "../../components/ProfileForm/EditProfileForm";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
// import ProfileForm from "../../components/ProfileForm/ProfileForm";
import BirthdayComponent from "../../components/UI/BirthdayComponent";
import GenderChoice from "../../components/UI/GenderChoice";
import '../ProfilePage/ProfilePage.css'
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

//ОБНОВИТЬ ИВЕНТЫ КНОПОК
//СДЕЛАТЬ ЗАПРОСЫ


interface ProfilePageProps {
    user: User | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<User | null>(user);



    // const handleEditToggle = () => setIsEditing((prev) => !prev);


    // const handleCancel = () => {
    //     setFormData(user);
    //     setIsEditing(false);
    // };


    // const handleSave = async () => {
    //     if (!formData) return;


    //     try {
    //         const response = await fetch('/api/users/', {
    //             method: 'PATCH',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(formData),
    //         });


    //         if (!response.ok) throw new Error('Ошибка обновления данных');


    //         const updatedUser = await response.json();
    //         setFormData(updatedUser);
    //         setIsEditing(false);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };



    // const handleInputChange = (field: string, value: string) => {
    //     setFormData((prev) => ({ ...prev!, [field]: value }));
    // };

    // const [formData, setFormData] = useState<User>({
    //     firstName: "",
    //     lastName: "",
    //     username: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     birthday: user?.birthday,
    //     gender: "Мужской"
    // });
    // handlePasswordToggle

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };


    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev!, [field]: value }));
    };


    const handleCancel = () => {
        setIsEditing(false);
    };


    const handleSave = () => {
        // прописать
        console.log('Обнова:', formData);
        setIsEditing(false);
    };




    return (
        <div className="wrapper">
            <section className="page-profile">
                <div className="">
                    {isEditing ? (
                        <div className="info-user__header">
                            <div className="info-user__photo">
                                <div className="profile-person__info-img">
                                    <img className="info-person-img" src={
                                        formData?.img
                                        || "/assets/login.svg"}
                                        alt="profile-img" />
                                </div>
                                <div className="info-insert">
                                    <p className="info-p">Сменить фото</p>
                                    <Input
                                        trackId="url-photo"
                                        className="info-input-url"
                                        type="text"
                                        placeholder="Введите URL изображения"
                                        value={formData?.img}
                                        onChange={(e) => handleInputChange('img', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="update-user">
                                <Button
                                    eventType=""
                                    className="cancel-update-btn"
                                    onClick={handleCancel}
                                >Отменить
                                </Button>
                                <Button
                                    eventType=""
                                    className="update-user-btn"
                                    onClick={handleSave}
                                >Сохранить изменения
                                </Button>
                            </div>
                        </div>
                    ) : (
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
                                <Button
                                    eventType="aboba"//rework
                                    className="update-user-btn"
                                    onClick={handleEditToggle}
                                >Редактировать профиль</Button>
                            </div>
                        </div>
                    )}
                </div>

                <hr className="separation-line" />

                <section className="gen-info">
                    <div className="gen-info__info">
                        <div className="gen-info__general">
                            <img src="/assets/gen-info-img.svg" alt="User prof" className="" />
                            <p>Общая информация</p>
                        </div>
                    </div>
                    <>
                        {isEditing ? (
                            <>
                                <div className="gen-info__initial">
                                    <div className="initial__first-name">
                                        <p className="personal-data">Фамилия</p>
                                        <Input
                                            trackId=""
                                            className="profile-input"
                                            type="text"
                                            placeholder="Фамилия"
                                        />
                                    </div>
                                    <div className="initial__last-name">
                                        <p className="personal-data">Имя</p>
                                        <Input
                                            trackId=""
                                            className="profile-input"
                                            type="text"
                                            placeholder="Имя"
                                        />
                                    </div>
                                    <div className="initial__birthday">
                                        <p className="personal-data">Дата рождения</p>
                                        <BirthdayComponent
                                            value={user?.birthday
                                                ? new Date(user?.birthday).toISOString().split('T')[0]
                                                : ''
                                            }
                                        // onChange={(value) => setFormData((prev) => ({ ...prev, birthday: value }))}
                                        />
                                    </div>
                                </div >
                                <div className="profile__gender-choice">
                                    <p className="gender-title">Пол</p>
                                    <GenderChoice
                                        value={user?.gender === "Мужской" || user?.gender === "Женский" ? user.gender : undefined}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="gen-info__initial">
                                    <div className="initial__first-name">
                                        <p className="personal-data">Фамилия</p>
                                        <p className="first-name-input">{user?.last_name || 'Не задано'}</p>
                                    </div>
                                    <div className="initial__last-name">
                                        <p className="personal-data">Имя</p>
                                        <p className="first-name-input">{user?.first_name || 'Не задано'}</p>
                                    </div>
                                    <div className="initial__birthday">
                                        <p className="personal-data">Дата рождения</p>
                                        <p className="first-name-input">{user?.birthday
                                            ? new Date(user?.birthday).toISOString().split('T')[0]
                                            : 'Не задано'
                                        }</p>
                                    </div>
                                </div >
                                <div className="profile__gender-choice">
                                    <p className="gender-title">Пол</p>
                                    <div className={`gender-display ${user?.gender === 'Женский' ? 'gender-display--female' : ''}`}>
                                        <div className={`gender-display__option ${user?.gender === 'Мужской' ? 'gender-display__option--selected' : ''}`}>
                                            Мужской
                                        </div>
                                        <div className={`gender-display__option ${user?.gender === 'Женский' ? 'gender-display__option--selected' : ''}`}>
                                            Женский
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                </section >

                <section className="account-info">
                <div className="account-info__info">
                    <div className="account-info__general">
                        <img src="/assets/account-info.svg" alt="User prof" className="" />
                        <p>Информация аккаунта</p>
                    </div>
                </div>

                <div className="general-personal">
                    <div className="initial__first-name">
                        <p className="personal-data">Логин</p>
                        <p className="first-name-input">{user?.username}</p>
                        {/* <!-- <input type="text"> --> */}
                    </div>
                    <div className="initial__last-name">
                        <p className="personal-data">Эл. почта</p>
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





            </section >
        </div >
    )
}


export default ProfilePage;