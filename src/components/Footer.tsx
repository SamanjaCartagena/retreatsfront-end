
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import ModalCancellation from './ModalCancellation';
import { Newsletter } from './Newsletter';
import Modal from './Modal';
import { GoogleGenAI } from "@google/genai";
import { Button } from './ui/button';
import { Input } from './ui/input';


export function Footer() {
  const [openCancellationModal, setOpenCancellationModal] = useState(false);
  const [openTypesModal, setOpenTypesModal] = useState(false);
  const [openSafetyModal, setOpenSafetyModal] = useState(false);
  const [safetyInfo, setSafetyInfo] = useState('');
  const [inputSafety, setInputSafety] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const closeSafetyModal = () => {
    setOpenSafetyModal(false);
    setSafetyInfo('');
    setIsLoading(false);
    setInputSafety('');
  }
   const openSafety=  async()=> {
    setIsLoading(true);
  const ai = new GoogleGenAI({
  apiKey: "AIzaSyAMMNnVEv4RLa3S9SE5UVmub1Dfx5gS6ZY",}); 

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `Explain in a few sentences if the following place is safe for women: ${inputSafety}`,
});
setIsLoading(false);
console.log(response.text);
setSafetyInfo(response.text);
   
  }
     const travelSafety=  async()=> {
    setIsLoading(true);
  const ai = new GoogleGenAI({
  apiKey: "AIzaSyAMMNnVEv4RLa3S9SE5UVmub1Dfx5gS6ZY",}); 

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `Explain in a few sentences if the following place is safe for traveling with family and kids: ${inputSafety}`,
});
setIsLoading(false);
console.log(response.text);
setSafetyInfo(response.text);
   
  }
   const foodSafety=  async()=> {
    setIsLoading(true);
  const ai = new GoogleGenAI({
  apiKey: "AIzaSyAMMNnVEv4RLa3S9SE5UVmub1Dfx5gS6ZY",}); 

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `Explain in a few sentences if the following place have good food safety and hygiene practices: ${inputSafety}`,
});
setIsLoading(false);
console.log(response.text);
setSafetyInfo(response.text);
   
  }

  const openCancel = () => {
    setOpenCancellationModal(true);
  };
  const openTypes = () => {
    setOpenTypesModal(true);
  };
  return (
    <div>
      <Newsletter/>
    <footer className="bg-white border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          
          
            <Modal isOpen={openSafetyModal} onClose={closeSafetyModal}>
              <div className="w-250 h-120 mt-22">
                <br/>
                <br/>
                <h2 className="text-xl font-semibold mb-4">Safety Information</h2>
                <p className="text-sm text-muted-foreground">
                  <strong>We prioritize your safety and well-being during your retreat experience.</strong><br/><br/></p>
                  <Input placeholder="Enter a location" className="w-60 mb-4" onChange={(e) => setInputSafety(e.target.value)} />

                <Button className="bg-lime-700 hover:bg-lime-800 w-60 text-white rounded-md" onClick={openSafety}>
                  Women's Safety
                </Button>
                <br/>
                <br/>
                <Button className="bg-lime-700 hover:bg-lime-800 w-60 text-white rounded-md" onClick={travelSafety}>Travel Safety</Button>
                <br/>
                <br/>
                <Button className="bg-lime-700 hover:bg-lime-800 w-60 text-white rounded-md" onClick={foodSafety}>Food Safety</Button>
                 <br/>
                 <br/>
           
                       
            <p className="text-sm text-muted-foreground w-100 font-bold text-center text-black">
                 {safetyInfo}
                  </p>
                       
                            </div>
              </Modal>
  

          
          <div>
            <ModalCancellation isOpen={openCancellationModal} onClose={() => {
              setOpenCancellationModal(false);
            }}>
              <br/>
              <br/>
              <br/>
              <br/>
              <h2 className="text-xl font-semibold mb-4">Cancellation Policy</h2>
              <p className="text-sm text-muted-foreground">
               <strong>We understand that plans can change at the last minute. But we have to comply with our partners' policies.</strong><br/><br/>
<strong>Third-Party Alignment:</strong> Explicitly states that funds are held and managed according to the specific policies of the partnered hosts or retreat centers.
<br/><br/>
<strong>Guest Responsibility:</strong> Clarifies that guests are responsible for reviewing individual host terms before booking.
<br/><br/>
<strong>Financial Protection:</strong> Includes a strong recommendation for travel insurance to cover potential losses due to partner-specific cancellation windows.

              </p>
              <button className="mt-4 px-4 py-2 bg-lime-700 hover:bg-lime-800 text-white rounded-md hover:bg-retreat-forest transition-colors" onClick={()=> window.open('https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/Cancellation_Policy_Retreats_Around_The_World.pdf?alt=media&token=68caf53d-b471-4bd2-acaa-3bf620a37f63', '_blank')}>
                Open Policies
              </button>
            </ModalCancellation>
              <Modal isOpen={openTypesModal} onClose={() => {
              setOpenTypesModal(false);
            }}>
              <br/>
              <br/>
              <br/>
              <br/>
              <h2 className="text-xl font-semibold mb-4">Retreat Types</h2>
              <p className="text-sm text-muted-foreground">
               <strong>Explore different types of retreats to find the perfect fit for your needs.</strong><br/><br/>
<strong>Wellness Retreats:</strong> Focus on physical and mental well-being through yoga, meditation, and healthy living.
<br/><br/>
<strong>Guest Responsibility:</strong> Clarifies that guests are responsible for reviewing individual host terms before booking.
<br/><br/>
<strong>Financial Protection:</strong> Includes a strong recommendation for travel insurance to cover potential losses due to partner-specific cancellation windows.

              </p>
              <button className="mt-4 px-4 py-2 bg-lime-700 hover:bg-lime-800 text-white rounded-md hover:bg-retreat-forest transition-colors" onClick={()=> window.open('https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/Cancellation_Policy_Retreats_Around_The_World.pdf?alt=media&token=68caf53d-b471-4bd2-acaa-3bf620a37f63', '_blank')}>
                Open Policies
              </button>
            </Modal>
            <h3 className="font-serif font-semibold mb-4">Retreats Around The World</h3>
            <p className="text-muted-foreground text-sm">
              Discover transformative retreat experiences in the world's most inspiring locations.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm" onClick={() => setOpenTypesModal(true)}>Retreat Types</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Destinations</a></li>
              <Link to='/'><li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm" >Featured Retreats</a></li></Link>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Last Minute</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Host</h4>
            <ul className="space-y-2">
              <li><Link to='/host' className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">List Your Retreat</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Host Resources</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Community</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Host Insurance</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm" onClick={()=> setOpenSafetyModal(true)}>Safety Information</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm" onClick={openCancel}>Cancellation Options</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2026 Retreats Around The World. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-retreat-forest transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-retreat-forest transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-retreat-forest transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}
