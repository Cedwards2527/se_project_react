import { Routes, Route, useNavigate,useLocation } from "react-router-dom";
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
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import { deleteItems, getItems, addItem } from "../../utils/api";

//import * as auth from "../../utils/auth";

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


  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
   const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();


  const handleRegistration = ({ email, username, password, avatarUrl, confirmPassword }) => {
  if (password === confirmPassword) {
    auth.register(username, password, email, avatarUrl)
      .then((res) => {
       if(res.token){
        localStorage.setItem("jwt", res.token);
        setUser(res.user)
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/login");
       }
      })
      .catch(console.error);
      }
    };
   

  const handleLogin = ({email, password}) => {
    if (!email || !password){
      return;
    }
    auth.authorize(email, password)
    .then((res) => {
      if(res.token) {
        localStorage.setItem("jwt", res.token)
        setUser(res.user);
        setIsLoggedIn(true);
        const redirectPath = location.state?.pathname || "/";
        navigate(redirectPath)
      }
    })
    .catch(console.error);

  }

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
            openRegisterModal={() => setActiveModal("register")}
            openLoginModal={() => setActiveModal("login")}
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
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          handleRegistration={handleRegistration}
        />
        <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeActiveModal}
        handleLogin={handleLogin}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
