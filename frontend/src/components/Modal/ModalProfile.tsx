import Button from "../UI/Button";

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
                        // src={user.img || "/assets/default-avatar.svg"}
                        alt="Avatar"
                    />
                    <div className="info-initial">
                        {/* <div className="initial-username">{user.username}</div> */}
                        {/* <div className="initial-email">{user.email}</div> */}
                    </div>
                    <div className="logout">
                        <button className="logout-btn" onClick={onLogout}>
                            Выйти
                        </button>
                    </div>
                </div>
                {/* переделать */}
                <button className="close-modal" onClick={onClose}> 
                    Закрыть
                </button>
            </div>
        </div>
    );
};


export default ModalProfile;
