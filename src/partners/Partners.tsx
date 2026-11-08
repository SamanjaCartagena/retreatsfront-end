import { featuredPartners } from "../data/partners";
import { Card, CardContent } from "@/components/ui/card";
import {Button} from '../components/ui/button'
import { useNavigate } from "react-router-dom";
export function Partners() {
  const navigate=useNavigate()
  const admin =()=>{
    navigate('/adminpage')
  }
  return (
    <div className=" py-12">
      <div className="flex container justify-between items-center ">
        <center>
        <h2 className="text-xl mb-6 text-lime-900 justify-center align-center font-serif font-semibold">
          Our Partners
                  </h2></center>
        <a href="#" className="text-retreat-ocean  hover:text-retreat-forest transition-colors font-medium" onClick={() => window.open("https://retreatsaroundtheworld.net/retreatcenters", "_blank")}>
          View all
        </a>
      </div>
      <div className="w-full sm:grid-cols-1 lg:flex justify-center ">
        {featuredPartners.map((guide, index) => (
          <div>
            <a href={guide.url} target="_blank">
          <Card key={index} className="rounded-xl h-auto m-2 overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer" >
            <div className="relative h-60">
              <h2>{guide.name}</h2>
              <img src={guide.image} className="w-75 h-70 mt-5 rounded justify-center object-cover cursor-pointer"/>
             

            
             
            </div>
            

          </Card>
          </a>
          
          </div>
        ))}
      </div>
            <div className="container justify-center w-full">

      <h2 className="text-4xl mt-10 w-full">Select the right guide for your retreat</h2>
      
      <p className="mt-8 w-full">Do you need a mentor or a healer for your transformation? A compassionate massage therapist, a life coach or a plant based chef?</p>
      <Button className="mt-4 justify-center align-center" onClick={admin}>Sign up as a Guest</Button>
    </div>
    </div>
  );
}
