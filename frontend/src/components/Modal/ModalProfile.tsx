import Button from "../UI/Button";
import "../Modal/ModalProfile.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogout } from "../../hooks/useLogout";

interface ModalProfileProps {
    user: { username: string; email: string; img?: string };
    onLogout: () => void;
    onClose: () => void;
}

const ModalProfile: React.FC<ModalProfileProps> = ({ user, onLogout, onClose }) => {
    const navigate = useNavigate();
    return (
        <div className="modal-profile">
            <section className="modal-profile__user">
                <div className="modal-profile__info">
                    <img
                        className="info-img"
                        src={user?.img || "/assets/login.svg"}
                        alt="Avatar"
                    />
                    <div className="info-initial">
                        <div className="initial-username">{user?.username}</div>
                        <div className="initial-email">{user?.email}</div>
                    </div>
                    <div className="info-logout">
                        <Button
                            className="logout-btn"
                            onClick={onLogout}
                            eventType="logout-modal-btn"
                        >
                            Выйти
                        </Button>
                    </div>
                </div>

                <div className="modal-profile__actions">
                    <Button
                        className="profile-button"
                        eventType="profile-modal-btn"
                        onClick={() => {
                            navigate('/profile');
                            navigate(0);
                        }}
                    >
                        Личный кабинет
                    </Button>

                </div>
            </section>
        </div>
    );
};

export default ModalProfile;
