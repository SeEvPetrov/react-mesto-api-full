import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import api from "../utils/Api";
import * as Auth from "../utils/auth";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "Гружу...",
    about: "еще чуть чуть",
  });
  const [email, setEmail] = useState("mesto@ya.ru");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState(false);

  const isModalOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    selectedCard.link ||
    isInfoTooltipOpen;

  // закрываем попапы по кнопке esc
  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    if (isModalOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isModalOpen]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onRegister = (password, email) => {
    Auth.register(password, email)
      .then((data) => {
        setMessage(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setMessage(false);
        console.error(err);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  const onLogin = (password, email) => {
    Auth.authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
        }
        setEmail(email);
        setLoggedIn(true);
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        console.error(err);
      });
  };

  // useEffect(() => {
  //   if (loggedIn) {
  //     console.log(loggedIn);
  //     navigate("/");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
      navigate("/");
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  // функция постановки и снятия лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .setLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // функция удаления карточки
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // функция удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleConfirmDeleteClick = () => {
    setIsConfirmPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header
                  email={email}
                  toLink={"/"}
                  textLink={"Выйти"}
                  onSignOut={onSignOut}
                />
                <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onConfirmClick={handleConfirmDeleteClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
          />

          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />

          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          message={message}
          textSucces={"Вы успешно зарегистрировались!"}
          textError={"Что-то пошло не так! Попробуйте ещё раз."}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
