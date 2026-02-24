import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { loginUser } from "../../utils/api";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, handleLogin, onSwitchToRegistration }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  
  const [passwordLabel, setPasswordLabel] = useState("Password");

  useEffect(() => {
    if (!isOpen) {
      setData({ email: "", password: "" });
      setError("");
      setPasswordLabel("Password");
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = (e) => {
    e.preventDefault();

    if (!data.password) {
      setPasswordLabel("Incorrect password");
      setError("Email or Password incorrect");
      return;
    } else {
      setPasswordLabel("Password"); 
    }

    setError("");

 loginUser({ email: data.email, password: data.password })
  .then(() => {
    handleLogin({ email: data.email, password: data.password });
    onClose();
  })
  .catch((err) => {
    const msg = err.message.toLowerCase();
    if (msg.includes("password")) setPasswordLabel("Incorrect password");
    setError(err.message);
  });
  };

  const formIsValid = data.email && data.password;

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onLogin}
      disabled={!formIsValid}
      submitClassName="auth-modal__submit"
      extraButton={
        <button
          type="button"
          className="modal__switch"
          onClick={onSwitchToRegistration}
        >
          or Sign Up
        </button>
      }
    >
      <label htmlFor="email">Email</label>
      <input
        className="modal__input"
        id="email"
        name="email"
        type="email"
        value={data.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="password">{passwordLabel}</label>
      <input
        className="modal__input"
        id="password"
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        required
      />
      {error && <div className="login-modal__error">{error}</div>}
    </ModalWithForm>
  );
};

export default LoginModal;
