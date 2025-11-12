import classNames from "classnames";
import "./Input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  suffix?: string;
}

export function Input({
  label,
  description,
  error,
  suffix,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${label?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={classNames("input-wrapper", className)}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      {description && <span className="input-description">{description}</span>}
      <div className="input-group">
        <input
          id={inputId}
          className={classNames("input-field", {
            "input-error": error,
            "input-with-suffix": suffix,
          })}
          {...props}
        />
        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}
