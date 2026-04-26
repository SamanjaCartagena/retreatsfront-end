import React, {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button";
import pic from '../assets/bozeman.jpg';
import ModalAI from "./ModalAI";
import loading from '../assets/loading.gif';
import { useNavigate } from "react-router-dom"; 

function GuideSignUp() {
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
    
  return (
     <>
     <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
      
      
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pic})` }}
      >
      
        <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl sm:text-2xl md:pt-6 lg:text-6xl font-serif font-bold tracking-tight text-white mb-6">
                Help hosts create unforgettable experiences. 
              </h1>
             
             

              <p className="text-xl text-white/90 mb-8 max-w-2xl">
               Set out on a journey to Heal, Renew and Transform someone. 
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={()=> setIsPurpose(true)}>
                 Chefs
                </Button>
                <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6">
                 Yoga Teachers
                </Button>
                <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6">
                 Tourist Guides
                </Button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
   
        <div className="justify-center items-center grid h-auto">
           Create a host Profile
        <div className="max-w-xl">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <br/>
    <div className="mb-4">
       <label className="block text-gray-700 text-sm font-bold mb-2" >
        First Name
      </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" />
            <br/>
            <br/>
          
        <label className="block text-gray-700 text-sm font-bold mb-2" >
        Last Name
      </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Last Name" />
      <br/><br/>
     <label className="block text-gray-700 text-sm font-bold mb-2" >
        Tell us something about yourself
      </label>
                   <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="introduction" placeholder="Tell us something about yourself"></textarea>
         <br/><br/>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Username
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
      <br/><br/>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Email
      </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
     <br/><br/>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Create Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Confirm Password
      </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
       <label className="block text-gray-700 text-sm font-bold mb-2" >
       What kind of retreats will you be hosting? Check all that apply.</label>
      <br/>
      <input type="checkbox" id="veganretreat" />
      <label >&nbsp;Vegan Retreat</label>
      <br/>
      <input type="checkbox" id="hypnoretreat" />
      <label  >&nbsp;Hypnotherapy</label>
      <br/>
      <input type="checkbox" id="meditationretreat" />
      <label >&nbsp;Meditation Retreat</label><br/>
      <input type="checkbox" id="corporateretreat" />
      <label >&nbsp;Corporate Retreat</label><br/>
      <input type="checkbox" id="healthretreat" />
      
      <label >&nbsp;Health Retreat</label>
      <br/>
         <input type="checkbox" id="yogaretreat" />
      
      <label >&nbsp;Yoga Retreat</label>
      <br/>
        <input type="checkbox" id="recreationretreat" />
      
      <label>&nbsp;Recreation Retreat</label>
      <br/>
      <input type="checkbox" id="others" />
            <label >&nbsp;Others</label>
            <br/>
            <br/>
                   <label className="block text-gray-700 text-sm font-bold mb-2" >
            What kind of Retreats will you be hosting in details?...</label>
                   <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="details" placeholder="Tell us in details what kind of retreats you would love to host....." ></textarea>
       </div>

    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >
        Create a Profile
      </button>
     
     </div>
      
      <br/>
      
  </form>
  <p className="text-center text-gray-500 text-xs">
    &copy;2025 World of Bots LLC. All rights reserved.
  </p>
  </div>
</div>  
    
    </>
  )
}

export default GuideSignUp