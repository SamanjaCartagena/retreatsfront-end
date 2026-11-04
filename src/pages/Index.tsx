
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { RetreatCard } from "@/components/retreats/RetreatCard";
import { FeaturedDestinations } from "@/components/Destinations";
import { FeaturedCenters} from "@/components/centers/CenterDisplay";
import { FeaturedGuides } from "@/components/guides/FeaturedGuides";
import { Separator } from "@/components/ui/separator";
import Contact from "@/components/contact/Contact";
const Index = () => {
 



  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <main className="flex-1">
        <Hero />
       
          
        <RetreatCard />
       <FeaturedCenters/>
       <FeaturedGuides/>
        <FeaturedDestinations />
        <Contact/>
      </main>
    </div>
  );
};

export default Index;
