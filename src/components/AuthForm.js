import React from 'react';
import { ReactDOM } from "react";

function AuthForm(props) {
  return (
    <main className="content page__content">
      <section className="auth">
        <form name={`${props.name}`} className="auth__form" onSubmit={props.onSubmit} noValidate>
          <h3 className="auth__title">{`${props.title}`}</h3>
          <input name="email" className="auth__input" placeholder="Email" type="email" onChange={props.onChange} value={props.email} required/>
          <input name="password" className="auth__input" placeholder="Пароль" type="password" onChange={props.onChange} value={props.password} required/>
          <button className="auth__submit-button" type="submit">{`${props.textButton}`}</button>
          <p className="auth__text">{props.text}{props.link}</p>
        </form>
      </section>
    </main>
  );
}

export default AuthForm;