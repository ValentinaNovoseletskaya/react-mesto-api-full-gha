import logo from '../images/logo.svg';
import { Route, Routes, Link } from "react-router-dom";

function Header({onLogOut, headerText, element}) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <p className="header__text">
            <Routes>
                <Route path="/" element={
                    <>
                    {headerText}{onLogOut && <span className="header__button" onClick={onLogOut}>Выйти</span>}  
                    </>
                }>
                </Route>
                <Route path="/signup" element={
                    <Link to="/signin" className="sign__link">Войти</Link>
                }>
                </Route>
                <Route path="/signin" element={
                    <Link to="/signup" className="sign__link">Регистрация</Link>
                }>
                </Route>
            </Routes>
            
            </p>
        </header>          
    );
}

export default Header;