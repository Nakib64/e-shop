import Image from "next/image";
import Link from "next/link";
import HeroSwiper from "./components/Hero";
import LatestProducts from "./components/Latest";
import AboutPage from "./components/About";

export default function Home() {
  return (
    
    <div className="max-w-7xl mx-auto flex gap-6 flex-col mt-6">
      <HeroSwiper></HeroSwiper>
      <main className="flex flex-col gap-6">
        <LatestProducts></LatestProducts>
        <AboutPage></AboutPage>
      </main>
      
    </div>
  );
}
