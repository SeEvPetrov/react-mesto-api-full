const PopupWithForm = ({
  title,
  name,
  children,
  isOpen,
  onClose,
  textBtn,
  onSubmit,
}) => {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        ></button>
        <form
          action="#"
          name={name}
          className="popup__form form-edit"
          onSubmit={onSubmit}
        >
          <fieldset className="popup__form-set">
            <h2 className="popup__title">{title}</h2>
            {children}
            <button
              type="submit"
              className="popup__submit popup__submit_type_edit"
            >
              {textBtn}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
