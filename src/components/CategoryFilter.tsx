
import { useState } from "react";
import { categories } from "../data/retreats";
import { Home, MapPin, Star, Users, Calendar, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export function CategoryFilter({ onSelectCategory, selectedCategory }: CategoryFilterProps) {
  const iconMapping = {
    home: <Home size={18} />,
    "map-pin": <MapPin size={18} />,
    star: <Star size={18} />,
    users: <Users size={18} />,
    calendar: <Calendar size={18} />,
    bed: <Bed size={18} />,
  };

  return (
    <div className="w-full overflow-x-auto py-6">
      <div className="flex items-center gap-3 px-4 md:px-6">
        {categories.map((category) => (
          <Button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            variant={selectedCategory === category.name ? "default" : "outline"}
            className={`category-badge flex items-center gap-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category.name 
                ? "bg-retreat-sage hover:bg-retreat-forest" 
                : "border-retreat-stone/20 hover:border-retreat-sage"
            }`}
          >
            {iconMapping[category.icon as keyof typeof iconMapping]}
            <span>{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
