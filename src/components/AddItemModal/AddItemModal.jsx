import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    link: "",
    weatherType: "",
  };
  const { values, handleChange } = useForm(defaultValues);
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input modal__input_type_card_name"
          id="clothing-name"
          placeholder="name"
          minLength="2"
          maxLength="32"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image URL{" "}
        <input
          type="url"
          name="link"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          value={values.link}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
          />
          Warm
        </label>{" "}
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
