import { useEffect, useState } from "react";
import Button from "./Button"

interface GenderChoiceProps {
    value?: "Мужской" | "Женский";
    onGenderChange?: (gender: "Мужской" | "Женский") => void;
}

const GenderChoice: React.FC<GenderChoiceProps> = ({ value, onGenderChange }) => {
    const [isMale, setIsMale] = useState<boolean>(value === "Мужской");

    useEffect(() => {
        if (value === "Мужской" || value === "Женский") {
            setIsMale(value === "Мужской");
        }
    }, [value]);

    const handleGenderChange = (gender: "Мужской" | "Женский") => {
        setIsMale(gender === "Мужской");
        if (onGenderChange) {
            onGenderChange(gender);
        }
    };

    return (
        <>
            {/* <p className="gender">Пол</p> */}
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
        </>
    )
}

export default GenderChoice;