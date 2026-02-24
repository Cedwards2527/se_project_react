import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../../context/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_active" : ""}`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {currentUser && (
        <button className={itemLikeButtonClassName} onClick={handleLike}>
          Like
        </button>
      )}
    </li>
  );
}

export default ItemCard;
