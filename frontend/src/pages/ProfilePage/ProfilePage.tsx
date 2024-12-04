import { useState } from "react";
import { User } from "../../App";
import BirthdayComponent from "../../components/UI/BirthdayComponent";
import GenderChoice from "../../components/UI/GenderChoice";
import '../ProfilePage/ProfilePage.css'
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

//ОБНОВИТЬ ИВЕНТЫ КНОПОК
//СДЕЛАТЬ ЗАПРОСЫ
//ОБНОВИТЬ АНИМАЦИЮ


interface ProfilePageProps {
    user: User | null;
    onPasswordChange?: (newPassword: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onPasswordChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isAddress, setIsAddress] = useState(false);
    const [isPasswordListVisible, setIsPasswordListVisible] = useState(false);

    const handleEditClick = () => {
        setIsAddress(true);
    };

    const togglePasswordListVisibility = () => {
        setIsPasswordListVisible(!isPasswordListVisible);
    };

    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
        firstName: user?.first_name || '',
        lastName: user?.last_name || '',
        img: user?.img || '',
        address: user?.address || '',
    });

    const [errors, setErrors] = useState({
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        newPassword: '',
        confirmPassword: '',
    });




    const validateForm = () => {
        const newErrors = { ...errors };

        if (formData?.password !== user?.password) {
            newErrors.password = 'Старый пароль введён неверно';
        }

        if (!formData?.newPassword || formData?.newPassword.length < 6) {
            newErrors.password = 'Новый пароль должен быть не менее 6 символов';
        }

        if (formData?.newPassword !== formData?.confirmPassword) {
            newErrors.password = 'Пароли не совпадают';
        }

        if (!formData?.lastName || formData?.lastName.trim().length === 0) {
            newErrors.lastName = 'Введите фамилию';
        }

        if (!formData?.firstName || formData?.firstName.trim().length === 0) {
            newErrors.firstName = 'Введите имя';
        }

        if (!formData?.address || formData?.address.trim().length === 0) {
            newErrors.address = 'Введите адрес';
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };




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
        if (validateForm()) {
            console.log('Обнова:', formData);
            setIsEditing(false);
        } else {
            console.log('Ошибка валидации', errors);
        }
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
                                            placeholder={user?.last_name || 'Не задано'}
                                        />
                                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                                    </div>
                                    <div className="initial__last-name">
                                        <p className="personal-data">Имя</p>
                                        <Input
                                            trackId=""
                                            className="profile-input"
                                            type="text"
                                            placeholder={user?.first_name || 'Не задано'}
                                        />
                                        {errors.firstName && <span className="error">{errors.firstName}</span>}
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
                    <>
                        {isEditing ? (
                            <>
                                <div className="general-personal">
                                    <div className="initial__personal">
                                        <p className="personal-idnf">Логин</p>
                                        <p className="first-name-input">{user?.username}</p>
                                        {/* <Input
                                            type="text"
                                            name="username"
                                            trackId="username-signup"
                                            placeholder="username"
                                        // value={formData.username}
                                        // onChange={handleChange}
                                        // className={errors.username ? "input--error" : "input-form"}
                                        />
                                        {/* <span className="error">{errors.username}</span> */}
                                    </div>
                                    <div className="initial__personal">
                                        <p className="personal-idnf">Эл. почта</p>
                                        <p className="first-name-input">{user?.email}</p>
                                        {/* <Input
                                            type="email"
                                            name="email"
                                            trackId="email-signup"
                                            placeholder="email@email.ru"
                                        // value={formData.email}
                                        // onChange={handleChange}
                                        // className={errors.email ? "input--error" : "input-form"}
                                        />
                                        {/* <span className="error">{errors.email}</span> */}
                                    </div>
                                    <div className="initial__personal">
                                        <p className="personal-idnf">Пароль</p>
                                        <div className="password-btn">
                                            <Button
                                                eventType="change-password-profile-btn"
                                                className="change-password-btn"
                                                onClick={togglePasswordListVisibility}
                                            >
                                                <p>Сменить пароль</p>
                                                <img
                                                    src="/assets/strelka2.svg" alt=""
                                                    className={`change-password ${isPasswordListVisible ? "rotated" : ""}`} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`password-list ${isPasswordListVisible ? "visible" : ""}`}
                                //ПЕРЕДЕЛАТЬ АНИМАЦИЮ
                                >

                                    <div className="initial__first-name">
                                        <p className="personal-data">Старый пароль</p>

                                        <Input
                                            trackId=""
                                            className="profile-input"
                                            type="password"
                                            placeholder={'Введите старый пароль'}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                        />
                                        {errors.password && <span className="error">{errors.password}</span>}
                                    </div>
                                    <div className="initial__last-name">
                                        <p className="personal-data">Новый пароль</p>
                                        <Input
                                            trackId=""
                                            className="profile-input"
                                            type="password"
                                            placeholder={'Введите новый пароль'}
                                            onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                        />
                                        {errors.newPassword && <span className="error">{errors.newPassword}</span>}
                                    </div>
                                    <div className="initial__first-name">
                                        <p className="personal-data">Подтвердите новый пароль</p>
                                        <Input
                                            trackId=""
                                            className="profile-input"
                                            type="password"
                                            placeholder={'Повторите новый пароль'}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        />
                                        {errors.confirmPassword && (
                                            <span className="error">{errors.confirmPassword}</span>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="general-personal">
                                <div className="initial__first-name">
                                    <p className="personal-idnf">Логин</p>
                                    <p className="first-name-input">{user?.username}</p>
                                </div>
                                <div className="initial__last-name">
                                    <p className="personal-idnf">Эл. почта</p>
                                    <p className="first-name-input">{user?.email}</p>
                                </div>
                                <div className="initial__first-name">
                                    <p className="personal-idnf">Пароль</p>
                                    <div className="password-btn">
                                        <p className="change-pass-fake-btn">Сменить пароль <img src="/assets/strelka2.svg" alt="" className="change-password" /></p>

                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                </section>

                <section className="delivery-address">
                    <div className="delivery-address__info">
                        <div className="delivery-address__general">
                            <img src="/assets/delivery-address.svg" alt="User prof" className="delivery-address-img" />
                            <p>Адрес доставки</p>
                        </div>
                    </div>
                    {isEditing ? (
                        <>
                            <p className="address-personal">Доставка</p>
                            <div className="general-delivery__address">

                                {isAddress ? (
                                    <div className="general-delivery__address">
                                        <Input
                                            type="text"
                                            trackId=""
                                            value={formData.address}
                                            // onChange={handleInputChange}
                                            className="address-input-edit"
                                            placeholder={user?.address || ''}
                                        />
                                    </div>
                                ) : (
                                    <p className="address-input">{user?.address || "Не задано"}</p>
                                )}
                                <Button
                                    eventType="delivery-address-btn"
                                    className="address-change-btn"
                                    onClick={handleEditClick}
                                >
                                    <p>Сменить адрес доставки</p>
                                    <img src="/assets/strelka2.svg" alt="" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="general-delivery">
                                <p className="address-personal">Доставка</p>
                                <div className="general-delivery__address">
                                    <p className="address-input">{user?.address || 'Не задано'}</p>
                                    <p className="change-address-fake-btn">Сменить адрес доставки<img src="/assets/strelka2.svg" alt="" className="change-password" /></p>
                                </div>
                            </div>
                        </>
                    )}
                </section>

                <section className="payment-method">
                    <div className="payment-method__info">
                        <div className="payment-method__general">
                            <img src="/assets/payment.svg" alt="User prof" className="payment-img" />
                            <p>Способы оплаты</p>
                        </div>
                    </div>
                    {/* {isEditing ? (
                        <>
                            <div className="payment-method__title">
                                <div className="title__first">
                                    <p className="first-payment">Основной способ оплаты</p>
                                    <p className="first-input">{'Не задано'}</p>
                                </div>
                                <div className="title__second">
                                    <p className="second-payment">Дополнительный способ оплаты</p>
                                    <p className="second-input">{'Не задано'}</p>
                                </div>
                                <div className="title__btn">
                                    <p className="change-payment-fake-btn">Изменить способ оплаты<img src="/assets/strelka2.svg" alt="" className="change-password" /></p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <> */}
                    <div className="payment-method__title">
                        <div className="title__first">
                            <p className="first-payment">Основной способ оплаты</p>
                            <p className="first-input">{'Не задано'}</p>
                        </div>
                        <div className="title__second">
                            <p className="second-payment">Дополнительный способ оплаты</p>
                            <p className="second-input">{'Не задано'}</p>
                        </div>
                        <div className="title__btn">
                            <p className="change-payment-fake-btn">Изменить способ оплаты<img src="/assets/strelka2.svg" alt="" className="change-password" /></p>
                        </div>
                    </div>
                    {/* </> */}
                    {/* )} */}
                </section>
            </section >
        </div >
    )
}


export default ProfilePage;