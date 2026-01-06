
import { useState } from "react";
import { categories } from "../data/retreats";
import { Home, MapPin, Star, Users, Calendar, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchModal from "./searchmodal/SearchModal";
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
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const closeModal = () => {
    setIsSearchModalOpen(false);
  }
  const datefilter = () => {
    setIsSearchModalOpen(true);
  }
  return (
    <div className="w-full overflow-x-auto py-6 justify-center flex gap-4 px-4 md:px-6">
            <SearchModal isOpen={isSearchModalOpen} onClose={closeModal}>
          <div style={{width:'100%',}} className="justify-center items-center text-center p-4 bold text-lg">
                Date Filter
            </div>
            </SearchModal>
      <div className="md:flex bg-white justify-center items-center  rounded-full border px-4 py-1.5 items-center shadow-sm max-w-sm hover:shadow-md transition-all">
          <Input
            type="text"
            placeholder="Search destinations, retreats..."
            className="border-0 w-full focus-visible:ring-0 focus-visible:ring-offset-0 px-0 justify-center items-center text-center"
          /><br/>
          <Button variant="default" size="sm" className="rounded-full bg-lime-700 hover:bg-lime-600 gap-2 ml-4" onClick={datefilter}>
            Date
          </Button>
          <Button variant="default" size="sm" className="rounded-full bg-lime-700 hover:bg-lime-600 gap-2">
            Search
          </Button>
          
        </div>

        <br/>
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
