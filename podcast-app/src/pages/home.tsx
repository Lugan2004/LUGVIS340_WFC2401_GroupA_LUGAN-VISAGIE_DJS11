import Navbar from "../components/Navbar";
import "../app/globals.css";
import CarouselComponent from "@/components/carousel";
import PodcastCards from "@/components/cards";

export default function Dashboard() {
  return (
    <div className="bg-zinc-700 font-sans-serif">
      <div>
      <Navbar/>
      </div>
      
      <div>
        <CarouselComponent/>
      </div>
      <div>
        <PodcastCards/>
      </div>
      
    </div>
      
    
   );
}
