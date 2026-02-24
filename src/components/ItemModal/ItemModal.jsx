import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./ItemModal.css";
import close from "../../assets/close-white.svg";

function ItemModal({ isOpen, onClose, card, handleDeleteModalOpen }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

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
          {isOwn && (
            <button
              className="modal__delete-button"
              onClick={handleDeleteModalOpen}
              type="button"
            >
              Delete item
            </button>
          )}
          <p className="modal__weather">Weather: {card.weather},</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
