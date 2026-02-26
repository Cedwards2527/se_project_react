import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  isOpen,
  onClose,
  handleRegistration,
  onSwitchToLogin,
}) => {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onRegistration = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };
  const formIsValid = data.email && data.password && data.name;
  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onRegistration}
      disabled={!formIsValid}
      submitClassName="auth-modal__submit"
      extraButton={
        <button
          type="button"
          className="modal__switch"
          disabled={!formIsValid}
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      }
    >
      <label htmlFor="email">Email*</label>
      <input
        className="modal__input"
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password*</label>
      <input
        className="modal__input"
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        required
      />

      <label htmlFor="name">Name*</label>
      <input
        className="modal__input"
        id="name"
        name="name"
        type="text"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="avatar">Avatar URL</label>
      <input
        className="modal__input"
        id="avatar"
        name="avatar"
        type="url"
        placeholder="Avatar URL"
        value={data.avatar}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
