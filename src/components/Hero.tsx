
import { Button } from "@/components/ui/button";
import {useState} from 'react';
import pic from '../assets/retreats.png';
import ModalAI from "./ModalAI";
import loading from '../assets/loading.gif';
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
export function Hero() {
  const [isAIOpen, setIsAIOpen]= useState(false);
  const [loadingAI, setLoadingAI]= useState(false);
  const navigate=useNavigate()
  const askai =()=>{
    setIsAIOpen(true);
  }
 const closeAI =() => {
    setIsAIOpen(false);
    setLoadingAI (false);
 }
 const host=()=>{
  navigate('/host')
 }
const submitAI =() => {
  // Handle AI submission logic here
  setLoadingAI(true);
  // Simulate loading time
  
}
  return (
    <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
      <ModalAI isOpen={isAIOpen} onClose={closeAI} >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">AI Retreat Match</h2>
          <p className="mb-4">Answer a few questions to find your perfect retreat match!</p>
          <textarea
            className="w-full h-64 p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Explain what you are looking for in the perfect retreat..."
          ></textarea>
          {/* Add your AI matching form or content here */}
          {loadingAI && <div className="grid justify-center items-center mb-4">
            <h2>Loading...</h2><br/>
            <img src={loading} alt="Loading..." style={{width:'50px', height:'50px'}}/>
          </div>}
          <Button onClick={submitAI} className="bg-retreat-forest text-white hover:bg-retreat-cream hover:text-retreat-forest mb-4 mr-4">
            Submit
          </Button>
          <Button onClick={closeAI} className="bg-retreat-forest text-white hover:bg-retreat-cream hover:text-retreat-forest">
            Close
          </Button>
        </div>
        </ModalAI> 

      
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pic})` }}
      >
      
        <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl sm:text-2xl md:pt-6 lg:text-6xl font-serif font-bold tracking-tight text-white mb-6">
                Transform Your Mind with a Retreat.
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Mind Reset Travel Company 
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={host}>
                  Meet Our Hosts
                </Button>
                <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6">
                  Retreat Planners
                </Button>
                <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={askai}>
                 AI Retreat Match
                </Button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
