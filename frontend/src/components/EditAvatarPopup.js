import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputAvatarRef = useRef();

  useEffect(() => {
    inputAvatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      textBtn="Обновить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          ref={inputAvatarRef}
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_card-link"
          id="reference"
          required
        />
        <span className="popup__input-error" id="reference-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
