
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import ModalCancellation from './ModalCancellation';
export function Footer() {
  const [openCancellationModal, setOpenCancellationModal] = useState(false);
  const openCancel = () => {
    setOpenCancellationModal(true);
  };
  return (
    <footer className="bg-white border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            <h3 className="font-serif font-semibold mb-4">Retreats Around The World</h3>
            <p className="text-muted-foreground text-sm">
              Discover transformative retreat experiences in the world's most inspiring locations.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link to='/' className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Retreat Types</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Destinations</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Featured Retreats</a></li>
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
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Safety Information</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm" onClick={openCancel}>Cancellation Options</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 Retreats Around The World. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-retreat-forest transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-retreat-forest transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-retreat-forest transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
