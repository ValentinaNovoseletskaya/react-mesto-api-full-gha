import logo from '../images/logo.svg';

function Header({onLogOut, headerText, element}) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <p className="header__text">{headerText}{onLogOut && <span className="header__button" onClick={onLogOut}>Выйти</span>}{element}</p>
        </header>          
    );
}

export default Header;