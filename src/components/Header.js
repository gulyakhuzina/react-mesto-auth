import React from 'react';
import { ReactDOM } from "react";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import logoHeader from '../images/logo-header.svg';

function Header(props) {
  const navigate = useNavigate();
  function signOut(){
    localStorage.removeItem('jwt');
    navigate('/signin', {replace: true});
  }
  return (
    <Routes>
      <Route path="/signin" element={
        <header className="header">
          <img className="header__logo" src={logoHeader} alt="Логотип Mesto.Russia." />
          <Link to="/signup" className="header__link">Регистрация</Link>
        </header>
      } />
      <Route path="/signup" element={
        <header className="header">
          <img className="header__logo" src={logoHeader} alt="Логотип Mesto.Russia." />
          <Link to="/signin" className="header__link">Войти</Link>
        </header>
      } />
      <Route path="/" element={
        <header className="header">
          <img className="header__logo" src={logoHeader} alt="Логотип Mesto.Russia." />
          <div className="header__info">
            <p className="header__email">{props.userData}</p>
            <button onClick={signOut} className="header__button">Выйти</button>
          </div>
        </header>
      } />
    </Routes>
  );
}

export default Header;