
import { Button } from "@/components/ui/button";
import {useState} from 'react';
import pic from '../assets/retreats.png';
import Modal from "./Modal";
import loading from '../assets/loading.gif';
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
export function Hero() {
  const [isAIOpen, setIsAIOpen]= useState(false);
  const [loadingAI, setLoadingAI]= useState(false);
  const [isHomeOpen, setIsHomeOpen]= useState(false);
  const [isShopOpen, setIsShopOpen]= useState(false);
  const navigate=useNavigate()
  const askai =()=>{
    setIsAIOpen(true);
  }
  const homes =()=>{
    setIsHomeOpen(true);
  }
 const closeAI =() => {
    setIsAIOpen(false);
    setLoadingAI (false);
 }
 const closeHomes =() => {
    setIsHomeOpen(false);
 }
 const shop =()=>{
  setIsShopOpen(true);
 }
const submitAI =() => {
  // Handle AI submission logic here
  setLoadingAI(true);
  // Simulate loading time
  
}
  return (
    <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
      <Modal isOpen={isAIOpen} onClose={closeAI} >
        <div className="flex flex-col items-center justify-center h-full">
          <center>
            <h3 className="text-xl font-bold mb-4">Coming Soon! Our AI Retreat Match is in development and will be available shortly.</h3>
          </center>
          </div>
        </Modal> 
        <Modal isOpen={isHomeOpen} onClose={closeHomes} >
        <div className="flex flex-col items-center justify-center h-full">
          <center>
            <h3 className="text-xl font-bold mb-4">Coming Soon!</h3>
          </center>
          </div>
        </Modal> 
        <Modal isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} >
        <div className="flex flex-col items-center justify-center h-full">
          <center>
            <h3 className="text-xl font-bold mb-4">Coming Soon!</h3>
          </center>
          </div>
        </Modal> 

      
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pic})` }}
      >
      
        <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="animate-fade-in">
              <h1 className="text-2xl md:text-2xl sm:text-2xl md:pt-6 lg:text-5xl font-serif font-bold tracking-tight text-white mb-6">
                Transform Your Mind with a Retreat.
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Your next breakthrough is unlikely to happen at your desk.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white hover:bg-white text-retreat-forest
                  hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={homes}>
                  Homes 
                </Button>
                <Button className="bg-white hover:bg-white text-retreat-forest
                  hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={shop}>
                  Shop
                </Button>
                
                <Button  className="bg-lime-900 text-white 
                  hover:bg-white hover:text-lime-700 font-medium text-base px-8 py-6" onClick={askai}>
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
