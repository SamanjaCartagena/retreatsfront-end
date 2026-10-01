
import { Button } from "@/components/ui/button";
import {useState} from 'react';
import Modal from "./Modal";
import logo from '../assets/logoretreat.png'
import { useNavigate } from "react-router-dom";
import waves from '../assets/waves.mp4'
import retreats from '../assets/retreats.png'
import './Hero.css'
export function Hero() {
  const [isAIOpen, setIsAIOpen]= useState(false);
  const [loadingAI, setLoadingAI]= useState(false);
  const [isHomeOpen, setIsHomeOpen]= useState(false);
  const [isShopOpen, setIsShopOpen]= useState(false);
  const navigate=useNavigate()

  const jobs =() => {
    navigate('jobs')
    
  }

  const askai =()=>{
    setIsAIOpen(true);
  }
  const homes =()=>{
    navigate('/retreatcenters')
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
        <div className="flex flex-col w-120 h-100 items-center justify-center">
          <center>
            <h3 className="text-xl font-bold mb-4">Coming Soon! Our AI Retreat Match is in development and will be available shortly.</h3>
          </center>
          </div>
        </Modal> 
        <Modal isOpen={isHomeOpen} onClose={closeHomes} >
        <div className="flex flex-col w-120 h-100 items-center justify-center">
          <center>
            <h3 className="text-xl font-bold mb-4">Coming Soon!</h3>
          </center>
          </div>
        </Modal> 
        <Modal isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} >
        <div className="flex flex-col w-120 h-100 items-center justify-center">
          <center>
            <h3 className="text-xl font-bold mb-4">Coming Soon!</h3>
          </center>
          </div>
        </Modal> 

      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover" poster="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/poster.png?alt=media&token=cdfaab19-72ce-4859-96a4-583bef3935ec">
        <source src={waves} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div 
        className="absolute inset-0 bg-cover bg-center shadow-md shadow-white/4" 
        style={{ backgroundImage: `url(${waves})` }}
      >
      
        <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="animate-fade-in">
              <center><img id="logoImage" src={logo} className="justify-center" style={{width:'150px', height:'150px'}}/></center>
              <center><h1 id="msg3" className="text-2xl md:text-2xl sm:text-2xl md:pt-6 lg:text-5xl font-serif  font-bold tracking-tight text-white justify-center mb-6">
                Retreat. Reset. Restart.
              </h1></center>
                <center>
              <div className="flex flex-col justify-center mt-6 sm:flex-row gap-4">
                <Button className=" bg-transparent text-white w-60  justify-center border-white border-2 border-radius hover:bg-white hover:text-lime-700
                  font-medium text-base px-8 py-6" onClick={homes}>
                Sanctuaries
                </Button>
                <Button className=" bg-transparent text-white w-60 justify-center border-white border-2 border-radius hover:bg-white hover:text-lime-700
                   font-medium text-base px-8 py-6" onClick={shop}>
                  Shop
                </Button>
                
                <Button  className="bg-transparent text-white w-60 justify-center border-white border-2 border-radius
                  hover:bg-white hover:text-lime-700  font-medium text-base px-8 py-6" onClick={jobs}>
                 Jobs
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
