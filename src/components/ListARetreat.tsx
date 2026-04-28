import React,{useState, useEffect} from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db, auth,storage} from "../firebase.js";
import { useParams, useNavigate } from 'react-router-dom';
import {v4} from 'uuid';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import pic from '../assets/form.png';
import { Button } from './ui/button.js';

function ListARetreat() {
   const[retreatName, setRetreatName]= useState("")
   const[retreatType, setRetreatType] = useState("")
   const[address,setAddress] = useState("")
   const[country,setCountry] = useState("")
   const[price,setPrice] = useState(0.00)
  const [value, setValue] = React.useState<Dayjs | null>();
      const [selectedMonth, setSelectedMonth] = useState(dayjs().format('MMMM'));
   const [kind,setKind] = useState("")
   const[isModalOpen, setIsModalOpen] = useState(false)
   const [documentId,setDocumentId] = useState("")
   const [hostFirstName, setHostFirstName] = useState("")
   const [hostEmail, setHostEmail] = useState("")
   const [hostLastName, setHostLastName] = useState("")
   const [imageUpload, setImageUpload] = useState(null);
   const [avatarUrl, setAvatarUrl] = useState("");
   const [retreatId, setRetreatId] = useState("")
   const params = useParams();
   const userId = params.userId;
   const navigate= useNavigate()
  const profilePicRef = ref(storage, `retreats/${userId+v4()}/profilePic`);
   
   const pricing =(event)=>{
    const doubleValueFloat = parseFloat(event.target.value);
    setPrice(doubleValueFloat)

   }

     const valueSelected=(e)=>{
  const m=e.format('MMMM')
  setSelectedMonth(m)
 
    

}

   const host =() => {
      //const docRef = doc(db, "retreats", documentId);
    uploadBytes(profilePicRef, imageUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        setAvatarUrl(url);
       
    
      
         addDoc(collection(db, "retreats"), {
                                         name: retreatName,
                                         type1: retreatType,
                                         address: address,
                                         location: country,
                                         price:price, 
                                         id:v4()+userId,
                                         hostId:userId,
                                         hostName:hostFirstName,
                                         hostEmail:hostEmail,
                                         hostLastName:hostLastName,
                                         imageurl:url

         })
        })

      })
      navigate('/')
      

      
      

          }
   useEffect(()=>{
    console.log(userId)
       onAuthStateChanged(auth, async (user) => {
         if (user)  {
           // User is signed in
           const uid = user.uid;
     
          const q =query(collection(db, "hosts"), where("id", "==", userId));
           const querySnapshot = await getDocs(q);
               querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         setDocumentId(doc.id)
         setHostFirstName(doc.data().firstName)
         setHostLastName(doc.data().lastName)
         setHostEmail(doc.data().email)
               })
              }
         
            })

            
   },[])
  return (
    <div >
     <div className="relative h-[600px] min-h-[600px] w-full overflow-hidden">
      
      
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pic})` }}
      ></div>
          <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
                 <div className="container mx-auto max-w-3xl px-4 md:px-6">
                   <div className="animate-fade-in">
                     <h1 className="text-3xl md:text-3xl sm:text-2xl md:pt-6 lg:text-3xl font-serif font-bold tracking-tight text-white mb-6">
                       Before you host a retreat, please read through our policies and guidelines. 
                     </h1>
                    
                    
       
                    
       
                     <div className="flex flex-col sm:flex-row gap-4">
                       <Button className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" >
                        Terms and Conditions
                       </Button>
                       <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" >
                       Cancellation Policy
                       </Button>
                       <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" >
                        Funds and Payouts
                       </Button>
                      
                     </div>
                   </div>
                 </div>
               </div>
      </div>
      <div className="grid justify-center  items-center " >
      <form className="bg-white max-w-full min-w-xs shadow-md rounded px-8 pt-6 pb-8  mt-4" >
        <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Name of Retreat
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" placeholder="First Name" onChange={(e)=>setRetreatName(e.target.value)}/>
    </div>
         <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Type of Retreat
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="Last Name" onChange={(e)=>setRetreatType(e.target.value)}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Name of Retreat Center/Hotel/Place
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="center" type="text" placeholder="First Name" onChange={(e)=>setRetreatName(e.target.value)}/>
    </div>
     <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Address of Retreat
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="Last Name" onChange={(e)=>setAddress(e.target.value)}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Country of Retreat
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="country" type="text" placeholder="Last Name" onChange={(e)=>setCountry(e.target.value)}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Price of Retreat
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Last Name" onChange={pricing}/>
    </div>
    
    <div className="mb-4 flex gap-4">
      <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Start Date of Retreat
      </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={(e)=>valueSelected(e)}/>
    </LocalizationProvider>
    </div>
    <div>
    <label className="block text-gray-700 text-sm font-bold mb-2" >
       End Date of Retreat
      </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={(e)=>valueSelected(e)}/>
        
    </LocalizationProvider>

    </div>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Tell us something about the Retreat
      </label>
           <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setKind(e.target.value)}></textarea>
   
    </div>
        <div className="mb-4">

     <label for="profile-pic">Upload retreat profile pic</label><br/>
          <input type="file" id="profile-pic"  onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
           </div>

    <div className="mb-4">

<label for="profile-pic">Upload retreat pics</label><br/>
          <input type="file" id="profile-pic"  onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
          </div>

        
    <button className="bg-lime-700 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={host}>
        Host a Retreat
      </button>
      </form>
      </div>
    </div> 
  )
}

export default ListARetreat