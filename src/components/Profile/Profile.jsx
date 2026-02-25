import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  isLoggedIn,
  handleSignOut,
  onEditProfile,
  onCardLike
}) {
  return (
    <section className="profile">
      <SideBar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} onEditProfile={onEditProfile} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
