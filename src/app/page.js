import { BestHoltels } from "@/components/best-holtels/BestHoltels";
import { Hero } from "@/components/hero/Hero";
import { PopularLocations } from "@/components/popular-locations/PopularLocations";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Hero />
    <PopularLocations />
    <Hero />
    <BestHoltels />
    </>
  );
}