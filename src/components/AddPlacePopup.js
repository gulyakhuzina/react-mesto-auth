import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup(props) {
  const {values, handleChange, setValues} = useForm({
    name: '',
    link: ''
  });
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: values.name,
      link: values.link
    });
  }

  React.useEffect(() => {
    setValues({
      name: '',
      link: ''
    })
  }, [props.isOpen]); 

  return (
    <PopupWithForm 
      name="img" 
      title="Новое место" 
      isOpen={props.isOpen}
      buttonText="Создать"
      onClose ={props.onClose}
      onAddPlace={props.onAddPlace}
      onSubmit={handleSubmit}
    >
      <input id="title" name="name" className="popup__input" value={values.name || ''} onChange={handleChange} type="text" minLength="2" maxLength="30" autoFocus placeholder="Название" required />
      <span id="title-error" className="popup__error"></span>
      <input id="link" name="link" className="popup__input" value={values.link || ''} onChange={handleChange} type="url" placeholder="Ссылка на картинку" required />
      <span id="link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;