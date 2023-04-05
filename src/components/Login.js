import React from 'react';
import { ReactDOM } from "react";
import AuthForm from './AuthForm';
import {useNavigate} from 'react-router-dom';
import * as auth from '../auth.js';

function Login(props) {
  const [formValue, setFormValue] = React.useState({
    password: '',
    email: ''
  })
  const navigate = useNavigate();

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValue.password || !formValue.email){
      return;
    }
    auth.authorize(formValue.password, formValue.email)
      .then((data) => {
        if (data.token) {
          setFormValue({password: '', email: ''});
          props.handleLogin();
          navigate('/', {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <AuthForm 
      name="login" 
      title="Вход" 
      textButton="Войти" 
      onSubmit={handleSubmit} 
      onChange={handleChange} 
    />
  );
}

export default Login;