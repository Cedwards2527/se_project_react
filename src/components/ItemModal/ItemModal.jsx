import "./ItemModal.css";
import close from "../../assets/close-white.svg";

function ItemModal({ isOpen, onClose, card }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div
        className="modal__content modal__content_type_image "
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <button type="button" className="modal__delete-button">
            Delete item
          </button>
          <p className="modal__weather">Weather: {card.weather},</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
