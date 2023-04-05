import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({
    name: '',
    about: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  React.useEffect(() => {
    setValues({
      name: currentUser.name, 
      about: currentUser.about
    })
  }, [currentUser, props.isOpen]); 

  return (
    <PopupWithForm 
      name="profile" 
      title="Редактировать профиль" 
      isOpen={props.isOpen} 
      buttonText="Сохранить"
      onClose ={props.onClose}
      onSubmit={handleSubmit}
    >
      <input id="name" name="name" className="popup__input" value={values.name || ''} onChange={handleChange} type="text" minLength="2" maxLength="40" autoFocus placeholder="Ваше имя" required />
      <span id="name-error" className="popup__error"></span>
      <input id="about" name="about" className="popup__input" value={values.about || ''} onChange={handleChange} type="text" minLength="2" maxLength="200" placeholder="Ваш род деятельности" required />
      <span id="about-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;