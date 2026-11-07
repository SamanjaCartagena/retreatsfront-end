import { featuredEvents} from "../../data/events";
import { Card, CardContent } from "@/components/ui/card";
import {Button} from '../ui/button'
import { useNavigate } from "react-router-dom";
export function FeaturedEvents() {
  const navigate=useNavigate()
  const admin =()=>{
    navigate('/guides')
  }
  return (
    <div className=" py-12">
      <div className="flex container justify-between items-center ">
        <center>
        <h2 className="text-xl mb-6 text-lime-900 justify-center align-center font-serif font-semibold">
          Featured Events
                  </h2></center>
        <a href="#" className="text-retreat-ocean  hover:text-retreat-forest transition-colors font-medium" onClick={() => window.open("https://retreatsaroundtheworld.net/retreatcenters", "_blank")}>
          View all
        </a>
      </div>
      <div className="w-full sm:grid-cols-1 lg:flex justify-center ">
        {featuredEvents.map((guide, index) => (
          <div>
          <Card key={index} className="rounded-xl m-2 overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer" >
            <div className="relative h-70">
              <h2><strong>{guide.owner}</strong>&nbsp;|&nbsp;{guide.name}</h2>
              <video src={guide.image} controls width="350" height="450" className="h-md w-full max-w-md mx-auto rounded-lg  mx-auto" autoPlay muted loop>
                                                 Your browser does not support the video tag.
                                                     </video>  
               

            
             
            </div>
            

          </Card>
          
          </div>
        ))}
      </div>
            <div className="container justify-center w-full">

      
      <p className="mt-8 w-full">Host an event with our guides</p>
      <Button className="mt-4 justify-center align-center" onClick={admin}>Hire our Guides</Button>
    </div>
    </div>
  );
}
