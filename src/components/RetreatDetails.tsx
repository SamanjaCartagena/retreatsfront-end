import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast} from 'firebase/firestore';

import {db} from '../firebase.js';
import { Button } from './ui/button.js';
import Modal from './Modal.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import dayjs from 'dayjs';
function RetreatDetails() {
    const params = useParams()
    const retreatId= params.id
    const [retreatName, setRetreatName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [retreatAddress, setRetreatAddress] = useState("");
    const [hostLastName, setHostLastName] = useState("");
    const [hostFirstName, setHostFirstName] = useState("");
    const [month, setMonth] = useState("");
    const [country, setCountry] = useState("");
    const [hostPic, setHostPic] = useState(""); 
    const [price, setPrice] = useState(0);
    const [hostEmail, setHostEmail] = useState("");
    const [messageToHost, setMessageToHost] = useState("");
    const [emailHostModal, setEmailHostModal] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)
    const [guestEmail, setGuestEmail] = useState(false)
    const [notLogged, setNotLogged] = useState(false)
    

const closeEmailHostModal =()=>{
  setEmailHostModal(false)
}
const closeNotLogged=()=>{
  setNotLogged(false)
}
const book=()=>{
  alert("retreat booked")
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
useEffect(()=>{
  const auth=getAuth()
          onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://google.com
    const uid = user.uid;
    const guestEmail = user.email;
    setLoggedIn(true)
    setGuestEmail(true)
    
    console.log("User is logged in:", uid);
  } else {
    // User is signed out
    setLoggedIn(false)
    console.log("User is logged out");
  }
});
          const q2 = query(collection(db, "retreats"), (where("id", "==", retreatId)));
          getDocs(q2).then((querySnapshot) => {
         
          const retreats: any[] = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data().name);
            retreats.push({ ...doc.data() });
            setRetreatName(doc.data().name);
            setImageUrl(doc.data().imageurl);
            setRetreatAddress(doc.data().address);
            setHostLastName(doc.data().hostLastName);
            setHostFirstName(doc.data().hostName);
            setMonth(doc.data().month);
            setCountry(doc.data().location);
            setHostEmail(doc.data().hostEmail);
            setHostPic(doc.data().hostProfilePic);
            setPrice(doc.data().price)
            
          console.log(retreats);  
          })
         
        });
},[])
  return (
    <div  className="relative h-auto min-h-[auto] w-full overflow-hidden grid place-items-center">
        <br/>
        <br/>
        <br/>
        <br/>
         <h1 className='text-4xl'>{retreatName}</h1>
         <br/>
         <img src={imageUrl} alt={retreatName} className="w-80% h-full object-cover" />  
         <br/>
         {loggedIn &&
             <Modal isOpen={emailHostModal} onClose={closeEmailHostModal}>
          <div style={{width:'100%', position:'relative', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}} className="justify-center items-center text-center p-4 bold text-lg">
               <form>
                  <input type="email" placeholder="Preferred Email" />
                  <input type="First Name"/>
                  <textarea>

                  </textarea>
                  <Button onClick={sendEmail}>Contact {hostFirstName}</Button>
                </form>

            </div>
            </Modal>
          }
             <Modal isOpen={notLogged} onClose={closeNotLogged}>
          <div style={{width:'100%', position:'relative', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}} className="justify-center items-center text-center p-4 bold text-lg">
               <p>Please sign up or log in to contact {hostFirstName}</p>

            </div>
            </Modal>
          
          <h1 className='text-2xl'>{retreatAddress}&nbsp;{month}&nbsp;{country}</h1>
          <h1 className='text-2xl'>About the Host</h1>
                   <h1 className='text-2xl'>${price} for days{} </h1>

          <div className="text-center w-full justify-center p-10 rounded-lg flex m-4 gap-4 items-right">

            <div>
            <p className='text-lg font-semibold mt-4'>{hostFirstName} &nbsp;{hostLastName}</p>
            <p className='w-80'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div>
            <img src={hostPic} alt={hostFirstName} className="w-60 h-60 rounded-full object-cover" />
            <br/>
                        <Button  size="sm" className="text-sm bg-lime-700 hover:bg-white hover:text-lime-700 text-white m-4" >
                          Check out {hostFirstName}
                          </Button>

            <Button onClick={contactHost}>Contact {hostFirstName}</Button><br/>
            <br/>
            <Button onClick={book}>Book this Retreat</Button>
            
            </div>
            
          </div>
    </div>
  )
}

export default RetreatDetails