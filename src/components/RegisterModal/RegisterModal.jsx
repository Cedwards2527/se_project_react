import { useState, useEffect } from "react";
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
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setError("");
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onRegistration = (e) => {
    e.preventDefault();
    setError("");
    handleRegistration(data)
      .catch((err) => {
        setError(err.message);
      });
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
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      }
    >
      <label htmlFor="register-email">Email*</label>
      <input
        className="modal__input"
        id="register-email"
        name="email"
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="register-password">Password*</label>
      <input
        className="modal__input"
        id="register-password"
        name="password"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        required
      />

      <label htmlFor="register-name">Name*</label>
      <input
        className="modal__input"
        id="register-name"
        name="name"
        type="text"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="register-avatar">Avatar URL</label>
      <input
        className="modal__input"
        id="register-avatar"
        name="avatar"
        type="url"
        placeholder="Avatar URL"
        value={data.avatar}
        onChange={handleChange}
      />
      {error && <div className="login-modal__error">{error}</div>}
    </ModalWithForm>
  );
};

export default RegisterModal;
