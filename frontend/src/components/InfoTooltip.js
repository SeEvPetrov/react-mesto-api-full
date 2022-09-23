import imageSuccess from "../images/Ok.svg";
import imageError from "../images/no.svg";

const InfoTooltip = ({ isOpen, onClose, message, textSucces, textError }) => {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className={"popup__container popup__container_type_auth"}>
        <img
          className="popup__image-auth"
          alt={message ? "Великолепно" : "Упсс..неудачая попытка"}
          src={message ? imageSuccess : imageError}
        />
        <p className="popup__caption_type_auth">
          {message ? textSucces : textError}
        </p>
        <button
          className={"popup__button-close"}
          type="button"
          aria-label="Закрыть форму"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
export default InfoTooltip;
