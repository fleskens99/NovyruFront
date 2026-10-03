import '../Styling/Header.css'
import logo from '../assets/Layout/Logo-Layout.png'
import favoritesIcon from '../assets/Layout/Favorite-Layout.png'
import shoppingListIcon from '../assets/Layout/Shopping-Cart-Layout.png'
import accountIcon from '../assets/Layout/Account-Layout.png'

function Header(){
    return (
        <>
        <header className="header">
            <div className="logo-section">
                <div className="logo-circle">
                    <img src={logo} alt="Logo" className="logo-icon" />
                </div>
                <span className="logo-text" href="/">Novyru</span>
            </div>

            <nav className="nav-buttons">
                    <button className="nav-btn" href="/favorites">
                    <img className="nav-Favorite-icon" src={favoritesIcon} alt="Favorites Icon" />
                    Favorites
                    </button>
                    <button className="nav-btn" href="/shopping-list">
                    <img className="nav-shopping-list-icon" src={shoppingListIcon} alt="Shopping List Icon" />
                    Shopping List</button>
                    <button className="nav-btn" href="/account">
                    <img className="nav-Account-icon" src={accountIcon} alt="Account Icon" />
                    Account</button>
            </nav>
        </header>
        </>
    );
}

export default Header;