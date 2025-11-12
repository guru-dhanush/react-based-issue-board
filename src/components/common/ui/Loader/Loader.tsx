import "./Loader.css";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export function Loader({ size = "md", message }: LoaderProps) {
  return (
    <div className="loading-spinner-container">
      <div className={`loading-spinner loading-spinner-${size}`}>
        <div className="spinner-ring"></div>
      </div>
      {message && <p className="loading-spinner__messag">{message}</p>}
    </div>
  );
}
