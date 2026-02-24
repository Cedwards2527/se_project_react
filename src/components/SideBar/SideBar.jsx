import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function SideBar({ isLoggedIn, handleSignOut, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <div className="sidebar__user-info">
          <img
            src={currentUser?.avatar || "/default-avatar.png"}
            alt="user avatar"
            className="sidebar__avatar"
          />
          <p className="sidebar__username">{currentUser?.name || "No Name"}</p>
        </div>

        {isLoggedIn && (
          <div className="sidebar__actions">
            <button className="sidebar__editprofile" onClick={onEditProfile}>
            Change profile data
            </button>
            {handleSignOut && (
              <button className="sidebar__signout" onClick={handleSignOut}>
                Log out
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}