import React from 'react';


interface InputProps {
    className?: string;
    placeholder?: string;
    trackId?: string;
    onChange?: (value: string) => void;
}


const Input: React.FC<InputProps> = ({ className, placeholder, trackId, onChange }) => {
    const handleFocus = () => {
        fetch(`${process.env.REACT_APP_API_URL}/metrics`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event: 'input_focus',
                trackId,
                timestamp: Date.now(),
            }),
        });
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e.target.value);
    };


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetch(`${process.env.REACT_APP_API_URL}/metrics`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event: 'input_submit',
                    trackId,
                    timestamp: Date.now(),
                    value: e.currentTarget.value,
                }),
            });
        }
    };


    return (
        <input
            type="text"
            className={className}
            placeholder={placeholder}
            onFocus={handleFocus}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
        />
    );
};


export default Input;
