
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { RetreatCard } from "@/components/retreats/RetreatCard";
import { FeaturedDestinations } from "@/components/Destinations";
import { FeaturedCenters} from "@/components/centers/CenterDisplay";
import { Separator } from "@/components/ui/separator";
import Founder from '@/components/admin/Founder'

const Index = () => {
 



  return (
    <div className="min-h-screen flex flex-col bg-black opacity-90 text-white">
      <main className="flex-1">
        <Hero />
       
          
        <RetreatCard />

       <FeaturedCenters/>
        <Founder/>
        <FeaturedDestinations />
      </main>
    </div>
  );
};

export default Index;
