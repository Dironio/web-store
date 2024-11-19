import React, { useState } from 'react';
import sendAnalytics from '../../utils/analytics/analytics';

interface InputProps {
  className?: string;
  placeholder?: string;
  trackId: string;
}

const Input: React.FC<InputProps> = ({ className, placeholder, trackId }) => {
  const [value, setValue] = useState('');

  const handleFocus = () => {
    sendAnalytics({
      event_type: 'input_focus',
      event_data: { track_id: trackId },
      page_url: window.location.href,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    sendAnalytics({
      event_type: 'input_change',
      event_data: { track_id: trackId, input_value: e.target.value },
      page_url: window.location.href,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendAnalytics({
        event_type: 'input_submit',
        event_data: { track_id: trackId, input_value: value },
        page_url: window.location.href,
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
      value={value}
    />
  );
};

export default Input;
export {};
