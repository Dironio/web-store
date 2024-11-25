import sendAnalytics from "../../utils/analytics/analytics";


interface InputProps {
  type: 'text' | 'password' | 'email' | 'date';
  name?: string;
  className?: string;
  placeholder?: string;
  trackId: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const handleFocus = () => {
    sendAnalytics({
      event_type: "input_focus",
      event_data: { track_id: props.trackId },
      page_url: window.location.href,
    });
  };


  return (
    <input
      type={props.type}
      className={props.className}
      placeholder={props.placeholder}
      onFocus={handleFocus}
      onChange={props.onChange}
      value={props.value}
      name={props.name}
      required={props.required}
      minLength={props.minLength}
    />
  );
};


export default Input;