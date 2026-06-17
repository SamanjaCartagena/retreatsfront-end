import React,{useEffect, useState, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast, doc, documentId, updateDoc} from 'firebase/firestore';
import ImageModal from './ImageModal.js';
import './ImageModal.css';
import {db,storage, } from '../firebase.js';
import { Button } from './ui/button.js';
import Modal from './Modal.js'
import ImageSlider from './ImageSlider.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import dayjs from 'dayjs';
import { getDownloadURL, listAll, ref, StorageReference, deleteObject } from 'firebase/storage';
import { Card } from './ui/card.js';
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";

import stripe from 'stripe';
import StripeCheckout from 'react-stripe-checkout';
import { Link } from 'lucide-react';
import { Input } from './ui/input.js';

function RetreatDetails() {
    const params = useParams()
    const id= params.id
     const [formData, setFormData] = useState({
      user_name:"",
      user_email:"",
      user_message:""
     })

    const [inquiryModal, setInquiryModal] = useState(false);
    const [retreatName, setRetreatName] = useState("");
    const [messageToHost, setMessageToHost] = useState("");
    const [imageUrl1, setImageUrl1] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");
    const [imageUrl4, setImageUrl4] = useState("");
    const [imageList, setImageList] = useState([]);
    const [currentUser, setCurrentUser] = useState("")
    const [centerName, setCenterName] = useState("")
    const [hostIsUser, setHostIsUser] = useState(false)
    const [hostId, setHostId] = useState("");
    const [retreatAddress, setRetreatAddress] = useState("");
    const [hostLastName, setHostLastName] = useState("");
    const [hostFirstName, setHostFirstName] = useState("");
    const [month, setMonth] = useState("");
    const [editModal, setEditModal] = useState(false);
    const [country, setCountry] = useState("");
    const [hostPic, setHostPic] = useState(""); 
    const [openImageModal, setOpenImageModal] = useState(false);
    const [price, setPrice] = useState(0);
    const [guestEmail, setGuestEmail] = useState("");
    const [startAt, setStartAt] = useState(null);
    const [endAt, setEndAt] = useState(null);
    const [kind, setKind] = useState("");
    const [allRetreats, setAllRetreats] = useState([]);
    const [documentId, setDocumentId] = useState("");
    const [hostEmail, setHostEmail] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0)
    const [bookRetreat, setBookRetreat] = useState({
            name:"Retreat Name",
            email:"Customer Email",
            price:0,
           productBy:"Host Name",
             retreatId:0,
             hostId:0,    
           })

    const [emailHostModal, setEmailHostModal] = useState(false);
 

    const form = useRef();
    const [loggedIn, setLoggedIn] = useState(false)
      const [retreatId, setRetreatId] = useState(Math.floor(Math.random() * 1000000));
      const [active, setActive] = useState(0);
    const [notLogged, setNotLogged] = useState(false)
    console.log("User id in retreat details is", hostId)
    console.log("Retreat id in retreat details is", retreatId)
const navigate = useNavigate();


