import "./DeleteModal.css";
import close from "../../assets/close.svg";

function DeleteModal({ isOpen, onClose, card, handleDeleteItem }) {
  return (
    <div className={`modal  ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div
        className="modal__container modal__container_type_delete"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} type="button" className="modal__delete_close">
          <img src={close} alt="close" />
        </button>
        <h2 className="modal__title">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </h2>
        <div className="modal__buttons" id="delete-form">
          <button
            type="button"
            onClick={() => handleDeleteItem(card._id)}
            aria-label="Delete image"
            className="mobal__btn mobal__btn_type_delete"
          >
            Yes, Delete item
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cancel delete"
            className="mobal__btn mobal__btn_type_cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
