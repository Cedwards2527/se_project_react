import "./ModalWithForm.css";
import close from "../../assets/close.svg";

const ModalWithForm = ({
  title,
  name,
  buttonText = "Submit",
  isOpen,
  onClose,
  children,
  onSubmit,
  submitClassName = "modal__submit",
  extraButton,
  disabled,
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
          <div className="modal__actions">
            <button
              type="submit"
              className={submitClassName}
              disabled={disabled}
            >
              {buttonText}
            </button>
            {extraButton && extraButton}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
