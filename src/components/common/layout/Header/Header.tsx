import { Link } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";
import "./Header.css";

export function Header() {
  const { currentUser } = useUser();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/board" className="header-logo larger-screen">
            <img src="/icons/innoscriptaLogo.svg" alt="Logo" />
          </Link>
          <Link to="/board" className="header-logo smaller-screen">
            <img src="/icons/logo.png" alt="Logo" />
          </Link>
        </div>

        <nav className="header-links">
          <Link to="/board" className="header-link">
            Board
          </Link>
          <Link to="/settings" className="header-link">
            Settings
          </Link>
        </nav>

        <div className="header-user">
          <div className="user-avatar">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{currentUser.name}</span>
            <span className="user-role">{currentUser.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
