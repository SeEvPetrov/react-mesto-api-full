import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      textBtn="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          onChange={handleChangeName}
          value={name}
          type="text"
          name="name"
          id="title"
          className="popup__input popup__input_type_title"
          required
          placeholder="Название"
          autoComplete="off"
          minLength={2}
          maxLength={30}
        />
        <span className="popup__input-error" id="title-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          onChange={handleChangeLink}
          value={link}
          type="url"
          name="link"
          id="link"
          className="popup__input popup__input_type_url"
          required
          placeholder="Ссылка на картинку"
          autoComplete="off"
        />
        <span className="popup__input-error" id="link-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
