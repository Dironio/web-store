import Button from "../UI/Button";
import "../Modal/ModalProfile.css"

interface ModalProfileProps {
    user?: { username: string; email: string; img?: string };
    onClose: () => void;
    onLogout: () => void;
}


const ModalProfile: React.FC<ModalProfileProps> = ({ user, onClose, onLogout }) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-profile">
                <div className="modal-profile__info">
                    <img
                        className="info-img"
                        src={user?.img || "/assets/default-avatar.svg"}
                        alt="Avatar"
                    />
                    <div className="info-initial">
                        <div className="initial-username">{user?.username}</div>
                        <div className="initial-email">{user?.email}</div>
                    </div>
                </div>
                
                <div className="">
                    <div className="logout">
                        <Button
                            className="logout-btn"
                            onClick={onLogout}
                            eventType="logout-modal-btn"
                        >Выйти
                        </Button>
                    </div>

                </div>
                {/* переделать */}
            </div>
            <Button
                className="close-modal"
                onClick={onClose}
                eventType='exit-modal-btn'
            >Закрыть
            </Button>
        </div>
    );
};


export default ModalProfile;
