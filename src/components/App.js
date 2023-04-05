import React from "react";
import { ReactDOM } from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRouteElement from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import * as auth from '../auth.js';
import logoSuccess from '../images/Success.svg';
import logoFail from '../images/Fail.svg';
import { useForm } from "../hooks/useForm";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState('');
  const {values, handleChange, setValues} = useForm({
    password: '',
    email: ''
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    tokenCheck();
  }, [])

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserData(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleSuccessPopupOpen() {
    setIsSuccessPopupOpen(true);
  }

  function handleFailPopupOpen() {
    setIsFailPopupOpen(true);
  }

  function closeAllPopups() {
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsFailPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const likeCardStatus = isLiked ? api.deleteLikeCard(card._id) : api.likeCard(card._id);

    likeCardStatus
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(p => p !== card));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateUser({ name, about }) {
    api.editUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    api.editAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);;
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleSubmitAuth(e) {
    e.preventDefault();
    if (!values.password || !values.email) {
      return;
    }
    auth.authorize(values.password, values.email)
      .then((data) => {
        if (data.token) {
          setValues({ password: '', email: '' });
          handleLogin();
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  function handleSubmitReg(e) {
    e.preventDefault();
    auth.register(values.password, values.email)
      .then((res) => {
        handleSuccessPopupOpen();
      })
      .catch((err) => {
        handleFailPopupOpen();
        console.log(err);
      })
  }

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([cardsData, userData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userData={userData} />
        <Routes>
          <Route path="/signup" element={
            <Register
              onSubmit={handleSubmitReg}
              onChange={handleChange}
              email={values.email}
              password={values.password}
            />} 
          />
          <Route path="/signin" element={
            <Login
              handleLogin={handleLogin}
              onSubmit={handleSubmitAuth}
              onChange={handleChange}
              email={values.email}
              password={values.password}
            />} 
          />
          <Route path="/" element={<ProtectedRouteElement
            element={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn} />}
          />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <PopupWithForm name="confirmation" title="Вы уверены?" buttonText="Да" />
        <InfoTooltip
          name="infoTooltip"
          isOpen={isSuccessPopupOpen}
          src={logoSuccess}
          alt="Успех!"
          title="Вы успешно зарегистрировались!"
          onClose={closeAllPopups}
          reg={true}
        />

        <InfoTooltip
          name="infoTooltip"
          isOpen={isFailPopupOpen}
          src={logoFail}
          alt="Ошибка!"
          title="Что-то пошло не так! Попробуйте ещё раз."
          onClose={closeAllPopups}
          reg={false}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
