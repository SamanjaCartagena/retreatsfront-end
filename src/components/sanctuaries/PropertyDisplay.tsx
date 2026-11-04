import { featuredProperties } from "../../data/properties";
import { Card, CardContent } from "@/components/ui/card";
import {Button} from '../ui/button'
import { useNavigate } from "react-router-dom";
export function FeaturedProperties() {
  const navigate=useNavigate()
  const admin =()=>{
    navigate('/adminpage')
  }
  
  return (
    <div className=" py-12">
      <div className="flex container justify-between items-center ">
        <center>
        <h2 className="text-xl mb-6 text-black justify-center align-center font-serif font-semibold">
          Start a new life anywhere in the world with a property/job or a business.
                  </h2></center>
       
      </div>
      <div className="w-full sm:grid-cols-1 lg:flex justify-center ">
        {featuredProperties.map((destination, index) => (
          <div>
          <Card key={index} className="rounded-xl m-2 overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer" >
            <div className="relative h-60">
              <h2 className="text-lg font-bold p-2">{destination.name}</h2>
              <video src={destination.image} controls width="350" height="450" className="h-md w-full max-w-md mx-auto rounded-lg  mx-auto" autoPlay muted loop>
                                                 Your browser does not support the video tag.
                                                     </video>  

            
             
            </div>
            

          </Card>
          
          </div>
        ))}
      </div>
            <div className="container justify-center w-full">

      <h2 className="text-2xl mt-10 w-full">Sign up your Retreat Venue</h2>
      
      <p className="mt-8 w-full">Do you own or manage a venue, Airbnb, retreat center, boutique hotel, resort, or other unique property that would be perfect for retreats and group experiences? Add your property to Retreats Around The World and connect with retreat leaders, event organizers, wellness professionals, and travelers searching for inspiring places around the world.</p>
      <Button className="mt-4 justify-center align-center bg-lime-800 hover:bg-lime-700 text-white m-2" onClick={admin}>Sign up as a Host to Add</Button>

    </div>
    </div>
  );
}
