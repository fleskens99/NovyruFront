import '../Styling/Header.css'

function Header(){
    return (
        <>
        <header ClassName="header">
        <li>
            <a href="/">Novyru</a>
        </li>
        
        <nav ClassName="nav-buttons">
                <button ClassName="nav-btn" href="/favorites">Favorites</button>
                <button ClassName="nav-btn" href="/shopping-list">Shopping List</button>
                <button ClassName="nav-btn" href="/account">Account</button>
        </nav>
         </header>
        </>
    );
}

export default Header;