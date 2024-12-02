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
                                        // onChange={(value) => setFormData((prev) => ({ ...prev, birthday: value }))}
                                        />
                                    </div>
                                </div >
                                <div className="profile__gender-choice">
                                    <p className="gender-title">Пол</p>
                                    <GenderChoice />
                                </div>
                            </>
                        ) : (
                            <>
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
                                </div >
                                <div className="profile__gender-choice">
                                    <p className="gender-title">Пол</p>
                                    <GenderChoice />
                                </div>
                            </>
                        )}
                    </>





                </section >







                {/* <section class="gen-info">
                    <div class="gen-info__info">
                        <div class="gen-info__general">
                            <img src="gen-info-img.svg" alt="User prof" class="">
                            <p>Общая информация</p>
                        </div>
                    </div>

                    <div class="gen-info__initial">
                        <div class="initial__first-name">
                            <p class="name__initial">Фамилия</p>
                            <p class="first-name-input">Иванов</p>
                            <!-- <input type="text"> -->
                        </div>
                        <div class="initial__last-name">
                            <p class="name__initial">Имя</p>
                            <p class="first-name-input">Иванов</p>
                            <!-- <input type="text"> -->
                        </div>
                        <div class="initial__birthday">
                            <p class="name__initial">Дата рождения</p>
                            <p class="first-name-input">Иванов</p>
                            <!-- <input type="date"> -->
                        </div>
                    </div>

                    <div class="sex">
                        <p class="pol">Пол</p>
                        <div class="pol-choice">
                            <p>Мужской</p>
                            <p>Женский</p>
                        </div>
                    </div>
                </section> */}





                {/* <section className="gen-info__initial">


                    <div className="initial__first-name">
                        <p className="personal-data">Фамилия</p>
                        {isEditing ? (
                            <input
                                className="first-name-input"
                                placeholder={formData?.lastName || 'Введите фамилию'}
                                value={formData?.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                            />
                        ) : (
                            <p className="first-name-input">{formData?.lastName || 'Не задано'}</p>
                        )}
                    </div>



                    <div className="initial__last-name">
                        <p className="personal-data">Имя</p>
                        {isEditing ? (
                            <input
                                className="first-name-input"
                                placeholder={formData?.firstName || 'Введите имя'}
                                value={formData?.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                            />
                        ) : (
                            <p className="first-name-input">{formData?.firstName || 'Не задано'}</p>
                        )}
                    </div>




                    <div className="initial__birthday">
                        <p className="personal-data">Дата рождения</p>
                        {isEditing ? (
                            <input
                                type="date"
                                value={formData?.birthday}
                                onChange={(e) => handleInputChange('birthday', e.target.value)}
                            />
                        ) : (
                            <p>
                                {user?.birthday || 
                                'Не задано'
                                 }
                            </p>
                        )}
                    </div>



                    <div className="profile__gender-choice">
                        <p className="gender-title">Пол</p>
                        {isEditing ? (
                            <select
                                value={formData?.gender}
                                onChange={(e) => handleInputChange('gender', e.target.value)}
                            >
                                <option value="">Пол</option>
                                <option value="Мужской">Мужской</option>
                                <option value="Женский">Женский</option>
                            </select>
                        ) : (
                            <p>{formData?.gender || 'Не задано'}</p>
                        )}
                    </div>



                </section> */}




            </section >
        </div >
    )
}


export default ProfilePage;