import React,{useState, useEffect} from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db, auth,storage} from "../firebase.js";
import { useParams, useNavigate } from 'react-router-dom';
import {v4} from 'uuid';

function ListARetreat() {
   const[retreatName, setRetreatName]= useState("")
   const[retreatType, setRetreatType] = useState("")
   const[address,setAddress] = useState("")
   const[country,setCountry] = useState("")
   const[price,setPrice] = useState(0.00)
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
    const pic="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/meditation.jpeg?alt=media&token=33e9faf8-8cd4-42ee-a2e8-5e264884c5dd"
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
    <div className="relative h-[80vh] min-h-[1000px] w-full overflow-hidden">
   
    <div className="justify-center  grid h-screen absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pic})` }} >
      
      <div className="w-full max-w-xs items-center justify-center"></div>
     <form className="bg-white shadow-md rounded px-8 pt-6 pb-8  mt-4" style={{width:'800px'}}>
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
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Tell us something about the Retreat
      </label>
           <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setKind(e.target.value)}></textarea>

    </div>
     <label for="profile-pic">Upload retreat profile pic</label><br/>
          <input type="file" id="profile-pic"  onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
           

<br/>
          
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={host}>
        Host a Retreat
      </button>
      </form>
      </div>

    </div>
  )
}

export default ListARetreat