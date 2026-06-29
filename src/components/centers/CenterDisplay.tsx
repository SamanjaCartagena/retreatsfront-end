import { featuredCenters } from "../../data/centers";
import { Card, CardContent } from "@/components/ui/card";
import Marquee from "react-fast-marquee";
export function FeaturedCenters() {
  return (
    <div className=" py-12">
      <div className="flex container justify-between items-center ">
        <center>
        <h2 className="text-2xl mb-6 text-lime-900 justify-center align-center font-serif font-semibold">
          Retreat Centers Around The World
                  </h2></center>
        <a href="#" className="text-retreat-ocean  hover:text-retreat-forest transition-colors font-medium" onClick={() => window.open("https://retreatsaroundtheworld.net/retreatcenters", "_blank")}>
          View all
        </a>
      </div>
      <Marquee gradientWidth={300} gradientColor="white">
      <div className="w-full flex grid-cols-1 sm:grid-cols-1 lg:grid-cols-6 ">
        {featuredCenters.map((destination, index) => (
          <Card key={index} className="rounded-xl m-2 overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer" onClick={()=>window.open(destination.url, "_blank")}>
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
