
import { Button } from "@/components/ui/button";
import {useState} from 'react';
import Modal from "./Modal";
import logo from '../assets/logoretreat.png'
import loading from '../assets/loading.gif';
import { useNavigate } from "react-router-dom";
export function Hero() {
  const [isAIOpen, setIsAIOpen]= useState(false);
  const [loadingAI, setLoadingAI]= useState(false);
  const [isHomeOpen, setIsHomeOpen]= useState(false);
  const [isShopOpen, setIsShopOpen]= useState(false);
  const navigate=useNavigate()

  const pic="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/download.gif?alt=media&token=535e9111-7cfb-492b-af8b-e128b41472e5"
  const askai =()=>{
    setIsAIOpen(true);
  }
  const mentors =()=>{
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
    <div className="relative h-[90vh] min-h-[800px] w-full overflow-hidden">
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
              <center><img src={logo} className="justify-center" style={{width:'150px', height:'150px'}}/></center>
              <center><h1 className="text-2xl md:text-2xl sm:text-2xl md:pt-6 lg:text-5xl font-serif font-bold tracking-tight text-white justify-center mb-6">
                Retreat. Reset. Restart.
              </h1></center>
                <center>
              <div className="flex flex-col justify-center sm:flex-row gap-4">
                <Button className=" bg-transparent text-white border-white border-2 border-radius hover:bg-white hover:text-lime-700
                  font-medium text-base px-8 py-6" onClick={mentors}>
                 Mentors
                </Button>
                <Button className=" bg-transparent text-white border-white border-2 border-radius hover:bg-white hover:text-lime-700
                   font-medium text-base px-8 py-6" onClick={shop}>
                  Shop
                </Button>
                
                <Button  className="bg-transparent text-white border-white border-2 border-radius
                  hover:bg-white hover:text-lime-700  font-medium text-base px-8 py-6" onClick={askai}>
                 AI Retreat Match
                </Button>
               
              </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
