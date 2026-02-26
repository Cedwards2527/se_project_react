import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../../context/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  if (!item) return null;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = item.likes?.some((id) => id === currentUser._id) || false;

  const itemLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_active" : ""}`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
