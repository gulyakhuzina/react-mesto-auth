import React from 'react';
import { ReactDOM } from "react";
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';

function Register(props) {
  return (
    <AuthForm
      name="register"
      title="Регистрация"
      textButton="Зарегистрироваться"
      text="Уже зарегистрировались? "
      link={<Link to="/signin" className="auth__link">Войти</Link>}
      onSubmit={props.onSubmit}
      onChange={props.onChange}
      email={props.email}
      password={props.password}
    />
  );
}

export default Register;