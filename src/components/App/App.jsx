import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { apiKey } from "../../utils/constants";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../context/CurrentUserContext";
import { deleteItems, getItems, addItem, profileEdit, removeCardLike, addCardLike } from "../../utils/api";
import * as auth from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "clear",
    temp: { F: 72, C: 22 },
    city: "Unknown",
    condition: "clear",
    isDay: true,
    iconUrl: "/assets/day/default.svg",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const openLoginModal = () => setActiveModal("login");
  const openRegisterModal = () => setActiveModal("register");
  const closeActiveModal = () => setActiveModal("");

  const handleRegistration = ({ email, name, password, avatar }) => {
    auth.register(name, avatar, email, password)
      .then(() => auth.authorize(email, password))
      .then(res => {
        localStorage.setItem("jwt", res.token);
        return auth.checkToken(res.token);
      })
      .then(userData => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
        const redirectPath = location.state?.pathname || "/";
        navigate(redirectPath);
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;
    auth.authorize(email, password)
      .then(res => {
        localStorage.setItem("jwt", res.token);
        return auth.checkToken(res.token);
      })
      .then(userData => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
        const redirectPath = location.state?.pathname || "/";
        navigate(redirectPath);
      })
      .catch(console.error);
  };

  const onProfileEdit = (inputValues) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    profileEdit({ name: inputValues.name, avatar: inputValues.avatar }, token)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const mapWeatherToCategory = (apiType, tempF) => {
      if (tempF >= 80) return "hot";
      if (tempF >= 60) return "warm";
      return "cold";
    };

    const fetchWeather = (coords) => {
      getWeather(coords, apiKey)
        .then(data => {
          const filtered = filterWeatherData(data);
          const category = mapWeatherToCategory(filtered.type, filtered.temp.F);
          setWeatherData({ ...filtered, type: category });
        })
        .catch(console.error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => fetchWeather({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => fetchWeather({ latitude: 33.4271, longitude: -81.8627 })
      );
    } else {
      fetchWeather({ latitude: 33.4271, longitude: -81.8627 });
    }

    getItems()
      .then(items => setClothingItems(Array.isArray(items) ? items.reverse() : []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    auth.checkToken(token)
      .then(userData => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
        navigate("/login");
      });
  }, [navigate]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(unit => (unit === "F" ? "C" : "F"));
  };

  const handleAddClick = () => isLoggedIn && setActiveModal("add-garment");
  const handleDeleteModalOpen = () => isLoggedIn && setActiveModal("delete");
  const handleEditProfileModalOpen = () => isLoggedIn && setActiveModal("profile change");

  const onAddItem = (inputValues, resetForm) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    addItem({ name: inputValues.name, imageUrl: inputValues.imageUrl, weather: inputValues.weatherType }, token)
      .then(newItem => {
        setClothingItems(prev => [newItem, ...prev]);
        closeActiveModal();
        resetForm?.();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (itemID) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    deleteItems(itemID, token)
      .then(() => setClothingItems(prev => prev.filter(item => item._id !== itemID)))
      .catch(console.error)
      .finally(() => closeActiveModal());
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    const request = isLiked ? removeCardLike(id, token) : addCardLike(id, token);
    request
      .then(updatedCard => {
        setClothingItems(prev => prev.map(item => item._id === id ? updatedCard.data : item));
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    const handleEscape = evt => evt.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              openRegisterModal={openRegisterModal}
              openLoginModal={openLoginModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoutes isLoggedIn={isLoggedIn}>
                    <Profile
                      setIsLoggedIn={setIsLoggedIn}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleSignOut={handleSignOut}
                      isLoggedIn={isLoggedIn}
                      onEditProfile={handleEditProfileModalOpen}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoutes>
                }
              />
            </Routes>
          </div>
          <Footer />
          <AddItemModal
            buttonText="Add garment"
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onDeleteClick={handleDeleteModalOpen}
            onClose={closeActiveModal}
            handleDeleteModalOpen={handleDeleteModalOpen}
            onCardLike={handleCardLike}
          />
          <DeleteModal
            isOpen={activeModal === "delete"}
            onClose={closeActiveModal}
            card={selectedCard}
            handleDeleteItem={handleDeleteItem}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
            onSwitchToLogin={openLoginModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            handleLogin={handleLogin}
            onSwitchToRegistration={openRegisterModal}
          />
          <EditProfileModal
            isOpen={activeModal === "profile change"}
            onClose={closeActiveModal}
            onUpdateUser={onProfileEdit}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
