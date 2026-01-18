
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { RetreatCard } from "@/components/RetreatCard";
import { FeaturedDestinations } from "@/components/Destinations";
import { Newsletter } from "@/components/Newsletter";
import { retreats } from "@/data/retreats";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRetreats = retreats.filter((retreat) => {
    // Filter by category
    if (selectedCategory !== "All" && !retreat.categories.includes(selectedCategory)) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        retreat.title.toLowerCase().includes(query) ||
        retreat.location.toLowerCase().includes(query) ||
        retreat.country.toLowerCase().includes(query) ||
        retreat.categories.some(category => category.toLowerCase().includes(query))
      );
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
       
          
        <RetreatCard />
{/**         <div className="container py-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">
            {selectedCategory === "All" 
              ? "Featured Retreats" 
              : `${selectedCategory} Retreats`}
          </h2>
          {filteredRetreats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredRetreats.map((retreat) => (
                <RetreatCard key={retreat.id} retreat={retreat} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No retreats found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search for different terms.
              </p>
            </div>
          )}
        </div>
        **/}
        
        <FeaturedDestinations />
        <Newsletter />
      </main>
    </div>
  );
};

export default Index;
