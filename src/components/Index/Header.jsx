
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../api/helper/auth";
import "../../Styling/Header.css";

import logo from "../../assets/Layout/Logo-Layout.png";
import favoritesIcon from "../../assets/Layout/Favorite-Layout.png";
import shoppingListIcon from "../../assets/Layout/Shopping-Cart-Layout.png";
import accountIcon from "../../assets/Layout/Account-Layout.png";

function Header() {
  // Subscribe to route changes so the header updates
  // immediately after login or navigation.
  useLocation();

  const user = getCurrentUser();
  const isLoggedIn = Boolean(user);

  return (
    <header className="header">
      <div className="logo-section">
        <div className="logo-circle">
          <img
            src={logo}
            alt="Logo"
            className="header-icon"
          />
        </div>

        <Link className="logo-text" to="/">
          Novyru
        </Link>
      </div>

      <nav className="header-buttons">
        <Link className="header-btn" to="/favorites">
          <img
            className="header-Favorite-icon"
            src={favoritesIcon}
            alt=""
          />
          Favorites
        </Link>

        <Link className="header-btn" to="/shopping-list">
          <img
            className="header-shopping-list-icon"
            src={shoppingListIcon}
            alt=""
          />
          Shopping List
        </Link>

        <Link
          className="header-btn"
          to={isLoggedIn ? "/account" : "/login"}
          aria-label={isLoggedIn ? "Your account" : "Log in"}
        >
          <img
            className="header-Account-icon"
            src={accountIcon}
            alt=""
          />
          {isLoggedIn ? (user.name || "Account") : "Login"}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
