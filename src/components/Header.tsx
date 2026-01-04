
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from '../assets/logoretreat.png'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ModalSignUp from "./ModalSignUp";
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen]=useState(false);
    const [isOpenLogin, setIsOpenLogin]=useState(false);
    const [isHost,setIsHost]=useState(false);
    const host =()=> setIsHost(true);
const closeHost=()=> setIsHost(false);
  const openLogin =() => setIsOpenLogin(true);
  const closeLogin =() => setIsOpenLogin(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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
        <div className="flex items-center gap-2">
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
              Become a host
            </Button>
            <Button variant="ghost" size="sm" className="text-sm" onClick={openModal}>
              Sign up
            </Button>
            <Button variant="outline" size="sm" className="text-sm border-lime-700 text-lime-700" onClick={openLogin}>
              Log in
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
                  <Button variant="ghost" className="w-full justify-start" onClick={host}>
                    Become a host
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={openModal}>
                    Sign up
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={openLogin}>
                    Log in
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
        </div>
        {isHost &&
          <ModalSignUp isOpen={isHost} onClose={closeHost}>
            <div>
              <h1>Welcome to Hosting</h1>
            </div>
          </ModalSignUp>
        }
      </div>
      {isModalOpen &&
          <ModalSignUp isOpen={isModalOpen} onClose={closeModal}>
            <div>
              <br/>
              <h2>Sign up as a Guest</h2>
              <table>
                <tr>
                  <td>
                    <input type="text" placeholder="Full Name" className="border p-2 rounded w-full mb-4"/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="email" placeholder="Email" className="border p-2 rounded w-full mb-4"/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="password" placeholder="Password" className="border p-2 rounded w-full mb-4"/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="password" placeholder="Re-type Password" className="border p-2 rounded w-full mb-4"/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <textarea  placeholder="What are you looking for in a retreat?" className="border p-2 rounded w-full mb-4"></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                     <label>Where do you want to go?</label>
                     <br/>
                         <select name="countries" id="countries" form="countryForm">
                         <option value="australia">Australia</option>
                        <option value="bali">Bali</option>
                         <option value="alabama">Alabama</option>
                         <option value="california">California</option>
                        <option value="greece">Greece</option>

                       </select>
                  </td>
                </tr>
                <br/>
                <tr>
                  <td>
                    <input type="text" placeholder="What is your budget" className="border p-2 rounded w-full mb-4"/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" placeholder="How many days do you want to stay?" className="border p-2 rounded w-full mb-4"/>
                  </td>
                </tr>
                <Button variant="outline" size="sm" className="text-sm border-lime-700 text-lime-700" >
              Submit
            </Button>
              </table>
            </div>
          </ModalSignUp>
        }
        <div>
          {isOpenLogin &&
          <ModalSignUp isOpen={isOpenLogin} onClose={closeLogin}>
            <div>
              <h1>Welcome to Modal Login 1234567</h1>
            </div>
          </ModalSignUp>
        }
        </div>
    </header>
  );
}
