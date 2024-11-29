import React from "react";
import "../Modal/CategoryModal.css";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => { //css поправить
    if (!isOpen) return null;

    const categories = ["Электроника", "Одежда", "Дом"]; //добавить, сделать запрос

    const handleCategoryClick = (category: string) => {
        console.log(`категория: ${category}`);
        onClose();
    };

    return (
        <div className="category-modal-backdrop" onClick={onClose}>
            <div
                className="category-modal"
                onClick={(e) => e.stopPropagation()}
            >
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className="category-button"
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryModal;
