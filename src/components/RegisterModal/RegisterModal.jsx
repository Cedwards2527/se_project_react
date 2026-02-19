import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onClose, handleRegistration }) => {
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
  return (
    <ModalWithForm
      title="Register"
      name="register"
      buttonText="Sign Up"
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
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        value={data.name}
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
      <label htmlFor="avatar">Avatar URL:</label>
      <input
        id="avatar"
        name="avatar"
        type="url"
        value={data.avatar}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
