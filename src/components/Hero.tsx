
import { Button } from "@/components/ui/button";
import {useState} from 'react';
import ModalSignUp from "./ModalSignUp";
export function Hero() {
  const [isAIOpen, setIsAIOpen]= useState(false);
  const askai =()=>{
    setIsAIOpen(true);
  }
 const closeAI =() => {
    setIsAIOpen(false);
 }

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517022812141-23620dba5c23')" }}
      >
        {
          isAIOpen && <ModalSignUp isOpen={isAIOpen} onClose={closeAI} >

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Ask AI</h2>
              <p className="text-lg mb-4">What kind of retreat would you like to attend?</p>
              <select className="w-full p-2 border border-gray-300 rounded mb-4">
                 <option value="yoga">Yoga Retreat</option>
                                  <option value="meditation">Meditation Retreat</option>
                                  <option value="wellness">Creative Retreat</option>
                                  <option value="fitness">Fitness Retreat</option>
                                  <option value="adventure">Adventure Retreat</option>
                                  <option value="cultural">Cultural Retreat</option>
                                  <option value="voodoo">Voodoo Retreat</option>
                                  <option value="sound">Sound Healing Retreat</option>
                                  <option value="art">Art Retreat</option>
                                  <option value="writing">Writing Retreat</option>
                                  <option value="hiking">Hiking Retreat</option>
                                  <option value="cooking">Cooking Retreat</option>
                                  <option value="christian">Christian Retreat</option>


                </select>
                <p className="text-lg mb-4">Which country would you like to go to?</p>
              <select className="w-full p-2 border border-gray-300 rounded mb-4">
                 <option value="yoga">Australia</option>

                </select>
                <input type="text" placeholder="What is your budget?" className="w-full p-2 border border-gray-300 rounded mb-4" />
                                <input type="text" placeholder="Which month do you want to go on a retreat" className="w-full p-2 border border-gray-300 rounded mb-4" />

              <Button onClick={closeAI}>Submit</Button>
            </div>
          </ModalSignUp>
        }
        <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white mb-6">
                Discover transformative retreat experiences worldwide
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                Immerse yourself in curated retreats that nourish mind, body, and spirit in the world's most inspiring locations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6">
                  Explore Retreats
                </Button>
                <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6">
                  Host a Retreat
                </Button>
                <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={askai}>
                  Ask AI
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
