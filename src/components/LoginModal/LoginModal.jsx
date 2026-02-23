import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({isOpen, onClose, handleLogin}) => {
    const [data, setData] = useState({
        email: "",
    password: "",
    });

    const handleChange = (e) => {
      const {name, value} = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    const onLogin = (e) => {
        e.preventDefault();
        handleLogin(data);
    };
    return(
    <ModalWithForm
     title="Log In"
      name="login"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onLogin}
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
       <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        required
      />
 </ModalWithForm>
  );
};
 export default LoginModal;
