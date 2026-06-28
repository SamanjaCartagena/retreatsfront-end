
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { RetreatCard } from "@/components/retreats/RetreatCard";
import { FeaturedDestinations } from "@/components/Destinations";
import { Newsletter } from "@/components/Newsletter";
import { Separator } from "@/components/ui/separator";

const Index = () => {
 



  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
       
          
        <RetreatCard />

       
        
        <FeaturedDestinations />
        <Newsletter />
      </main>
    </div>
  );
};

export default Index;
