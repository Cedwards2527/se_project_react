import ClothesSection from "../ClothesSection/ClothesSetion";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile() {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection />
    </section>
  );
}
