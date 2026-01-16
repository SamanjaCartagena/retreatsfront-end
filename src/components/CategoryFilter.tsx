
import { useState } from "react";
import { categories } from "../data/retreats";
import { Home, MapPin, Star, Users, Calendar, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface CategoryFilterProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export function CategoryFilter({ onSelectCategory, selectedCategory }: CategoryFilterProps) {
  // ... inside your component
 

  const iconMapping = {
    home: <Home size={18} />,
    "map-pin": <MapPin size={18} />,
    star: <Star size={18} />,
    users: <Users size={18} />,
    calendar: <Calendar size={18} />,
    bed: <Bed size={18} />,
  };
 
 
  return (
    <div className="w-screen flex overflow-x-auto py-6 justify-center  gap-4 px-4 md:px-6">
         
      <div className="md:flex bg-white justify-center items-center w-full max-w-xs rounded-full border px-6 py-1.5 items-center shadow-sm max-w-sm hover:shadow-md transition-all">
        
          <Input
            type="text"
            placeholder="Search destinations, retreats..."
            className="border-0 w-full focus-visible:ring-0 focus-visible:ring-offset-0 px-0 justify-center items-center text-center w-full "
          /><br/>
          


          <Button variant="default" size="sm" className="rounded-full bg-lime-700 hover:bg-lime-600 gap-2">
            Search
          </Button>
          
      
        </div>
      
        <br/>
   
    </div>
  );
}
