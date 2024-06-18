import Navbar from "../components/Navbar";
import "../app/globals.css"; // Import Tailwind CSS base styles
import FavoritesBody from "@/components/favouritesBody";



export default function Favourites() {
  return (
    <div>
      <Navbar />
      <FavoritesBody />
    </div>
  );
}