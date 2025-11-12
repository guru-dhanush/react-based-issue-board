import "./Select.css";

interface SelectProps {
  label?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  disabled = false,
  className = "",
}: SelectProps) {
  return (
    <div className={`custom-select-container ${className}`}>
      {label && (
        <label htmlFor={name} className="custom-select__label">
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        className="custom-select"
        value={value}
        onChange={(e) =>
          onChange(e.target.value ? e.target.value : options[0].value)
        }
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options
          .filter((opt) => opt.value !== "")
          .map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
    </div>
  );
}
