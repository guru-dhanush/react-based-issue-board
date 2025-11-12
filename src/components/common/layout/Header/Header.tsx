import { Link } from "react-router-dom";
import "./Header.css";
import { currentUser } from "../../../../constants/currentUser";

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <Link to="/board" className="header__logo header__logo--large">
            <img src="/icons/innoscriptaLogo.svg" alt="Logo" />
          </Link>

          <Link to="/board" className="header__logo header__logo--small">
            <img src="/icons/logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="header__user">
          <div className="header__avatar">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>

          <div className="header__user-info">
            <span className="header__user-name">{currentUser.name}</span>

            <span
              className={`header__user-role ${
                currentUser?.role === "admin" ? "header__user-role--dark" : ""
              }`}
            >
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
