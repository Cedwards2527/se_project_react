import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onClose, handleRegistration }) => {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    avatarUrl: "",
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
  return (
    <ModalWithForm
      title="Register"
      name="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onRegistration}
    >
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={data.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        name="username"
        type="text"
        value={data.username}
        onChange={handleChange}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        required
      />
      <label htmlFor="avatarUrl">Avatar URL:</label>
      <input
        id="avatarUrl"
        name="avatarUrl"
        type="url"
        value={data.avatarUrl}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
