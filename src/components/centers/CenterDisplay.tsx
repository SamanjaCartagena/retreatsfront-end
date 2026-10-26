import { featuredCenters } from "../../data/centers";
import { Card, CardContent } from "@/components/ui/card";
import {Button} from '../ui/button'
import { useNavigate } from "react-router-dom";
export function FeaturedCenters() {
  const navigate=useNavigate()
  const admin =()=>{
    navigate('/adminpage')
  }
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
      <div className="w-full sm:grid-cols-1 lg:flex justify-center ">
        {featuredCenters.map((destination, index) => (
          <div>
          <Card key={index} className="rounded-xl m-2 overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer" >
            <div className="relative h-60">
              <h2>{destination.name}</h2>
              <video src={destination.image} controls width="350" height="450" className="h-md w-full max-w-md mx-auto rounded-lg  mx-auto" autoPlay muted loop>
                                                 Your browser does not support the video tag.
                                                     </video>  

            
             
            </div>
            

          </Card>
          <a href="" className="underline text-md m-4">Check it out</a>
          </div>
        ))}
      </div>
            <div className="container justify-center w-full">

      <h2 className="text-4xl mt-10 w-full">Sign up your Retreat Venue</h2>
      
      <p className="mt-8 w-full">Do you own or manage a venue, Airbnb, retreat center, boutique hotel, resort, or other unique property that would be perfect for retreats and group experiences? Add your property to Retreats Around The World and connect with retreat leaders, event organizers, wellness professionals, and travelers searching for inspiring places around the world. Creating a listing allows you to showcase your property, accommodations, amenities, location, photos, and the types of retreats or events you can host. Whether your space is designed for yoga retreats, wellness getaways, corporate gatherings, spiritual experiences, workshops, or private group stays, Retreats Around The World can help more people discover what makes your property special.</p>
      <Button className="mt-4 justify-center align-center" onClick={admin}>Sign up as a Host to Add</Button>
    </div>
    </div>
  );
}
