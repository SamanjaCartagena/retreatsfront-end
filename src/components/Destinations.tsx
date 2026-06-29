
import { featuredDestinations } from "../data/retreats";
import { Card, CardContent } from "@/components/ui/card";
import Marquee from "react-fast-marquee";

export function FeaturedDestinations() {
  return (
    <div className="py-12">
      <div className="container flex justify-between items-center mb-8">
        <h2 className="text-2xl text-lime-900 justify-center align-center font-serif font-semibold">
          Flight Deals
                  </h2>
        <a href="#" className="text-retreat-ocean hover:text-retreat-forest transition-colors font-medium" onClick={() => window.open("/airlines", "_blank")}>
          View all
        </a>
      </div>
      <Marquee gradientWidth={300} gradientColor="white" direction="right">
               <div className="w-full flex grid-cols-1 sm:grid-cols-1 lg:grid-cols-6 ">

        {featuredDestinations.map((destination, index) => (
          <Card key={index} className="rounded-xl overflow-hidden border-none shadow-sm hover:shadow-md m-2 transition-all cursor-pointer" onClick={()=>window.open(destination.url, "_blank")}>
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
      </Marquee>
    </div>
  );
}
