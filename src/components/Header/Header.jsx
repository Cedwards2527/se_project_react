import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  openLoginModal,
  openRegisterModal,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__controls">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>
            <NavLink className="header__nav-link" to="/profile">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar?(
                <img
                  src={currentUser.avatar} 
                  alt="user avatar"
                  className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {currentUser?.name[0].toUpperCase()}
                  </div>
                )}
                </div>
            </NavLink>
          </>
        ) : (
          <div className="header__auth-btns">
            <button type="button" onClick={openRegisterModal}>
              Sign Up
            </button>
            <button  type="button" onClick={openLoginModal}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
