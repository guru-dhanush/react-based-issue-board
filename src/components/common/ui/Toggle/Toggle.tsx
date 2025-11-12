import classNames from "classnames";
import "./Toggle.css";

interface ToggleProps {
  label?: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export function Toggle({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  id,
}: ToggleProps) {
  const toggleId = id || `toggle-${label?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="toggle-wrapper">
      {(label || description) && (
        <div className="toggle-info">
          {label && (
            <label htmlFor={toggleId} className="toggle-label">
              {label}
            </label>
          )}
          {description && <span className="toggle-description">{description}</span>}
        </div>
      )}
      <label className={classNames("toggle-switch", { "toggle-disabled": disabled })}>
        <input
          type="checkbox"
          id={toggleId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <span className="toggle-slider"></span>
      </label>
    </div>
  );
}
