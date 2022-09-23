import PopupWithForm from "./PopupWithForm";

const ConfirmPopup = ({ isOpen, onClose }) => {
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm-delete"
      textBtn="Да"
      isOpen={isOpen}
      onClose={onClose}
    ></PopupWithForm>
  );
};

export default ConfirmPopup;
