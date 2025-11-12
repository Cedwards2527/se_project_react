import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">Terrence Tegegne</p>
        <img src={avatar} alt="user avatar" className="sidebar__avatar" />
      </div>
    </aside>
  );
}
