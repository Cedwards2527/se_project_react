import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../Main/ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) =>
      item &&
      (
        typeof item.owner === "string"
          ? item.owner === currentUser?._id
          : item.owner?._id === currentUser?._id
      )
  );
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your items</p>
        <button
          type="button"
          className="clothes-section__button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
