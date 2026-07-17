import React,{useEffect, useState, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast, doc, documentId, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import ImageModal from '../ImageModal.js';
import '../ImageModal.css';
import {db,storage, } from '../../firebase.js';
import { Button } from '../ui/button.js';
import Modal from '../Modal.js'
import ImageSlider from '../ImageSlider.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {v4} from 'uuid';
import { getDownloadURL, listAll, ref, StorageReference, deleteObject, uploadBytes } from 'firebase/storage';
import { Card } from '../ui/card.js';
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import stripe from 'stripe';
import StripeCheckout from 'react-stripe-checkout';
import { Link } from 'lucide-react';
import { Input } from '../ui/input.js';
import ModalAI from '../ModalAI.js';
import ModalImage from '../ModalImage.js';

function RetreatDetails() {
     const params = useParams()
     const id= params.id
    const auth=getAuth()
     const [formData, setFormData] = useState({
      user_name:"",
      user_email:"",
      user_message:""
     })

    const [inquiryModal, setInquiryModal] = useState(false);
    const [openSomething, setOpenSomething] = useState(false);
    const [retreatName, setRetreatName] = useState("");
    const [messageToHost, setMessageToHost] = useState("");
    const [flightIncluded, setFlightIncluded] = useState("")
    const [airportPickup, setAirportPickup] = useState("")
    const [imageList, setImageList] = useState([]);
    const [currentUser, setCurrentUser] = useState("")
    const [centerName, setCenterName] = useState("")
    const [hostIsUser, setHostIsUser] = useState(false)
    const [hostId, setHostId] = useState("");
    const [currency, setCurrency] = useState("")
    const [imageUpload, setImageUpload] = useState(null);
    const [startDate, setStartDate] = useState(null)
       const [endDate, setEndDate] = useState(null)
    const [message1, setMessage1] = useState("");
    const [message2, setMessage2] = useState("");
    const [message3, setMessage3] = useState("");
    const [retreatAddress, setRetreatAddress] = useState("");
    const [hostLastName, setHostLastName] = useState("");
    const [hostFirstName, setHostFirstName] = useState("");
    const [nameOfCity, setNameOfCity] = useState("");
    const [month, setMonth] = useState("");
    const [editModal, setEditModal] = useState(false);
    const [country, setCountry] = useState("");

    const [city, setCity] = useState("");
      const [value, setValue] = React.useState<Dayjs | null>();
    
    const [hostPic, setHostPic] = useState(""); 
    const [openImageModal, setOpenImageModal] = useState(false);
    const [price, setPrice] = useState(0);
    const [guestEmail, setGuestEmail] = useState("");
    const [startAt, setStartAt] = useState(null);
    const [endAt, setEndAt] = useState(null);
    const [kind, setKind] = useState("");
    const [nearestAirport, setNearestAirport] = useState("")
    const [allRetreats, setAllRetreats] = useState([]);
    const [documentId, setDocumentId] = useState("");
    const [retreatType, setRetreatType] = useState(""); 
    const [hostEmail, setHostEmail] = useState("");
    const [cityPic, setCityPic] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0)
    const [imageUrl, setImageUrl] = useState("")
                 /**Accomodations */
    const [imageListRoom1, setImageListRoom1] = useState([])
    const [accommodation1,setAccommodation1] = useState("")
    const [priceRoom1, setPriceRoom1] = useState(0.0)
    const [imageListRoom2, setImageListRoom2] = useState([])
    const [accommodation2,setAccommodation2] = useState("")
    const [priceRoom2, setPriceRoom2] = useState(0.0)
    const [imageListRoom3, setImageListRoom3] = useState([])
    const [accommodation3,setAccommodation3] = useState("")
    const [priceRoom3, setPriceRoom3] = useState(0.0)


    const [bookRetreat, setBookRetreat] = useState({
            name:"Retreat Name",
            email:"Customer Email",
            price:0,
           productBy:"Host Name",
             retreatId:0,
             hostId:0,    
           })

    const [emailHostModal, setEmailHostModal] = useState(false);
   const startAtDate=(e)=>{
     const timestamp = Timestamp.fromDate(new Date(e));
     setStartDate(timestamp)
   
 
 
 }
 const endAtDate=(e)=>{
   const timestamp1 = Timestamp.fromDate(new Date(e));
  setEndDate(timestamp1)
 }
 const newPrice =(event)=>{
    const doubleValueFloat = parseFloat(event.target.value);
    setPrice(doubleValueFloat)

   }
    const form = useRef();
    const [loggedIn, setLoggedIn] = useState(false)
      const [retreatId, setRetreatId] = useState(0);
      const [active, setActive] = useState(0);
    const [notLogged, setNotLogged] = useState(false)
    console.log("User id in retreat details is", hostId)
    console.log("Retreat id in retreat details is", retreatId)
const navigate = useNavigate();
const uploadImage=(e)=>{
        e.preventDefault();
       // Create a root reference
       console.log("Upload Image");
       if(imageUpload == null) return;
       
       
       const imageRef = ref(storage, `/retreatimages/${retreatId}/${imageUpload.name+v4()}`);
       uploadBytes(imageRef, imageUpload).then((snapshot)=>{
         getDownloadURL(snapshot.ref).then((url)=>{
           setImageList((prev)=>[...prev, url]);
         }
         );
       });
       console.log("imageList", imageList);
   
     }
const passImageUrl=(url)=>{
  setImageUrl(url)
  setOpenSomething(true)
}
const saveChanges=async(e)=>{
     e.preventDefault()
      const docRef = doc(db, "retreats", documentId);
      console.log(documentId)
     await updateDoc(docRef, { 
      name:retreatName,
      address:retreatAddress,
      kind:kind,
      location:country,
      price:price,
      city:city,
      startAt:startDate,
      endAt:endDate,
      message1:message1,
      message2:message2,
      message3:message3,
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
 window.scrollTo(0,0)
          onAuthStateChanged(auth, (user) => {
  if (user) {
    
    setLoggedIn(true)
    setGuestEmail(user.email)
    if(user.uid ==hostId){
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

          const q2 = query(collection(db, "retreats"),where('id','==',id));
          getDocs(q2).then((querySnapshot) => {
         
          const retreats: any[] = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data().name);

            retreats.push({ ...doc.data() });
            setDocumentId(doc.id);
            setRetreatName(doc.data().name);
            setNearestAirport(doc.data().nearestAirport)
            setHostId(doc.data().hostId);
            setCenterName(doc.data().retreatCenterName);
            setRetreatId(doc.data().retreatId);
            setRetreatAddress(doc.data().address);
            setHostLastName(doc.data().hostLastName);
            setHostFirstName(doc.data().hostFirstName);
            setMonth(doc.data().month);
            setKind(doc.data().kind);
            setMessage1(doc.data().message1);
            setMessage2(doc.data().message2);
            setMessage3(doc.data().message3);
            setCountry(doc.data().location);
            setStartAt(doc.data().startAt);
            setEndAt(doc.data().endAt);
            setHostEmail(doc.data().hostEmail);
            setCityPic(doc.data().cityPic)
            setHostPic(doc.data().hostProfilePic);
            setCurrency(doc.data().currency)
            setPrice(doc.data().price)
            setRetreatType(doc.data().type1)
            setFlightIncluded(doc.data().flightIncluded)
            setAirportPickup(doc.data().airportPickup)
            setCity(doc.data().aboutCity)
            setNameOfCity(doc.data().nameOfCity)
            setAccommodation1(doc.data().accommodation1)
            setPriceRoom1(doc.data().priceRoom1)
            setAccommodation2(doc.data().accommodation2)
            setPriceRoom2(doc.data().priceRoom2)
            setAccommodation3(doc.data().accommodation3)
            setPriceRoom3(doc.data().priceRoom3)

            setBookRetreat({
              email: guestEmail,
              name: doc.data().name,
              price: doc.data().price,
              productBy: doc.data().hostFirstName,
              retreatId: doc.data().retreatId,
              hostId: doc.data().hostId,
            })
            console.log("Retreat id is", doc.data().retreatId)
            console.log("Host pic is"+ doc.data().hostProfilePic)
            console.log("Host id is "+hostId)
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
            const imageListRef = ref(storage, `/retreatimages/${retreatId}/`);
            const imageListRefRoom1 = ref(storage, `/retreatimages/room1/${retreatId}`)
                        const imageListRefRoom2 = ref(storage, `/retreatimages/room2/${retreatId}`)
            const imageListRefRoom3 = ref(storage, `/retreatimages/room3/${retreatId}`)

          listAll(imageListRef).then((res)=>{
                            res.items.forEach((item)=>{
                              getDownloadURL(item).then((url)=>{
                                setImageList((prev)=>[...prev, url]);
                                
                              });
                            });
                          });
                           listAll(imageListRefRoom1).then((res)=>{
                            res.items.forEach((item)=>{
                              getDownloadURL(item).then((url)=>{
                                setImageListRoom1((prev)=>[...prev, url]);
                                
                              });
                            });
                          });
                          listAll(imageListRefRoom2).then((res)=>{
                            res.items.forEach((item)=>{
                              getDownloadURL(item).then((url)=>{
                                setImageListRoom2((prev)=>[...prev, url]);
                                
                              });
                            });
                          });
                          listAll(imageListRefRoom3).then((res)=>{
                            res.items.forEach((item)=>{
                              getDownloadURL(item).then((url)=>{
                                setImageListRoom3((prev)=>[...prev, url]);
                                
                              });
                            });
                          });
                        },[hostId])
  return (
       <div className="relative h-auto min-h-auto w-full overflow-hidden lg:flex md:grid-cols-1 justify-center items-center justify-items-center"  style={{ backgroundColor:'lightGray', color:'black'}}>
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
         <h1 className='text-4xl bold mt-20'>{retreatName}</h1>
         <br/>
         
<center>
<div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:flex  gap-2 w-full m-4 mt-6 justify-center align-center items-center justify-items-center" >
  
  {imageList.length > 0 &&  imageList.slice(0, 3).map((imageUrl, index) => (
             
             <Card className="rounded-xl w-100 overflow-hidden border-none shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer " onClick={viewAllPhotos} key={index}>
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />
      
    </Card>
))}

 
</div>
</center>
<div className="w-full h-full flex lg:justify-center  md:justify-center sm:justify-center sm:grid-cols-1 md:grid-cols-1 items-center bg-transparent">
 <Button className="bg-lime-700 hover:bg-white text-center sm:w-full sm:justify-center lg:w-60 hover:text-lime-700  text-white  m-2"  onClick={viewAllPhotos}>
    View all photos
  </Button>
      <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 lg:w-60 text-center text-white m-2 justify-items: right" onClick={()=>setInquiryModal(true)}>Inquire</Button>
      
              {hostIsUser &&   <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 lg:w-60 text-center text-white m-2 justify-items: right" onClick={()=>setEditModal(true)}>Edit Info</Button>

}
           </div>
           <Modal isOpen={editModal} onClose={()=>setEditModal(false)}>
            <div className='mt-25 w-full h-200 justify-center items-center bg-white p-4 rounded-lg overflow-y-scroll overflow-x-hidden'>
             <form>
              <label>Name of Retreat</label><br/>
              <input type="text" className='border-solid p-2 border-black border-2 m-2'  value={retreatName}  onChange={(e)=>setRetreatName(e.target.value)}/><br/>
              <label>Address of Retreat</label><br/>
              <input type="text" className='border-solid p-2 border-black border-2 m-2' value={retreatAddress}/><br/>
              <label>Country of Retreat</label><br/>
              <input type="text" className='border-solid p-2 border-black border-2 m-2' value={country} /><br/>
              <label>Retreat Center Name</label><br/>
              <input type="text" className='border-solid p-2 border-black border-2 m-2' value={centerName} onChange={(e)=>setCenterName(e.target.value)}/><br/>
              <label>Price of Retreat</label><br/>
              <input type='number' className='border-solid p-2 border-black border-2 m-2' value={price} onChange={newPrice}/> <br/>
              <label>Kind of Retreat</label><br/>
              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." aria-placeholder={kind} onChange={(e)=> setKind(e.target.value)}>{kind}</textarea>
              <label>City</label>
              <input type="text" className='border-solid p-2 border-black border-2 m-2' value={nameOfCity} onChange={(e)=>setNameOfCity(e.target.value)}/><br/>
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                          Start Date of Retreat
                     </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DatePicker value={value} onChange={(e)=>startAtDate(e)}/>
               </LocalizationProvider>
               <br/>
               <div>
                 <label className="block text-gray-700 text-sm font-bold mb-2" >
                      End Date of Retreat
                     </label>
                       <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker value={value} onChange={(e)=>endAtDate(e)}/>
                       
                   </LocalizationProvider>
               
                   
                   </div><br/>
              <label>About The City</label><br/>

              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Add information about the city..." onChange={(e)=>setCity(e.target.value)}>{city}</textarea>
              <label>Message 1</label><br/>

              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Add information about the city..." onChange={(e)=>setMessage1(e.target.value)}>{message1}</textarea>
               <label>Message 2</label><br/>

              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Add information about the city..." onChange={(e)=>setMessage2(e.target.value)}>{message2}</textarea>
               <label>Message 3</label><br/>

              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Add information about the city..." onChange={(e)=>setMessage3(e.target.value)}>{message3}</textarea>
              
              <label>Delete image: </label>
              {imageList.length > 0 &&  imageList.map((imageUrl, index) => (
             
             <Card className="rounded-xl w-60 overflow-hidden border-solid border-2 shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer justify-center items-center m-2" key={index}>
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />
      <Button className='bg-lime-700 hover:bg-lime-800 m-4' onClick={(e)=>delImg(imageUrl)}>Delete</Button>
      
    </Card>
    
))}

<label>Add pics</label>
 <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
    
      <Button onClick={uploadImage} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>

         <Button className='bg-lime-700 hover:bg-lime-800 m-4' onClick={saveChanges}>Save</Button>
              


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
          <h1 className='text-xl font-bold'>{retreatAddress}&nbsp;{month}&nbsp;{country}</h1>
                    <h1 className='text-xl font-bold'>{Object.values(retreatType).join(", ")}</h1>
                        

                   

                               

                   <h1 className='container text-xl font-bold'>{message1}</h1>
                                      <h1 className=' container text-xl font-bold'>{message2}</h1>
                                      <h1 className='container text-xl font-bold'>{message3}</h1>

          <br/>
          <br/>
                   <center>
          <div className="text-center w-3/4  lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 justify-center align-center p-10 rounded-lg lg:flex sm:grid-cols-1 m-4 gap-4 items-center justify-items-center bg-white">

            <div className="container grid w-full h-full justify-center items-center text-center">

            <p className='text-lg md:w-full sm:w-full font-semibold mt-4'>Name of host:&nbsp;{hostFirstName}&nbsp;{hostLastName}</p>
            <br/>
            <br/>
                         <p className='font-semibold text-lg mt-2 align-left'>Date</p>

             <h1 className="container font-serif font-medium text-lg line-clamp-1 p-4 border-2 rounded">{startAt?.toDate()?.toLocaleDateString('en-US',  { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})} -&nbsp;
          {endAt?.toDate()?.toLocaleDateString('en-US',  { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}</h1><br/>
             <p className='font-semibold text-lg  align-left'>Price</p>
                
                   <h1 className='text-lg p-4 border-2 rounded'>${price} for&nbsp; {Math.abs(endAt?.toDate()?.getDate() - startAt?.toDate()?.getDate())}&nbsp;days in {retreatAddress}</h1>
                   
                 
                   <br/>
                                            <p className='font-semibold text-lg mt-2 align-left'>Kind of Retreat</p>

            <p className='w-60 md:w-full sm:w-full p-4 border-2 rounded'>{kind}</p><br/>
            <h1 className='text-xl font-bold'>{nameOfCity}</h1>
            <center><img src={cityPic} alt="Retreats Around The World"  className="w-200 h-200 mt-5  justify-center object-cover" /></center>
            <br/>
            <p className='font-semibold text-lg m-2'>About the city</p>
            <p className='w-60 md:w-full sm:w-full p-4 border-2 rounded'>{city}</p>
                        <p className='font-semibold text-lg m-2'>Airport Information</p>

            <div className='border-2 rounded'>
                                    <h1 className='text-xl mb-4'>Nearest Airport:&nbsp;{nearestAirport}</h1>

                                    <h1 className='text-xl mb-4'>Flight expenses included:&nbsp;{flightIncluded}</h1>

                                    <h1 className='text-xl mb-4'>Airport Pick up services provided:&nbsp;{airportPickup}</h1>
                                  

                                    </div>
                                    <div className='border-2 rounded w-full'>
                        <p className='font-semibold text-lg m-2'>Accommodation</p>
                                                                       <p className='font-semibold text-lg m-2'>{accommodation1}:{priceRoom1}&nbsp;{currency}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 h-auto">

            {imageListRoom1.length > 0 &&  imageListRoom1.map((imageUrl, index) => (
              <div>
                       <Card className="rounded-xl w-100 flex overflow-hidden border-none m-4 shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer h-100 "  key={index} onClick={()=>passImageUrl(imageUrl)}>
                <img className="w-85 md:w-50 lg:w-full items-center m-2 rounded-lg h-70" src={imageUrl} alt="Retreats Around The World" />
                
              </Card>
              
                  </div>
              
          ))}
                <ModalImage isOpen={openSomething} onClose={()=>setOpenSomething(false)} >
                <div className="w-90% h-full justify-center items-center bg-transparent">
                  <img className="w-full h-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />

                  </div>
                  </ModalImage>

                    </div>
                        
                          

            </div>
             <div className='border-2 rounded w-full'>
                        <p className='font-semibold text-lg m-2'>Accommodation</p>
                                                                       <p className='font-semibold text-lg m-2'>{accommodation2}:{priceRoom2}&nbsp;{currency}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 h-auto">

            {imageListRoom2.length > 0 &&  imageListRoom2.map((imageUrl, index) => (
              <div>
                       <Card className="rounded-xl w-100 flex overflow-hidden border-none m-4 shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer h-100 "  key={index} onClick={()=>passImageUrl(imageUrl)}>
                <img className="w-85 md:w-50 lg:w-full items-center m-2 rounded-lg h-70" src={imageUrl} alt="Retreats Around The World" />
                
              </Card>
              
                  </div>
              
          ))}
                <ModalImage isOpen={openSomething} onClose={()=>setOpenSomething(false)} >
                <div className="w-90% h-full justify-center items-center bg-transparent">
                  <img className="w-full h-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />

                  </div>
                  </ModalImage>

                    </div>
                    </div>
                     <div className='border-2 rounded w-full'>
                        <p className='font-semibold text-lg m-2'>Accommodation</p>
                                                                       <p className='font-semibold text-lg m-2'>{accommodation3}{priceRoom3}/night&nbsp;{currency}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 h-auto">

            {imageListRoom3.length > 0 &&  imageListRoom3.map((imageUrl, index) => (
              <div>
                       <Card className="rounded-xl w-100 flex overflow-hidden border-none m-4 shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer h-100 "  key={index} onClick={()=>passImageUrl(imageUrl)}>
                <img className="w-85 md:w-50 lg:w-full items-center m-2 rounded-lg h-70" src={imageUrl} alt="Retreats Around The World" />
                
              </Card>
              
                  </div>
              
          ))}
                <ModalImage isOpen={openSomething} onClose={()=>setOpenSomething(false)} >
                <div className="w-90% h-full justify-center items-center bg-transparent">
                  <img className="w-full h-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />

                  </div>
                  </ModalImage>

                    </div>
                    </div>
            </div>
            
            <div>
                        <h1 className='text-2xl mb-4'>About the Host</h1>

            <img src={hostPic} alt="Retreats Around The World"  className="w-60 h-60  rounded-full object-cover" />
            <br/>
            <br/>
                                    

            <div className=" grid justify-center items-center">
                       
                        <Button  className="text-sm bg-lime-700  w-60 hover:bg-white hover:text-lime-700 text-white mb-2" onClick={()=>navigate(`/host/${hostId}`)}>
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
            <center>      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 h-auto">
          
            {imageList.length > 0 &&  imageList.map((imageUrl, index) => (
              <div>
                       <Card className="rounded-xl w-100 flex overflow-hidden border-none m-4 shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer h-100 "  key={index} onClick={()=>passImageUrl(imageUrl)}>
                <img className="w-85 md:w-50 lg:w-full items-center rounded-lg h-70" src={imageUrl} alt="Retreats Around The World" />
                
              </Card>
              
                  </div>
              
          ))}
                <ModalImage isOpen={openSomething} onClose={()=>setOpenSomething(false)} >
                <div className="w-90% h-full justify-center items-center bg-transparent">
                  <img className="w-full h-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />

                  </div>
                  </ModalImage>

                    </div>
                    </center>
          </div>
    </div>
  )
}

export default RetreatDetails


