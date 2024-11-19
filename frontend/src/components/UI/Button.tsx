import React from 'react';
import sendAnalytics from '../../utils/analytics/analytics';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  eventType: string;
  eventData?: Record<string, any>;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, eventType, eventData, children }) => {
  const handleClick = () => {
    sendAnalytics({
      event_type: eventType,
      event_data: eventData,
      page_url: window.location.href,
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
