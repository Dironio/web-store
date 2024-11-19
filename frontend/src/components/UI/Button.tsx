import React from 'react';


interface ButtonProps {
    onClick?: () => void;
    className?: string;
    trackId?: string; //подумать как сделать
    children: React.ReactNode;
}


const Button: React.FC<ButtonProps> = ({ onClick, className, trackId, children }) => {
    const handleClick = () => {
        fetch(`${process.env.REACT_APP_API_URL}/analytics`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event: 'button_click',
                trackId, //
                timestamp: Date.now(),
            }),
        });


        if (onClick) onClick();
    };


    return (
        <button className={className} onClick={handleClick}>
            {children}
        </button>
    );
};


export default Button;
