import "./ModalWithForm.css";
import close from "../../assets/close.svg";

const ModalWithForm = ({
  title,
  name,
  buttonText = "Add garment",
  isOpen,
  onClose,
  children,
  onSubmit,
}) => {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
