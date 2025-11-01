
import { Hero } from "@/components/hero/Hero";
import { PopularLocations } from "@/components/popular-locations/PopularLocations";
import sea from '../../public/assets/sea.jpg';
import hotel_image from '../../public/assets/hr_10.jpg'
import BestHoltels from "@/components/best-holtels/BestHoltels";

export default function Home() {
  return (
    <>
      <Hero 
      image={sea} 
      mainHeader="Are you ready for adventure?" 
      secondaryHeader="Browse throught the popular lacation." 
      />
      <PopularLocations />
      <Hero 
        image={hotel_image} 
        mainHeader="Get the best offer for your hotel!?" 
        secondaryHeader="Pick your desired place." 
      />
      <BestHoltels />
    </>
  );
}
