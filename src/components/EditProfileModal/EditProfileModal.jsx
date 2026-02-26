import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./EditProfile.css";
 
const EditProfileModal = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [data, setData] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser) {
      setData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(data);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="profile change"
      buttonText="Save Change"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <label htmlFor="name">Name*</label>
      <input
       className="modal__input"
        id="edit-name"
        name="name"
        type="text"
        placeholder="Avatar URL"
        value={data.name}
        onChange={handleChange}
        required
      />{" "}
      <label htmlFor="avatar">Avatar URL*</label>
      <input
       className="modal__input"
        id="edit-avatar"
        name="avatar"
        type="url"
        placeholder="Avatar URL"
        value={data.avatar}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default EditProfileModal;
