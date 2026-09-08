import { featuredCenters } from "../../data/centers";
import { Card, CardContent } from "@/components/ui/card";
import {Button} from '../ui/button'
export function FeaturedCenters() {
  return (
    <div className=" py-12">
      <div className="flex container justify-between items-center ">
        <center>
        <h2 className="text-xl mb-6 text-lime-900 justify-center align-center font-serif font-semibold">
          Retreat Centers Around The World
                  </h2></center>
        <a href="#" className="text-retreat-ocean  hover:text-retreat-forest transition-colors font-medium" onClick={() => window.open("https://retreatsaroundtheworld.net/retreatcenters", "_blank")}>
          View all
        </a>
      </div>
      <div className="w-full flex grid-cols-1 sm:grid-cols-1 lg:grid-cols-6 justify-center ">
        {featuredCenters.map((destination, index) => (
          <Card key={index} className="rounded-xl m-2 overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer" onClick={()=>window.open(destination.url, "_blank")}>
            <div className="relative h-60">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-70 h-full object-cover"
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
            <div className="container justify-center w-full">

      <h2 className="text-4xl mt-10 w-full">Sign up your Retreat Venue</h2>
      
      <p className="mt-8 w-full">Do you own or manage a venue, Airbnb, retreat center, boutique hotel, resort, or other unique property that would be perfect for retreats and group experiences? Add your property to Retreats Around The World and connect with retreat leaders, event organizers, wellness professionals, and travelers searching for inspiring places around the world. Creating a listing allows you to showcase your property, accommodations, amenities, location, photos, and the types of retreats or events you can host. Whether your space is designed for yoga retreats, wellness getaways, corporate gatherings, spiritual experiences, workshops, or private group stays, Retreats Around The World can help more people discover what makes your property special.</p>
      <Button className="mt-4 justify-center align-center">Sign up as a Host to Add</Button>
    </div>
    </div>
  );
}
