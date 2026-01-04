
import { featuredDestinations } from "../data/retreats";
import { Card, CardContent } from "@/components/ui/card";

export function FeaturedDestinations() {
  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold">
          Flight Deals
                  </h2>
        <a href="#" className="text-retreat-ocean hover:text-retreat-forest transition-colors font-medium">
          View all
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredDestinations.map((destination, index) => (
          <Card key={index} className="rounded-xl overflow-hidden border-none shadow-sm hover:shadow-md transition-all" >
            <div className="relative h-60">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end">
                <CardContent className="p-4 text-white">
                  <h3 className="font-serif text-xl font-medium mb-1">{destination.name}</h3>
                  <p className="text-sm text-white/80">{destination.count} retreats</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
