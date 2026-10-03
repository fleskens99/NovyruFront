import '../Styling/Header.css'

function Header(){
    return (
        <>
        <header className="header">
            <div className="logo-section">
                <div className="logo-circle">
                    <img src='' alt="Logo" className="logo-image" />
                </div>
                <span className="logo-text" href="/">Novyru</span>
            </div>

            <nav className="nav-buttons">
                    <button className="nav-btn" href="/favorites">Favorites</button>
                    <button className="nav-btn" href="/shopping-list">Shopping List</button>
                    <button className="nav-btn" href="/account">Account</button>
            </nav>
        </header>
        </>
    );
}

export default Header;