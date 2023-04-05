import React from 'react';
import { ReactDOM } from "react";
import AuthForm from './AuthForm';
import * as auth from '../auth.js';
import { Link } from 'react-router-dom';

function Register(props) {
  const [formValue, setFormValue] = React.useState({
    password: '',
    email: ''
  })

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth.register(formValue.password, formValue.email)
      .then((res) => {
        console.log(res);
        if (res) {
          props.onSuccess();
        } else {
          props.onFail();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <AuthForm
      name="register"
      title="Регистрация"
      textButton="Зарегистрироваться"
      text="Уже зарегистрировались? "
      onSubmit={handleSubmit}
      onChange={handleChange}
      link={<Link to="/signin" className="auth__link">Войти</Link>}
    />
  );
}

export default Register;