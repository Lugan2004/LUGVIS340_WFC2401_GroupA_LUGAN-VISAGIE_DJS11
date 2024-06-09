import Navbar from "../components/Navbar";
import "../app/globals.css";
import CarouselComponent from "@/components/carousel";
import Filter from "@/components/filter";

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
        <Filter/>
      </div>
      
    </div>
      
    
   );
}
