import React from 'react';
import sendAnalytics from '../../utils/analytics/analytics';

interface ButtonProps {
  onClick?: () => void;
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
  const handleClick = () => {
    sendAnalytics({
      event_type: eventType,
      event_data: eventData,
      page_url: window.location.href,
    });

    if (onClick) onClick();
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
