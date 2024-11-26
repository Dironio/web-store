// import { useState } from "react";


// const UserMenu = ({ isLoggedIn, onLogout }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // Функция для переключения модального окна
//     const toggleModal = () => setIsModalOpen((prev) => !prev);

//     return (
//         <div className="user-menu">
//             {isLoggedIn ? (
//                 <>
//                     <img
//                         src="/assets/avatar.svg"
//                         alt="Аватар пользователя"
//                         className="user-menu__avatar"
//                         onClick={toggleModal}
//                         style={{
//                             cursor: "pointer",
//                         }}
//                     />

//                     {isModalOpen && (
//                         <div className="user-menu__modal">
//                             <ul>
//                                 <li>
//                                     <button onClick={() => alert("Перейти в настройки")}>
//                                         Настройки профиля
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button onClick={onLogout}>Выйти</button>
//                                 </li>
//                             </ul>
//                         </div>
//                     )}
//                 </>
//             ) : (
//                 <>

//                     <a href="/auth">
//                         <img
//                             src="/assets/auth.svg"
//                             alt="Войти"
//                             className="user-menu__icon"
//                         />
//                     </a>
//                 </>
//             )}
//         </div>
//     );
// };

// export default UserMenu;