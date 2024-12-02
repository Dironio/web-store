import { useState } from "react";
import { User } from "../../App";
import EditProfileForm from "../../components/ProfileForm/EditProfileForm";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
// import ProfileForm from "../../components/ProfileForm/ProfileForm";
import BirthdayComponent from "../../components/UI/BirthdayComponent";
import GenderChoice from "../../components/UI/GenderChoice";
import '../ProfilePage/ProfilePage.css'

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
        // <div className="wrapper">
        //     <form>
        //         <ProfileForm
        //             user={formData}
        //             isEditing={isEditing}
        //             onChange={handleInputChange}
        //             handleEditToggle={handleEditToggle}
        //         />
        //         <div>
        //             {!isEditing ? (
        //                 <button onClick={handleEditToggle}>Редактировать</button>
        //             ) : (
        //                 <>
        //                     <button onClick={handleSave}>Сохранить</button>
        //                     <button onClick={handleCancel}>Отменить</button>
        //                 </>
        //             )}
        //         </div>
        //     </form>
        // </div>




        <div className="wrapper">
            <section className="page-profile">

                <div className="profile-person__info">




                    <div className="profile-person__info-img">

                        <div className="info-user">
                            {isEditing ? (
                                <>
                                    <div className="profile-person__info-img">
                                        <img className="info-person-img" src={user?.img || "/assets/login.svg"} alt="profile-img" />
                                    </div>
                                    <p>Сменить фото</p>
                                    <input
                                        type="text"
                                        placeholder="Введите URL изображения"
                                        value={formData?.img}
                                        onChange={(e) => handleInputChange('img', e.target.value)}
                                    />
                                </>
                            ) : (
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
                            )}
                        </div>
                    </div>










                    <div className="update-user">
                        {isEditing ? (
                            <>
                                <button className="update-user-btn" onClick={handleCancel}>
                                    Отменить
                                </button>
                                <button className="update-user-btn" onClick={handleSave}>
                                    Сохранить изменения
                                </button>
                            </>
                        ) : (
                            <button className="update-user-btn" onClick={handleEditToggle}>
                                Редактировать профиль
                            </button>
                        )}
                    </div>
                </div>


                <hr className="separation-line" />


                <section className="gen-info__initial">


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
                                // value={formData?.birthday}
                                onChange={(e) => handleInputChange('birthday', e.target.value)}
                            />
                        ) : (
                            <p>
                                {/* {user?.birthday ||  */}
                                'Не задано'
                                {/* } */}
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



                </section>
            </section>
        </div>

    )
}


export default ProfilePage;