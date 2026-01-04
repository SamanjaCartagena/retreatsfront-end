
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logoretreat.png'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
 
  const navigate = useNavigate();
  const retreatcenter=()=>{
     navigate('/retreatcenters');

  }
  const host=() =>{
    navigate('/host');
  }
  const guest=() =>{
    navigate('/guest')
  }
  const home=() =>{
    navigate('/')
  }
  // Add scroll event listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${
        isScrolled ? "bg-white/90  shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={home}>
          <img src={logo} style={{width:'60px', height:'60px'}}/>
         <a href="https://retreatsaroundtheworld.net/" target="_blank"> <div className="hidden md:block">
            <h1 className="text-lg font-serif font-bold text-lime-700">
              Retreats <span className="text-lime-700">Around The World</span>
            </h1>
          </div></a>
        </div>

        <div className="hidden md:flex bg-white rounded-full border px-4 py-1.5 items-center shadow-sm max-w-sm hover:shadow-md transition-all">
          <Input
            type="text"
            placeholder="Search destinations, retreats..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
          />
          <Button variant="default" size="sm" className="rounded-full bg-lime-700 hover:bg-lime-600">
            Search
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-sm" onClick={host}>
              Host
            </Button>
            <Button variant="ghost" size="sm" className="text-sm" onClick={guest}>
              Guest
            </Button>
            <Button variant="outline" size="sm" className="text-sm border-lime-700 text-lime-700" onClick={retreatcenter}>
              Retreat Centers
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 py-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-8 w-8 rounded-full bg-retreat-sage flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <h2 className="font-serif text-lg font-semibold">Retreats Around The World</h2>
                  </div>
                  <Button variant="ghost" className="w-full justify-start">
                    Home
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Search
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Favorites
                  </Button>
                 
                
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
        </div>
        
      </div>
     
        <div>
 
        </div>
    </header>
  );
}
