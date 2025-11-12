import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { Button } from "../Button";
import "./Dropdown.css";

interface DropdownContextType<T = unknown> {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  selectedValue: T | null;
  selectValue: (value: T, label?: string) => void;
  clearSelection: () => void;
  selectedLabel?: string;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a Dropdown");
  }
  return context;
};

interface DropdownProps<T = unknown> {
  children: React.ReactNode;
  value?: T;
  onChange?: (value: T) => void;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> & {
  Trigger: typeof Trigger;
  Content: typeof Content;
  Item: typeof Item;
  Footer: typeof Footer;
} = ({ children, value, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<unknown>(value);
  const [selectedLabel, setSelectedLabel] = useState<string>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const selectValue = (value: unknown, label?: string) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    onChange?.(value);
    close();
  };

  const clearSelection = () => {
    setSelectedValue(undefined);
    setSelectedLabel(undefined);
    onChange?.(undefined);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        toggle,
        close,
        selectedValue,
        selectValue,
        clearSelection,
        selectedLabel,
      }}
    >
      <div className={`dropdown ${className}`} ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface TriggerProps {
  children: React.ReactNode;
  className?: string;
  placeholder?: string;
}

const Trigger: React.FC<TriggerProps> = ({
  children,
  className = "",
  placeholder = "Select an option",
}) => {
  const { isOpen, toggle, selectedLabel } = useDropdown();

  return (
    <div className={`dropdown-trigger ${className}`}>
      <Button
        type="button"
        variant="secondary"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="dropdown-trigger-content">
          {children || placeholder || selectedLabel}
        </span>
      </Button>
    </div>
  );
};

interface ContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
  width?: "auto" | "full" | "match-trigger";
}

const Content: React.FC<ContentProps> = ({
  children,
  className = "",
  align = "left",
  width = "match-trigger",
}) => {
  const { isOpen } = useDropdown();
  const contentRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      className={`dropdown-content dropdown-align-${align} dropdown-width-${width} ${className}`}
      role="listbox"
    >
      {children}
    </div>
  );
};

interface ItemProps {
  value: unknown;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Item: React.FC<ItemProps> = ({
  value,
  children,
  className = "",
  disabled = false,
}) => {
  const { selectedValue, selectValue, close } = useDropdown();
  const isSelected = selectedValue === value;

  const handleClick = () => {
    if (disabled) return;
    const label =
      typeof children === "string" ? children : children?.toString() || "";
    selectValue(value, label);
    close();
  };

  return (
    <div
      className={`dropdown-item ${className} ${
        isSelected ? "is-selected" : ""
      } ${disabled ? "is-disabled" : ""}`}
      onClick={handleClick}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
};

interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ children, className = "" }) => {
  return <div className={`dropdown-footer ${className}`}>{children}</div>;
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Item = Item;
Dropdown.Footer = Footer;
