import BirthdayComponent from "../../components/UI/BirthdayComponent";
import '../ProfilePage/ProfilePage.css'


const ProfilePage: React.FC = () => {

    return (
        <div className="wrapper">
            <section className="page-profile">
                <div className="">
                    <div className="profile-person">
                        <div className="profile-person__info">
                            <div className="info-img">
                                <img src="" alt="profile-img" />
                            </div>
                            <div className="info-user">
                                <p className="user-role">Пользователь</p>
                                <p className="user-username">ural</p>
                                <p className="user-email">patriot@maga.sry</p>
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
                            <img src="gen-info-img.svg" alt="User prof" className="" />
                            <p>Общая информация</p>
                        </div>
                    </div>

                    <div className="gen-info__initial">
                        <div className="initial__first-name">
                            <p className="personal-data">Фамилия</p>
                            <p className="first-name-input">Иванов</p>
                            {/* <!-- <input type="text"> --> */}
                        </div>
                        <div className="initial__last-name">
                            <p className="personal-data">Имя</p>
                            <p className="first-name-input">Иванов</p>
                            {/* <!-- <input type="text"> --> */}
                        </div>
                        <div className="initial__birthday">
                            <p className="personal-data">Дата рождения</p>
                            {/* <BirthdayComponent
                            onChange={(value) => setFormData((prev) => ({ ...prev, birthday: value }))}
                        /> */}
                        </div>
                    </div>

                    <div className="sex">
                        <p className="pol">Пол</p>
                        <div className="pol-choice">
                            <p>Мужской</p>
                            <p>Женский</p>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}


export default ProfilePage;