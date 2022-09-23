const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_zoom ${card.link && "popup_opened"}`}>
      <div className="popup__container-photo">
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        ></button>
        <figure className="popup__image">
          <img src={card.link} alt={card.name} className="popup__zoom-image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;
