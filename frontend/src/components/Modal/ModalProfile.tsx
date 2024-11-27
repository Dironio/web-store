import Button from "../UI/Button";

interface ModalProfileProps {
    user: { username: string; email: string; img?: string };
    onClose: () => void;
    onLogout: () => void;
}


const ModalProfile: React.FC<ModalProfileProps> = ({ user, onClose, onLogout }) => {
    return (
        <div className="modal-profile">
            <div className="modal-profile__info">
                <img className="info-img" src={user.img || "/assets/default-avatar.svg"} alt="Avatar" />
                <div className="info-initial">
                    <div className="initial-username">{user.username}</div>
                    <div className="initial-email">{user.email}</div>
                </div>
                <div className="logout">
                    <Button
                        className="logout-btn"
                        onClick={onLogout}
                        eventType="logout"
                        eventData={{ user: user.username }}
                    >
                        Выйти
                    </Button>
                </div>
            </div>
            <Button className="close-modal" onClick={onClose} eventType="close_modal">
                Закрыть
            </Button>
        </div>
    );
};


export default ModalProfile;
