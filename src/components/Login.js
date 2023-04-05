import React from 'react';
import { ReactDOM } from "react";
import AuthForm from './AuthForm';

function Login(props) {
  return (
    <AuthForm 
      name="login" 
      title="Вход" 
      textButton="Войти" 
      onSubmit={props.onSubmit} 
      onChange={props.onChange} 
      email={props.email}
      password={props.password}
    />
  );
}

export default Login;