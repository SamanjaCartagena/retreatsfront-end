
import { useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db,auth } from "../firebase.js";
import {Link} from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import Modal from "./Modal";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import logo from '../assets/logoretreat.png'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {  Twitter } from "lucide-react";

export function Header() {
const [id,setId]=useState('');
  useEffect(() => {
     onAuthStateChanged(auth, async (user) => {
  if (user)  {
    // User is signed in
    const uid = user.uid;
   const q =query(collection(db, "hosts"), where("id", "==", uid));
   const q2 =query(collection(db, "guides"), where("id", "==", uid));
   const querySnapshot2 = await getDocs(q2);
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data().id);
  setDisplayName(doc.data().firstName);
  setId(doc.data().id);
 
});
 querySnapshot2.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data().id);
  setDisplayName(doc.data().firstName);
  setId(doc.data().id);       
    setLogout(true);  
    console.log('User   is signed in with UID:', uid);
  });
}
  else {
    // User is signed out
    setLogout(false);
    console.log('No user is signed in.'); 
    
    } 
  }
  )

},[])
  const [isScrolled, setIsScrolled] = useState(false);
  const[logout,setLogout]=useState(true);
  const [isModalOpen, setIsModalOpen]= useState(false);
  const [displayName, setDisplayName]= useState('');
  const closeModal =() => {
    setIsModalOpen(false);
 }
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
  const profile=()=>{
    navigate(`/profile`);
   
  }
  const guides=()=>{
    navigate('/guides');
  }
  const loggedout=()=>{
    signOut(auth).then(() => {
      // Sign-out successful. 
      setIsModalOpen(true);
      setLogout(false);
      navigate('/');
    }).catch((error) => {
      // An error happened.
      setLogout(true);
    });
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
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div style={{width:'100%',}} className="justify-center items-center text-center p-4 bold text-lg">
                Sign out Successful!
            </div>
            </Modal>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={home}>
          <img src={logo} style={{width:'60px', height:'60px'}}/>
          <div className="hidden md:block" onClick={home}>
            <h1 className="text-lg font-serif font-bold text-lime-700">
              Retreats <span className="text-lime-700">Around The World</span>
            </h1>
          </div>
        </div>

       
           <div className="flex items-right">
          <div className="hidden md:flex items-center gap-2"></div>
           {logout &&  <Link to={`/profile/${id}`} className="text-sm underline mt-2" >
              Welcome {`${displayName}`}
            </Link>}
           {logout &&  <Button variant="ghost" size="sm" className="text-sm" onClick={loggedout}>
              Log Out
            </Button>}
          </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-sm" onClick={host}>
              Host
            </Button>
            <Button variant="ghost" size="sm" className="text-sm" onClick={guides}>
              Guides
            </Button>
            <Button variant="ghost" size="sm" className="text-sm" onClick={guest}>
              Guest
            </Button>
            <Button variant="outline" size="sm" className="text-sm border-lime-700 text-lime-700" onClick={retreatcenter}>
              Retreat Centers
            </Button>
            <FacebookIcon style={{margin:'5px', cursor:'pointer'}}  onClick={() => window.open('https://www.facebook.com/profile.php?id=61565593366494', '_blank')} />
            <InstagramIcon style={{margin:'5px', cursor:'pointer'}} onClick={() => window.open('https://www.instagram.com/retreats_around_the_world/', '_blank')} />
            <TwitterIcon style={{margin:'5px', cursor:'pointer'}} onClick={() => window.open('https://x.com/Retreats_World', '_blank')} />
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
                    <div className="  flex items-center justify-center">
                      <img src={logo} style={{width:'60px', height:'60px'}}/>
                    </div>
                    <h2 className="font-serif text-lg font-semibold">Retreats Around The World</h2>
                  </div>
                  <Button variant="ghost" className="w-full justify-start" onClick={host}>
                    Host
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={guest}>
                    Guest
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={retreatcenter}>
                    Retreat Centers
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
