import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const onValueName = (e) => {
    setName(e.target.value);
  };

  const onValueDescription = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      Description="Редактировать профиль"
      name="edit"
      textBtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          type="text"
          name="name"
          id="name"
          className="popup__input popup__input_type_name"
          required
          placeholder="Введите имя"
          autoComplete="off"
          minLength={2}
          maxLength={40}
          value={name}
          onChange={onValueName}
        />
        <span className="popup__input-error" id="name-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          type="text"
          name="about"
          id="about"
          className="popup__input popup__input_type_job"
          required
          placeholder="Введите профессию"
          autoComplete="off"
          minLength={2}
          maxLength={200}
          value={description}
          onChange={onValueDescription}
        />
        <span className="popup__input-error" id="about-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
