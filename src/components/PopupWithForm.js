import React from 'react';
import Popup from './Popup';

function PopupWithForm(props) {
  return (
    <Popup
      isOpen={props.isOpen}
      name={props.name}
      onClose={props.onClose}
    >
      <form name={`${props.name}`} className="popup__form" onSubmit={props.onSubmit}>
        <h3 className="popup__title">{props.title}</h3>
        {props.children}
        <button className="popup__submit-button" type="submit">{props.buttonText}</button>
      </form>
    </Popup>
  )
}



export default PopupWithForm;