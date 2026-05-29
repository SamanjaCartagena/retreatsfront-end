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
function RetreatDetails() {
    const params = useParams()
    const id= params.id
    const [retreatName, setRetreatName] = useState("");
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
    const [hostEmail, setHostEmail] = useState("");
    const [messageToHost, setMessageToHost] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0)

    const [emailHostModal, setEmailHostModal] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)
    const [guestEmail, setGuestEmail] = useState(false)
      const [retreatId, setRetreatId] = useState(Math.floor(Math.random() * 1000000));
      const [active, setActive] = useState(0);

    const [notLogged, setNotLogged] = useState(false)
    console.log("User id in retreat details is", userId)
    console.log("Retreat id in retreat details is", retreatId)

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
    setGuestEmail(true)
    
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
            setCountry(doc.data().location);
            setHostEmail(doc.data().hostEmail);
            setHostPic(doc.data().hostProfilePic);
            setPrice(doc.data().price)
            console.log("Retreat id is", doc.data().retreatId)
            
          console.log(retreats);  
          })
         
        });
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
    <div className="min-h-screen bg-gray-100 mt-30 justify-center items-center justify-items-center">
        <ImageModal isOpen={openImageModal} onClose={()=>setOpenImageModal(false)} className="justify-center items-center">
   <div className="w-full h-full justify-center items-center bg-transparent">
     <ImageSlider slides={imageList} />
      </div>
      
     </ImageModal>
     
        <div className="max-w-full mx-auto text-center">
         <h1 className='text-4xl'>{retreatName}</h1>
         <br/>
         
<center>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2 w-100% m-4 justify-center align-center items-center justify-items-center">
  
  {imageList.length > 0 &&  imageList.slice(0, 3).map((imageUrl, index) => (
             
             <Card className="rounded-xl w-100 overflow-hidden border-none shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer " onClick={viewAllPhotos} key={index}>
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg" src={imageUrl} alt={`Retreat Image ${index + 1}`} />
    </Card>
))}

 
</div>
</center>
 <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 text-white justify-right m-2" style={{ justifyContent: 'right', justifyItems: 'right'}} onClick={viewAllPhotos}>
    View all photos
  </Button>
     

<br/>
<center>

     </center>
                  <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 text-white justify-right" onClick={sendEmail}>Contact {hostFirstName}</Button>

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
    </div>
  )
}

export default RetreatDetails