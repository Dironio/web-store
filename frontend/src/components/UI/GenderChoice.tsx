import { useState } from "react";
import Button from "./Button"


const GenderChoice: React.FC<{ onGenderChange?: (gender: "Мужской" | "Женский") => void }> = ({ onGenderChange }) => {
    const [isMale, setIsMale] = useState<boolean>(true);

    const handleGenderChange = (gender: "Мужской" | "Женский") => {
        setIsMale(gender === "Мужской");
        if (onGenderChange) {
            onGenderChange(gender);
        }
    };

    return (
        <div className="sex">
            <p className="gender">Пол</p>
            <div className={`gender-choice ${isMale ? "" : "is-female"}`}>
                <Button
                    type="button"
                    className={`gender-option ${isMale ? "selected" : ""}`}
                    onClick={() => handleGenderChange("Мужской")}
                    eventType="gender_select"
                    eventData={{ gender: "Мужской" }}
                >
                    Мужской
                </Button>
                <Button

                    type="button"
                    className={`gender-option ${!isMale ? "selected" : ""}`}
                    onClick={() => handleGenderChange("Женский")}
                    eventType="gender_select"
                    eventData={{ gender: "Женский" }}
                >
                    Женский
                </Button>
            </div>
        </div>
    )
}

export default GenderChoice;