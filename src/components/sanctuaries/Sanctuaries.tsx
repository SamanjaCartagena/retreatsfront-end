import React from 'react'
import {FeaturedProperties} from './PropertyDisplay'
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Transformation from '../contact/Transformation'

function Sanctuaries() {
  const navigate=useNavigate()
  const center =()=>{
    navigate('/retreatcenters')
  }
  const vid = "https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/village.jpg?alt=media&token=fa2ff5a5-fdf6-44bf-a939-cc4e26f42a2c"
  return (
    <div>
    <div className="relative h-auto min-h-auto w-full overflow-hidden">

      <div className="flex flex-col w-full h-[500px] min-h-[500px] items-center justify-center">
         <div 
        className="absolute inset-0 bg-cover bg-center shadow-md shadow-white/4" 
        style={{ backgroundImage: `url(${vid})` }}
      >
        <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="animate-fade-in">
              <center><h1 id="msg3" className="text-2xl md:text-2xl sm:text-2xl md:pt-6 lg:text-5xl font-serif  font-bold tracking-tight text-white justify-center m-2 ">
                Buy a Sanctuary
              </h1></center>
               <div className="flex flex-col justify-center mt-6 sm:flex-row items-center gap-4">
                <Button className=" bg-transparent text-white w-60  justify-center border-white border-2 border-radius hover:bg-white hover:text-lime-700
                  font-medium text-base px-8 py-6" onClick={center}>
                Book a Retreat Center 
                </Button>
                </div>
               
            </div>
           
          </div>
        </div>
      </div>
    

    </div>
    </div>
    <FeaturedProperties/>
    <Transformation/>
    </div>
    
  )
}

export default Sanctuaries