const saveChanges=async(e)=>{
     e.preventDefault()
     alert(retreatName)
      const docRef = doc(db, "retreats", documentId);
      console.log(documentId)
     await updateDoc(docRef, { 
      name:retreatName,
      address:retreatAddress,
      kind:kind,
      location:country,
      price:price,
      retreatCenterName:centerName,

          
     });
         setEditModal(false)
}
const closeEmailHostModal =()=>{
  setEmailHostModal(false)
}
const closeNotLogged=()=>{
  setNotLogged(false)
}

   const makePayment= (token) =>{
      if(loggedIn){
    const body  ={
      token, 
      bookRetreat
    }
    const headers= {
      "Content-Type":"application/json"
    }
    return fetch(`https://retreatsaroundtheworld.net/book-retreat`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then( response =>{
          console.log("RESPONSE", response)
          const {status} = response;
          console.log("STATUS ", status)
          if(status === 200){
            navigate("/success")
          }
            else{
              alert("There was an issue with your payment. Please try again.")
            }

})
      
    .catch(error =>
      {
        console.log(error)
        alert("There was an error processing your booking. Please try again later.") 
    })

  }
  else{
    setNotLogged(true)

  }
   
   
    
    

}


    const { toast } = useToast();
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 

const contactHost =()=> {
  
if(loggedIn){
 setEmailHostModal(true)
}
else {
  setNotLogged(true)
}

}
const delImg=(url)=>{
    const imageRef = ref(storage, url);
       deleteObject(imageRef).then(() => {
         setImageList((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
       }).catch((error) => {
         console.error("Error deleting image: ", error);
       });
}
const sendEmail=()=>{
  fetch('http://localhost:3000/send-email-host', {
                                   method: 'POST',
                                  headers: {
                                  'Content-Type': 'application/json',

                     },
                              body:JSON.stringify({ name: "Admin", email:`${hostEmail}`, content: `Someone wants to attend your retreat Retreat id number. Person email address is ${guestEmail}` }), 
                              
               })
}
const viewAllPhotos=()=>{
  setOpenImageModal(true)
  
}
const handleSubmit=(e: React.FormEvent)=>{
    e.preventDefault();

    emailjs
      .sendForm('service_9u700we', 'template_slv7qow', form.current, {
        publicKey: 'iYI6t4bT28fP2liFc',
      })
      .then(
        () => {

          console.log('SUCCESS!');
          setInquiryModal(false)
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
          toast({
      title: "Inquiry Submitted",
      description: `Thank you for your interest in ${retreatName} in ${country}. We will get back to you soon!` ,
    });
    // Reset form
   
                    }
useEffect(()=>{
  const auth=getAuth()
          onAuthStateChanged(auth, (user) => {
  if (user) {
    
    setCurrentUser(user.uid);
    setLoggedIn(true)
    setGuestEmail(user.email)
    if(user.uid ==currentUser){
      setHostIsUser(true)
    }
    else{
      setHostIsUser(false)
    }
  } else {
    setLoggedIn(false)
    console.log("User is logged out");
  }
});
          
          const q2 = query(collection(db, "retreats"), (where("id", "==", id)));
          getDocs(q2).then((querySnapshot) => {
         
          const retreats: any[] = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data().name);

            retreats.push({ ...doc.data() });
            setDocumentId(doc.id);
            setRetreatName(doc.data().name);
            setImageUrl1(doc.data().pic1);
            setImageUrl2(doc.data().pic2);
            setImageUrl3(doc.data().pic3);
            setImageUrl4(doc.data().pic4);
            setHostId(doc.data().hostId);
            setCenterName(doc.data().retreatCenterName);
            setRetreatId(doc.data().retreatId);
            setRetreatAddress(doc.data().address);
            setHostLastName(doc.data().hostLastName);
            setHostFirstName(doc.data().hostFirstName);
            setMonth(doc.data().month);
            setKind(doc.data().kind);
            setCountry(doc.data().location);
            setStartAt(doc.data().startAt);
            setEndAt(doc.data().endAt);
            setHostEmail(doc.data().hostEmail);
            setHostPic(doc.data().hostProfilePic);
            setPrice(doc.data().price)
            setBookRetreat({
              email: guestEmail,
              name: doc.data().name,
              price: doc.data().price,
              productBy: doc.data().hostFirstName,
              retreatId: doc.data().retreatId,
              hostId: doc.data().hostId,
            })
            console.log("Retreat id is", doc.data().retreatId)
            
          console.log(retreats);  
          })
         
        });
        setFormData({
           user_name: "",
    user_email: guestEmail,
    user_message: `Hello, I am interested in attending your retreat called ${retreatName} in ${country} in ${startAt?.toDate()?.toLocaleDateString('en-US')}. Please let me know if there is availability and any additional information I should know. Thank you!`,
        })
    
            const profilePicRef = ref(storage, `/profilePic/${hostId}/profile.jpg`);
          getDownloadURL(profilePicRef).then((url)=>{
            setHostPic(url);
          }).catch((error)=>{
            console.log("Error getting profile picture:", error);
          })
            const imageListRef = ref(storage, `/retreatimages/${hostId}/${retreatId}/`);

          listAll(imageListRef).then((res)=>{
                            res.items.forEach((item)=>{
                              getDownloadURL(item).then((url)=>{
                                setImageList((prev)=>[...prev, url]);
                                
                              });
                            });
                          })

                        },[])
  return (
    <div className="min-h-screen bg-gray-100 mt-30 lg:flex md:grid-cols-1 justify-center items-center justify-items-center">
      <Modal isOpen={inquiryModal} onClose={()=>setInquiryModal(false)} >
            <form className="bg-white p-6 rounded shadow-md w-96 mt-20" onSubmit={handleSubmit} ref={form}>
              <h2 className="text-lg font-bold mb-4">Contact {hostFirstName}</h2>
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Your Email
              </label>
              <Input type="email" name="user_email" required placeholder="Your email address" value={formData.user_email} onChange={handleInputChange} className="w-full p-2 border rounded mb-4" />
              <textarea className="w-full h-32 p-2 border rounded mb-4" name="user_message"   onChange={handleInputChange} value={formData.user_message}  >
              </textarea>
              <input type="submit" value="Send Inquiry" className="bg-lime-700 hover:bg-white hover:text-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" />
            </form>
            </Modal>
        <ImageModal isOpen={openImageModal} onClose={()=>setOpenImageModal(false)} >
          
   <div className="w-full h-full justify-center items-center bg-transparent">
     <ImageSlider slides={imageList} />
    
      </div>
      
     </ImageModal>
     
        <div className="max-w-full mx-auto text-center">
         <h1 className='text-4xl bold mt-4'>{retreatName}</h1>
         <br/>
         
<center>
<div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:flex  gap-2 w-full m-4 justify-center align-center items-center justify-items-center">
  
  {imageList.length > 0 &&  imageList.slice(0, 3).map((imageUrl, index) => (
             
             <Card className="rounded-xl w-100 overflow-hidden border-none shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer " onClick={viewAllPhotos} key={index}>
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg" src={imageUrl} alt={`Retreat Image ${index + 1}`} />
      
    </Card>
))}

 
</div>
</center>
<div className="w-full h-full flex lg:justify-center  md:justify-center sm:justify-center sm:grid-cols-1 items-center bg-transparent">
 <Button className="bg-lime-700 hover:bg-white text-center sm:w-full sm:justify-center lg:w-60 hover:text-lime-700  text-white  m-2"  onClick={viewAllPhotos}>
    View all photos
  </Button>
      <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 lg:w-60 text-center text-white m-2 justify-items: right" onClick={()=>setInquiryModal(true)}>Inquire</Button>
              {hostIsUser &&   <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 lg:w-60 text-center text-white m-2 justify-items: right" onClick={()=>setEditModal(true)}>Edit Info</Button>

}
           </div>
           <Modal isOpen={editModal} onClose={()=>setEditModal(false)}>
            <div className='mt-25'>
             <form>
              <label>Name of Retreat</label><br/>
              <input type="text" className='border-solid p-2 border-black border-2 m-2'  placeholder={retreatName}  onChange={(e)=>setRetreatName(e.target.value)}/><br/>
              <label>Address of Retreat</label><br/>
              <input type="text" className='border-solid p-2 border-black border-2 m-2'  placeholder={retreatAddress}/><br/>
              <label>Country of Retreat</label><br/>
              <input type="text" className='border-solid p-2 border-black border-2 m-2' placeholder={country}/><br/>
              <label>Retreat Center Name</label><br/>
              <input type="text" className='border-solid p-2 border-black border-2 m-2' placeholder={centerName} onChange={(e)=>setCenterName(e.target.value)}/><br/>
              <label>Price of Retreat</label><br/>
              <input type='number' className='border-solid p-2 border-black border-2 m-2' placeholder={price}/> <br/>
              <label>About The Retreat</label><br/>
              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." aria-placeholder={kind}></textarea>
              <label>Delete image: </label>
              {imageList.length > 0 &&  imageList.slice(0, 3).map((imageUrl, index) => (
             
             <Card className="rounded-xl w-60 overflow-hidden border-solid border-2 shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer justify-center items-center m-2" key={index}>
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg" src={imageUrl} alt={`Retreat Image ${index + 1}`} />
      <Button className='bg-lime-700 hover:bg-lime-800' onClick={(e)=>delImg(imageUrl)}>Delete</Button>
      
    </Card>
    
))}

         <Button className='bg-lime-700 hover:bg-lime-800' onClick={saveChanges}>Save</Button>
              


             </form>
             </div>
           </Modal>
         <br/>
       {/** 
             <Modal isOpen={emailHostModal} onClose={closeEmailHostModal}>
          <div style={{width:'100%', position:'relative', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}} className="justify-center items-center text-center p-4 bold text-lg">
               <form>
                  <input type="email" placeholder="Preferred Email" />
                  <input type="First Name"/>
                  <textarea>

                  </textarea>
                </form>

            </div>
            </Modal>
          
             <Modal isOpen={notLogged} onClose={closeNotLogged} >
          <div style={{width:'100%', position:'relative', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}} className="justify-center items-center text-center p-4 bold text-lg">
               <p>Please sign up or log in to contact {hostFirstName}</p>

            </div>
            </Modal>

            **/}
          <h1 className='text-2xl font-bold'>{centerName}</h1>
          <h1 className='text-xl'>{retreatAddress}&nbsp;{month}&nbsp;{country}</h1>

                    <h3 className="font-serif font-medium m-2 text-lg line-clamp-1">{startAt?.toDate()?.toLocaleDateString('en-US')} -&nbsp;
          {endAt?.toDate()?.toLocaleDateString('en-US')}</h3>
                   <h1 className='text-2xl'>${price} for&nbsp; {Math.abs(endAt?.toDate()?.getDate() - startAt?.toDate()?.getDate())}&nbsp;days in {retreatAddress}</h1>
                   <center>
          <div className="text-center w-3/4  lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 justify-center align-center p-10 rounded-lg lg:flex sm:grid-cols-1 m-4 gap-4 items-center justify-items-center bg-white">

            <div>

            <p className='text-lg md:w-full sm:w-full font-semibold mt-4'>{hostFirstName} &nbsp;{hostLastName}</p>
            <p className='w-60 md:w-full sm:w-full p-10'>{kind}</p>
            <div className='border-2 rounded'>
            <h1 className='text-2xl mb-4'>How to get there?</h1>
                                    <h1>Nearest Airport</h1>
                                  

                                    </div>
            </div>
            <div>
                        <h1 className='text-2xl mb-4'>About the Host</h1>

            <img src={hostPic}  className="w-60 h-60  rounded-full object-cover" />
            <br/>
            <br/>
                                    

            <div className=" grid justify-center items-center">
                       
                        <Button  className="text-sm bg-lime-700  w-60 hover:bg-white hover:text-lime-700 text-white mb-2" onClick={()=>navigate(`/profile/${hostId}`)}>
                          Check out {hostFirstName}
                          </Button>
                         
                          

            <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 w-60 text-white" onClick={()=>setInquiryModal(true)}>Inquire </Button><br/>
            </div>
            <br/>
            {/** 
            {loggedIn && (
              <StripeCheckout 
                stripeKey = "pk_live_51TGWAfHFx7gkDqvcnUNJA0HfnDrgXWy8Uidb0sDoQU6fhmwuoLiqLYWozr6YquYP4soWimEAXtkUtzTJ9PbIW5nC00r4PDuwxU"
                token={makePayment}
                name="Book This Retreat"
                amount={bookRetreat.price * 100}
     >
      <button className="btn-large pink">Book This Retreat ${bookRetreat.price}</button>
      </StripeCheckout>
            )}
            {!loggedIn && (
              <p>Please log in to book this retreat</p>
            )}
              **/}
            </div>
            {hostIsUser &&
            <h1>{allRetreats}</h1>
            }
                        
          </div>
          </center>
          </div>
    </div>
  )
}

export default RetreatDetails


