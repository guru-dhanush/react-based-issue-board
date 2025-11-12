import classNames from "classnames";
import "./Button.css";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.memo(function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = classNames(
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    {
      "btn-loading": loading,
      "btn-disabled": disabled || loading,
    },
    className
  );

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <span className="btn-spinner" />}
      {children}
    </button>
  );
});
