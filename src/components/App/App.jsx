import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import { deleteItems, getItems, addItem } from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";

window.addEventListener("error", (e) => {
  if (
    e.filename?.includes("installHook.js") &&
    e.message.includes("Unexpected token '<'")
  ) {
    e.stopImmediatePropagation();
    return false;
  }
});

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "clear",
    temp: { F: 72, C: 22 },
    city: "Unknown",
    condition: "clear",
    isDay: true,
    iconUrl: "/assets/day/default.svg",
  });

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
   const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const handleRegistration = (data) => {
    setUser({
      name: data.username,
      avatar: data.avatarUrl,
    })
    setIsLoggedIn(true);
    closeRegisterModal();
  };

  useEffect(() => {
    const fetchWeather = (coords) => {
      getWeather(coords, apiKey)
        .then((data) => {
          const filtered = filterWeatherData(data);
          setWeatherData(filtered);
        })
        .catch(console.error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeather({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Geolocation error:", err);

          fetchWeather({ latitude: 33.4271, longitude: -81.8627 });
        },
      );
    } else {
      console.error("Geolocation not supported");
      fetchWeather({ latitude: 33.4271, longitude: -81.8627 });
    }

    getItems()
      .then(({ data }) =>
        setClothingItems(Array.isArray(data) ? data.reverse() : []),
      )
      .catch(console.error);
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));

  const handleAddClick = () => setActiveModal("add-garment");
  const handleDeleteModalOpen = () => setActiveModal("delete");
  const closeActiveModal = () => setActiveModal("");

  const onAddItem = (inputValues, resetForm) => {
    addItem({
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    })
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
        resetForm();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (itemID) => {
    deleteItems(itemID)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item.id !== itemID));
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") closeActiveModal();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            currentUser={user}
            openRegisterModal={openRegisterModal}
            openLoginModal={() => {}}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
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
        />
        <DeleteModal
          isOpen={activeModal === "delete"}
          onClose={closeActiveModal}
          card={selectedCard}
          handleDeleteItem={handleDeleteItem}
        />

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
          handleRegistration={handleRegistration}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
