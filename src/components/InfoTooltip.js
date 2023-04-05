import React from 'react';
import { ReactDOM } from "react";
import { useNavigate } from 'react-router-dom';

function InfoTooltip(props) {
  const navigate = useNavigate();

  function handleOnClick() {
    props.onClose();
    if (props.reg) {
      console.log(props.reg);
      navigate('/signin', { replace: true });
    }
  }

  return (
    <div className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className={`popup__container-${props.name}`}>
        <img src={props.src} alt={props.alt} />
        <h3 className={`popup__title-${props.name}`}>{props.title}</h3>
        <button className="popup__close-button" onClick={handleOnClick} type="button"></button>
      </div>
    </div>
  )
}

export default InfoTooltip;