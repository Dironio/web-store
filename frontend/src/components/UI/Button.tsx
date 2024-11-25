import React from 'react';
import sendAnalytics from '../../utils/analytics/analytics';

interface ButtonProps {
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  eventType: string;
  eventData?: Record<string, any>;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  type = 'button',
  disabled = false,
  eventType,
  eventData,
  children,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    sendAnalytics({
      event_type: eventType,
      event_data: eventData,
      page_url: window.location.href,
    });

    if (onClick) onClick(event);
  };

  return (
    <button
      type={type}
      className={className}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};


export default Button;
