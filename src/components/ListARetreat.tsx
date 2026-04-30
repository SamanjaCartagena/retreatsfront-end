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
import Modal from './Modal.js';

function ListARetreat() {
   const[retreatName, setRetreatName]= useState("")
   const[retreatType, setRetreatType] = useState("")
   const[address,setAddress] = useState("")
   const[country,setCountry] = useState("")
   
   const[price,setPrice] = useState(0.00)
  const [value, setValue] = React.useState<Dayjs | null>();
      const [selectedMonth, setSelectedMonth] = useState(dayjs().format('MMMM'));
   const [kind,setKind] = useState("")
   const[isTerms, setIsTerms] = useState(false)
   const [documentId,setDocumentId] = useState("")
   const [hostFirstName, setHostFirstName] = useState("")
   const [hostEmail, setHostEmail] = useState("")
   const [hostLastName, setHostLastName] = useState("")
   const [imageUpload, setImageUpload] = useState(null);
   const [avatarUrl, setAvatarUrl] = useState("");
   const [imageList, setImageList] = useState([]);
   
   const [retreatId, setRetreatId] = useState("")
   const params = useParams();
   const userId = params.userId;
   const navigate= useNavigate()
    const imageListRef = ref(storage, `/retreatimages/${userId}/`);
    const deleteImage=(url)=>{
       alert("Are you sure you want to delete this image?"+url);
        const imageRef = ref(storage, url);
        deleteObject(imageRef).then(() => {
          setImageList((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
    const uploadImage=(e)=>{
        e.preventDefault();
       // Create a root reference
       console.log("Upload Image");
       if(imageUpload == null) return;
       
       
       const imageRef = ref(storage, `/retreatimages/${userId}/${imageUpload.name+v4()}`);
       uploadBytes(imageRef, imageUpload).then((snapshot)=>{
         getDownloadURL(snapshot.ref).then((url)=>{
           setImageList((prev)=>[...prev, url]);
         }
         );
       });
       console.log("imageList", imageList);
   
     }
   const pricing =(event)=>{
    const doubleValueFloat = parseFloat(event.target.value);
    setPrice(doubleValueFloat)

   }

     const valueSelected=(e)=>{
  const m=e.format('MMMM')
  setSelectedMonth(m)
 
    

}

   const host =() => {
 
      
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
                                         pic1: imageList[0],
                                         pic2: imageList[1],
                                         pic3: imageList[2],

         })
        

      
      navigate('/')
      

      
      

          }
   useEffect(()=>{
    console.log(userId)
       onAuthStateChanged(auth, async (user) => {
         if (user)  {
           // User is signed in
           console.log("host Id is: ", userId)
     
          const q =query(collection(db, "hosts"), where("hostId", "==", userId));
           const querySnapshot = await getDocs(q);
               querySnapshot.forEach((doc) => {
         setDocumentId(doc.id)
         setHostFirstName(doc.data().hostName)
         setHostLastName(doc.data().hostLastName)
         console.log(doc.data().hostName)
               })
              }
                  listAll(imageListRef).then((res)=>{
                    res.items.forEach((item)=>{
                      getDownloadURL(item).then((url)=>{
                        setImageList((prev)=>[...prev, url]);
              
                      });
                    });
                  });
         
            })
  
            
   },[])
  return (
    <div >
     <div className="relative h-[600px] min-h-[600px] w-full overflow-hidden">
      <Modal isOpen={isTerms} onClose={()=>setIsTerms(false)}>
         <div className="p-6 justify-center items-center text-center  h-[700px]">
            <br/>
            <br/>
            <br/>
            <h2 className="text-2xl font-bold mb-4">Please read the terms and conditions</h2>
            <p className="mb-4">
              This PDF includes sections dedicated to:<br/>

<strong>Good Faith Agreements:</strong> Establishing a foundation of honesty, transparency, and fair dealing.<br/>

<strong>Host Responsibilities:</strong> Covering listing accuracy, operational delivery, and legal/safety compliance.<br/>

<strong>Professional Standards:</strong> Guidelines for communication and service quality.<br/>

<strong>Financial Obligations:</strong> Clarity on pricing and booking integrity.<br/>
            </p>
          <Button onClick={()=>window.open('https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/Retreats_Around_The_World_Host_Terms.pdf?alt=media&token=d21b1566-82b2-49cc-b0b5-0b4f225e3e77', '_blank')} className="bg-retreat-forest text-white hover:bg-retreat-cream hover:text-retreat-forest" >
            Open PDF
          </Button>
        </div>
      </Modal>
      
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
                       <Button className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={()=>setIsTerms(true)}>
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

<label for="profile-pic">Upload retreat pics</label><br/>

          <input type="file" id="profile-pic"  onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                   <button onClick={uploadImage} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</button>

          </div>
     {imageList.map((url)=>{
      return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                      <button onClick={()=> deleteImage(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</button>



      </div>
      
     })}
        
    <button className="bg-lime-700 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={host}>
        Host a Retreat
      </button>
      </form>
      </div>
    </div> 
  )
}

export default ListARetreat