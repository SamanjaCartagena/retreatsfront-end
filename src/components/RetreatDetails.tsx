import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast} from 'firebase/firestore';
import ImageModal from './ImageModal.js';
import './ImageModal.css';
import {db,storage} from '../firebase.js';
import { Button } from './ui/button.js';
import Modal from './Modal.js'
import ImageSlider from './ImageSlider.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import dayjs from 'dayjs';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { Card } from './ui/card.js';
import stripe from 'stripe';
import StripeCheckout from 'react-stripe-checkout';
import { Link } from 'lucide-react';

function RetreatDetails() {
    const params = useParams()
    const id= params.id
    const [inquiryModal, setInquiryModal] = useState(false);
    const [retreatName, setRetreatName] = useState("");
    const [messageToHost, setMessageToHost] = useState("");

    const [imageUrl1, setImageUrl1] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");
    const [imageUrl4, setImageUrl4] = useState("");
    const [imageList, setImageList] = useState([]);
    const [userId, setUserId] = useState("");
    const [retreatAddress, setRetreatAddress] = useState("");
    const [hostLastName, setHostLastName] = useState("");
    const [hostFirstName, setHostFirstName] = useState("");
    const [month, setMonth] = useState("");
    const [country, setCountry] = useState("");
    const [hostPic, setHostPic] = useState(""); 
    const [openImageModal, setOpenImageModal] = useState(false);
    const [price, setPrice] = useState(0);
    const [guestEmail, setGuestEmail] = useState("");
    const [startAt, setStartAt] = useState(null);
    const [endAt, setEndAt] = useState(null);
    const [kind, setKind] = useState("");
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
    const [loggedIn, setLoggedIn] = useState(false)
      const [retreatId, setRetreatId] = useState(Math.floor(Math.random() * 1000000));
      const [active, setActive] = useState(0);
const message = `Hello, I am interested in attending your retreat called ${retreatName} in ${country} in ${startAt?.toDate()?.toLocaleDateString('en-US')}. Please let me know if there is availability and any additional information I should know. Thank you!`
    const [notLogged, setNotLogged] = useState(false)
    console.log("User id in retreat details is", userId)
    console.log("Retreat id in retreat details is", retreatId)
const navigate = useNavigate();

const contact =()=>{
    navigate(`/profile/${userId}`)
  
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


   
 

const contactHost =()=> {
  
if(loggedIn){
 setEmailHostModal(true)
}
else {
  setNotLogged(true)
}

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
useEffect(()=>{
  const auth=getAuth()
          onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://google.com
    const uid = user.uid;
    setUserId(uid);
    const guestEmail = user.email;
    setLoggedIn(true)
    setGuestEmail(guestEmail)
    
    console.log("User is logged in:", uid);
  } else {
    // User is signed out
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
            setRetreatName(doc.data().name);
            setImageUrl1(doc.data().pic1);
            setImageUrl2(doc.data().pic2);
            setImageUrl3(doc.data().pic3);
            setImageUrl4(doc.data().pic4);
            setUserId(doc.data().hostId);
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
            const profilePicRef = ref(storage, `/profilePic/${userId}/profile.jpg`);
          getDownloadURL(profilePicRef).then((url)=>{
            setHostPic(url);
          }).catch((error)=>{
            console.log("Error getting profile picture:", error);
          })
            const imageListRef = ref(storage, `/retreatimages/${userId}/${retreatId}/`);

          listAll(imageListRef).then((res)=>{
                            res.items.forEach((item)=>{
                              getDownloadURL(item).then((url)=>{
                                setImageList((prev)=>[...prev, url]);
                                
                              });
                            });
                          })

                        },[retreatId, userId])
  return (
    <div className="min-h-screen bg-gray-100 mt-30 lg:flex md:grid-cols-1 justify-center items-center justify-items-center">
      <Modal isOpen={inquiryModal} onClose={()=>setInquiryModal(false)} >
            <form className="bg-white p-6 rounded shadow-md w-96 mt-20" onSubmit={sendEmail}>
              <h2 className="text-lg font-bold mb-4">Contact {hostFirstName}</h2>
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Your Email
              </label>
              <input type="email" required placeholder="Your email address" value={guestEmail} onChange={(e)=>setGuestEmail(e.target.value)} className="w-full p-2 border rounded mb-4" />
              <textarea className="w-full h-32 p-2 border rounded mb-4"   onChange={(e)=>setMessageToHost(e.target.value)}>
                {message}
              </textarea>
              <Button onClick={sendEmail} className="bg-lime-700 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Send Message
              </Button>
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
     

<br/>

                  <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 lg:w-60 text-center text-white  justify-items: right" onClick={()=>setInquiryModal(true)}>Inquire</Button>
           </div>
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
          
          <h1 className='text-2xl'>{retreatAddress}&nbsp;{month}&nbsp;{country}</h1>

                    <h3 className="font-serif font-medium m-2 text-lg line-clamp-1">{startAt?.toDate()?.toLocaleDateString('en-US')} -&nbsp;
          {endAt?.toDate()?.toLocaleDateString('en-US')}</h3>
                   <h1 className='text-2xl'>${price} for&nbsp; {Math.abs(endAt?.toDate()?.getDate() - startAt?.toDate()?.getDate())}&nbsp;days in {retreatAddress}</h1>
                   <center>
          <div className="text-center w-3/4  lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 justify-center align-center p-10 rounded-lg lg:flex sm:grid-cols-1 m-4 gap-4 items-center justify-items-center bg-white">

            <div>

            <p className='text-lg md:w-full sm:w-full font-semibold mt-4'>{hostFirstName} &nbsp;{hostLastName}</p>
            <p className='w-60 md:w-full sm:w-full p-10'>{kind}</p>
            </div>
            <div>
                        <h1 className='text-2xl mb-4'>About the Host</h1>

            <img src={hostPic}  className="w-60 h-60  rounded-full object-cover" />
            <br/>
            <br/>
            <div className=" grid justify-center items-center">
                       
                        <Button  className="text-sm bg-lime-700  w-60 hover:bg-white hover:text-lime-700 text-white mb-2" onClick={()=>navigate(`/profile/${userId}`)}>
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
                        
          </div>
          </center>
          </div>
    </div>
  )
}

export default RetreatDetails