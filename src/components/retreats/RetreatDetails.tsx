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

function RetreatDetails() {
     const params = useParams()
     const id= params.id
    const auth=getAuth()
     const [formData, setFormData] = useState({
      user_name:"",
      user_email:"",
      user_message:""
     })
      const [message, setMessage] = useState("");

    const [inquiryModal, setInquiryModal] = useState(false);
    const [openSomething, setOpenSomething] = useState(false);
    const [openSomething1, setOpenSomething1] = useState(false);
    const [openSomething2, setOpenSomething2] = useState(false);
    const [openSomething3, setOpenSomething3] = useState(false);
    const [openSomething4, setOpenSomething4] = useState(false)

    const [retreatName, setRetreatName] = useState("");
    const [messageToHost, setMessageToHost] = useState("");
    const [imageFirst, setFirstImage] = useState("")
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
    const [aboutFood, setAboutFood] = useState("")
    const [foodPic, setFoodPic] = useState("")

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
                 /**Room 1 */
    const [imageListRoom1, setImageListRoom1] = useState([])
    const [accommodation1,setAccommodation1] = useState("")
    const [priceRoom1, setPriceRoom1] = useState(0.0)
    const [totalPriceRoom1, setTotalPriceRoom1] = useState(0.0)
    const [totalPriceRoom2, setTotalPriceRoom2] = useState(0.0)
    const [totalPriceRoom3, setTotalPriceRoom3] = useState(0.0)
    const [totalPriceRoom4, setTotalPriceRoom4] = useState(0.0)
    const [room1Exists, setRoom1Exists] = useState(false)
    const [room2Exists, setRoom2Exists]= useState(false)
    const [room3Exists, setRoom3Exists] = useState(false)
    const [room4Exists, setRoom4Exists] = useState(false)

    const [imageListRoom2, setImageListRoom2] = useState([])
    const [accommodation2,setAccommodation2] = useState("")
    const [priceRoom2, setPriceRoom2] = useState(0.0)
    const [includesRoom1Breakfast, setIncludesRoom1Breakfast] = useState("")
    const [includesRoom2Breakfast, setIncludesRoom2Breakfast] = useState("")
    const [includesRoom3Breakfast, setIncludesRoom3Breakfast] = useState("")
    const [includesRoom4Breakfast, setIncludesRoom4Breakfast] = useState("")
    const [imageListRoom4, setImageListRoom4] = useState([])
    const [imageListRoom3, setImageListRoom3] = useState([])
    const [accommodation3,setAccommodation3] = useState("")
    const [accommodation4, setAccommodation4] = useState("")
    const [read, setRead] = useState(false)
    const [priceRoom3, setPriceRoom3] = useState(0.0)
    const [priceRoom4, setPriceRoom4] = useState(0.0)
    const [imageIndex, setImageIndex] = useState(0)
   const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);
 const makePayment=token=>{
  const body ={
    token, 
    bookRetreat
  }
  const headers ={
    "Content-Type": "application/json",
    
  }
  return fetch(`https://retreat-server-cc2646f08902.herokuapp.com/book-retreat`,{
    method:"POST",
    headers: {
    'Content-Type': 'application/json',
  },
    body:JSON.stringify(body)
  }).then(response =>{
    console.log("RESPONSE", response)
    const {status} = response;
    console.log('STATUS', status)
  }).catch(error => console.log())

 }
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
 const pricing1 =(event)=>{
    const doubleValueFloat = parseFloat(event.target.value);
    setPriceRoom1(doubleValueFloat)

   }
    const pricing2 =(event)=>{
    const doubleValueFloat = parseFloat(event.target.value);
    setPriceRoom2(doubleValueFloat)

   }
      const pricing3 =(event)=>{
    const doubleValueFloat = parseFloat(event.target.value);
    setPriceRoom2(doubleValueFloat)

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
      const uploadImageRoom1=(e)=>{
                  e.preventDefault();
                 // Create a root reference
                 console.log("Upload Image");
                 if(imageUpload == null) return;
                 
                 
                 const imageRef1 = ref(storage, `/retreatimages/room1/${retreatId}/${imageUpload.name+v4()}`);
                 uploadBytes(imageRef1, imageUpload).then((snapshot)=>{
                   getDownloadURL(snapshot.ref).then((url)=>{
                     setImageListRoom1((prev)=>[...prev, url]);
                   }
                   );
                 });
             
               }
        const uploadImageRoom2=(e)=>{
                  e.preventDefault();
                 // Create a root reference
                 console.log("Upload Image");
                 if(imageUpload == null) return;
                 
                 
                 const imageRef1 = ref(storage, `/retreatimages/room2/${retreatId}/${imageUpload.name+v4()}`);
                 uploadBytes(imageRef1, imageUpload).then((snapshot)=>{
                   getDownloadURL(snapshot.ref).then((url)=>{
                     setImageListRoom2((prev)=>[...prev, url]);
                   }
                   );
                 });
             
               }
                  const uploadImageRoom3=(e)=>{
                  e.preventDefault();
                 // Create a root reference
                 console.log("Upload Image");
                 if(imageUpload == null) return;
                 
                 
                 const imageRef1 = ref(storage, `/retreatimages/room3/${retreatId}/${imageUpload.name+v4()}`);
                 uploadBytes(imageRef1, imageUpload).then((snapshot)=>{
                   getDownloadURL(snapshot.ref).then((url)=>{
                     setImageListRoom2((prev)=>[...prev, url]);
                   }
                   );
                 });
             
               }
  const priceTotalRoom1=(event) =>{
     const doubleValueFloat = parseFloat(event.target.value);
    setTotalPriceRoom1(doubleValueFloat)
   }
   const priceTotalRoom2=(event) =>{
     const doubleValueFloat = parseFloat(event.target.value);
    setTotalPriceRoom2(doubleValueFloat)
   }
    const priceTotalRoom3=(event) =>{
     const doubleValueFloat = parseFloat(event.target.value);
    setTotalPriceRoom3(doubleValueFloat)
   }
const passImageUrl=(i)=>{
  setImageIndex(i)
  setOpenSomething(true)
}
const passImageUrl1=(i)=>{
  setImageIndex(i)
  setOpenSomething1(true)
}
const passImageUrl2=(i)=>{
  setImageIndex(i)
  setOpenSomething2(true)
}
const passImageUrl3=(i)=>{
  setImageIndex(i)
  setOpenSomething3(true)
}
const passImageUrl4=(i)=>{
  setImageIndex(i)
  setOpenSomething4(true)
}
const readMore =()=>{
  setRead(!setRead)
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
      accommodation1:accommodation1,
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
const viewAllPhotos=(i)=>{
  setImageIndex(i)
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
    else if(user.uid=="YWdPgFJPDHNzTlqZbhqupE4D9j62"){
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
// Check to see if this is a redirect back from Checkout
    const queryStripe = new URLSearchParams(window.location.search);

    if (queryStripe.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (queryStripe.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }

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
            setRoom1Exists(doc.data().room1Exists);
            setRoom2Exists(doc.data().room2Exists);
            setRoom3Exists(doc.data().room3Exists);
            setRoom4Exists(doc.data().room4Exists)
            setMonth(doc.data().month);
            setKind(doc.data().kind);
            setMessage1(doc.data().message1);
            setIncludesRoom1Breakfast(doc.data().includesRoom1Breakfast)
            setIncludesRoom2Breakfast(doc.data().includesRoom2Breakfast)
            setIncludesRoom3Breakfast(doc.data().includesRoom3Breakfast)
            setIncludesRoom4Breakfast(doc.data().includesRoom4Breakfast)
            setTotalPriceRoom1(doc.data().totalPriceRoom1)
            setTotalPriceRoom2(doc.data().totalPriceRoom2)
            setTotalPriceRoom3(doc.data().totalPriceRoom3)
            setTotalPriceRoom4(doc.data().totalPriceRoom4)
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
            setFoodPic(doc.data().foodPic)
            setAboutFood(doc.data().aboutFood)
            setNameOfCity(doc.data().nameOfCity)
            setAccommodation1(doc.data().accommodation1)
            setPriceRoom1(doc.data().priceRoom1)
            setAccommodation2(doc.data().accommodation2)
            setPriceRoom2(doc.data().priceRoom2)
            setAccommodation3(doc.data().accommodation3)
            setAccommodation4(doc.data().accommodation4)
            setPriceRoom3(doc.data().priceRoom3)
            setPriceRoom4(doc.data().priceRoom4)


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
            const imageListRefRoom4 = ref(storage, `/retreatimages/room4/${retreatId}`)

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
                           listAll(imageListRefRoom4).then((res)=>{
                            res.items.forEach((item)=>{
                              getDownloadURL(item).then((url)=>{
                                setImageListRoom4((prev)=>[...prev, url]);
                                
                              });
                            });
                          });
                        },[hostId])
  return (
       <div className="relative h-auto min-h-auto w-full overflow-hidden lg:flex sm-grid w-full md:grid-cols-1 justify-center items-center justify-items-center"  style={{ backgroundColor:'lightGray', color:'black'}}>
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
        <ImageModal isOpen={openImageModal} >
          
   <div className="w-full h-full justify-center items-center bg-transparent">
     <ImageSlider slides={imageList} index={imageIndex} closeSlider={()=>setOpenImageModal(false)}/>
    
      </div>
      
     </ImageModal>
     
        <div className="max-w-full mx-auto text-center">
         <h1 className='text-4xl bold mt-20'>{retreatName}</h1>
         <br/>
         
<center>
<div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4  gap-2   m-4 mt-6 justify-center align-center items-center justify-items-center" >
  
  {imageList.length > 0 &&  imageList.slice(0, 4).map((imageUrl, index) => (
             
      <center><img className="w-80  md:w-50 h-70 lg:w-90 sm:w-full items-center justify-center cursor-pointer" src={imageUrl} onClick={()=>viewAllPhotos(index)} key={index} alt="Retreats Around The World" /></center>
      
    
))}

 
</div>
</center>
<div className="flex flex-col justify-center mt-6 sm:flex-row gap-4">
 <Button className="bg-lime-700 hover:bg-white text-center sm:w-full sm:justify-center lg:w-60 hover:text-lime-700 md:w-40  text-white  m-2"  onClick={()=>viewAllPhotos(0)}>
    View all photos
  </Button>
      <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 lg:w-60 md:w-40 text-center text-white m-2 justify-items: right" onClick={()=>setInquiryModal(true)}>Inquire</Button>
 <StripeCheckout 
         stripeKey='pk_live_51UKjoV7aU9DNgnpHlTFTW847Ns2CVVSrOZ8XXVx5sgXrkZyaMIZdSw9jp3NmCDMWbNK9RMRogwH7lRLAKmHbSgaB009220tPJm'
         token={makePayment}
         name='Cheapest Package'
         amount={price*100}
        >
        <Button className="bg-lime-700 hover:bg-white text-center sm:w-full sm:justify-center lg:w-60 hover:text-lime-700 md:w-40  text-white  m-2">
        Starts At ${price}
        </Button>

          </StripeCheckout>
       {hostIsUser &&
             <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 lg:w-60 text-center md:w-40 sm:w-full text-white m-2 justify-items: right" onClick={()=>setEditModal(true)}>Edit Info</Button>
       }

           </div>
           <Modal isOpen={editModal} onClose={()=>setEditModal(false)}>
            <div className='mt-25 w-full h-200 justify-center items-center bg-white p-4 rounded-lg overflow-y-scroll overflow-x-hidden'>
             <form className='mt-20'>
              <label>Name of Retreat</label><br/>
              <input type="text" className='border-solid p-2 border-black border-2 m-2'  value={retreatName}  onChange={(e)=>setRetreatName(e.target.value)}/><br/>
              <label>Address of Retreat</label><br/>
              <input type="text" className='border-solid p-2 border-black border-2 m-2' value={retreatAddress}/><br/>
              <label>Country of Retreat</label><br/>
              <input type="text" className='border-solid p-2 border-black border-2 m-2' value={country} /><br/>
              <label>Retreat Center Name</label><br/>
              <input type="text" className='border-solid p-2 border-black border-2 m-2' value={centerName} onChange={(e)=>setCenterName(e.target.value)}/><br/>
              <label>Price of Retreat (cheapest package)</label><br/>
              <input type='number' className='border-solid p-2 border-black border-2 m-2' value={price} onChange={newPrice}/> <br/>
                <label>Highlights</label><br/>
              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=> setMessage1(e.target.value)}>{message1}</textarea>
              <label>Kind of Retreat</label><br/>
              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=> setKind(e.target.value)}>{kind}</textarea>
              
              <label>City</label>
              <input type="text" className='border-solid p-2 border-black border-2 m-2' value={nameOfCity} onChange={(e)=>setNameOfCity(e.target.value)}/><br/>
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                         Start Date
                     </label>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DatePicker defaultValue={value} onChange={(e)=>startAtDate(e)}/>
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
                    <label>About The City/Cities/Regions/Villages/Towns</label><br/>

              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Add information about the city..." onChange={(e)=>setCity(e.target.value)}>{city}</textarea>
                    <br/>
                   <label>Accommodation 1/Package 1</label><br/>
              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write about accommodation 1/package 1" aria-placeholder={kind} onChange={(e)=> setAccommodation1(e.target.value)}>{accommodation1}</textarea>
                <label className="block text-gray-700 h-auto text-sm font-bold mb-2" >
       Price per night for Room 1 or package 1, please do not post $ or pound sign (only accepts numbers)
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" value={priceRoom1} onChange={pricing1}/>
               <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
                 Total Price of Retreat if customer chooses Room 1 or package 1, please do not post $ or pound sign <strong>(only accepts numbers)</strong></label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={totalPriceRoom1} onChange={priceTotalRoom1}/>
              
              {imageListRoom1.length > 0 &&  imageListRoom1.map((imageUrl, index) => (
             
             <Card className="rounded-xl w-60 overflow-hidden border-solid border-2 shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer justify-center items-center m-2" key={index}>
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />
      <Button className='bg-lime-700 hover:bg-lime-800 m-4' onClick={(e)=>delImg(imageUrl)}>Delete</Button>
      
    </Card>)
              )}
              <br/>
              
              <label>Add Accommodation1/Package 1 pics</label>
 <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
          <Button onClick={uploadImageRoom1} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>

             <br/><br/>
             
                 <label>Accommodation 2/Package 2</label><br/>
              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write about accommodation 2/package 1"  onChange={(e)=> setAccommodation2(e.target.value)}>{accommodation2}</textarea>
                <label className="block text-gray-700 h-auto text-sm font-bold mb-2" >
       Price per night for Room 2 or package 2, please do not post $ or pound sign (only accepts numbers)
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" value={priceRoom2} onChange={pricing2}/>
               <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
                 Total Price of Retreat if customer chooses Room 1 or package 1, please do not post $ or pound sign <strong>(only accepts numbers)</strong></label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={priceTotalRoom2}/>
              
              {imageListRoom2.length > 0 &&  imageListRoom2.map((imageUrl, index) => (
             
             <Card className="rounded-xl w-60 overflow-hidden border-solid border-2 shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer justify-center items-center m-2" key={index}>
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />
      <Button className='bg-lime-700 hover:bg-lime-800 m-4' onClick={(e)=>delImg(imageUrl)}>Delete</Button>
      
    </Card>)
              )}
              <br/>
              <label>Add Accommodation2 /Package 2 pics</label>
 <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
          <Button onClick={uploadImageRoom2} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>

             <br/><br/>
                  <br/><br/>
             
                 <label>Accommodation 3/Package 3</label><br/>
              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write about accommodation 3/package 3"  onChange={(e)=> setAccommodation3(e.target.value)}>{accommodation3}</textarea>
                <label className="block text-gray-700 h-auto text-sm font-bold mb-2" >
       Price per night for Room 3 or package 3, please do not post $ or pound sign (only accepts numbers)
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" value={priceRoom3} onChange={pricing3}/>
               <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
                 Total Price of Retreat if customer chooses Room 1 or package 1, please do not post $ or pound sign <strong>(only accepts numbers)</strong></label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={totalPriceRoom3} onChange={priceTotalRoom3}/>
              
              {imageListRoom3.length > 0 &&  imageListRoom3.map((imageUrl, index) => (
             
             <Card className="rounded-xl w-60 overflow-hidden border-solid border-2 shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer justify-center items-center m-2" key={index}>
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />
      <Button className='bg-lime-700 hover:bg-lime-800 m-4' onClick={(e)=>delImg(imageUrl)}>Delete</Button>
      
    </Card>)
              )}
              <br/>
              <label>Add Accommodation3 /Package 3 pics</label>
 <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
          <Button onClick={uploadImageRoom3} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>

             <br/><br/>
             

              

              
              <label>Delete image: </label>
              {imageList.length > 0 &&  imageList.map((imageUrl, index) => (
             
             <Card className="rounded-xl w-60 overflow-hidden border-solid border-2 shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer justify-center items-center m-2" key={index}>
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />
      <Button className='bg-lime-700 hover:bg-lime-800 m-4' onClick={(e)=>delImg(imageUrl)}>Delete</Button>
      
    </Card>
    
))}

<label>Add Retreat pics</label>
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
          <h1 className='text-lg font-bold p-4'>Retreat Center Name/Hotel/Airbnb: {centerName}</h1>
          <h1 className='text-lg font-bold p-4'>Retreat Address: {retreatAddress}</h1>
          <h1 className='text-lg font-bold p-4'>Country: {country}</h1>
        
                    <h1 className='font-semibold text-lg m-2 p-4'>Type of Retreat: {Object.values(retreatType).join(", ")}</h1>
                        

                               <br/>

                               <div className='container text-center w-full h-auto p-4 rounded-lg  bg-white'>
                                   <h1 className='text-lg font-bold'>Highlights</h1>
                               <h1 className='container text-lg font-bold'>{message1}</h1>
                                      <h1 className=' container text-lg font-bold '>{message2}</h1>
                                      <h1 className='container text-lg font-bold '>{message3}</h1>
                                      </div>

          <br/>
          <br/>
                   <center>
          <div className="text-center w-3/4  lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 justify-center align-center p-10 rounded-lg lg:flex sm:grid-cols-1 m-4 gap-4 items-center justify-items-center bg-white">

            <div className=" lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 w-full h-full justify-center items-center text-center">

            <h1 className='font-semibold text-lg m-2'>Name of Host:&nbsp;{hostFirstName}&nbsp;{hostLastName}</h1>
            <br/>
            <br/>
                          <h1 className='font-semibold text-lg m-2'>Date</h1>

              <h1 className='text-lg h-auto p-4 border-2 rounded'>{startAt?.toDate()?.toLocaleDateString('en-US',  { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})} -&nbsp;
          {endAt?.toDate()?.toLocaleDateString('en-US',  { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}</h1><br/>
            
             <h1 className='font-semibold text-lg m-2'>Price</h1>
                <div className='p-4 border-2 rounded h-auto'>
                   <h1 className='text-lg h-auto'><strong>${price}</strong> for&nbsp; {Math.abs(endAt?.toDate()?.getDate() - startAt?.toDate()?.getDate())}&nbsp;days in {retreatAddress}</h1>
                   <h1>Total price of Retreat if you select Room 1 or Package1 - <strong>${totalPriceRoom1}</strong></h1>
                                      <h1>Total price of Retreat if you select Room 2 or Package2 - <strong>${totalPriceRoom2}</strong></h1>
                                                         <h1>Total price of Retreat if you select Room 3 or Package3 - <strong>${totalPriceRoom3}</strong></h1>


                 </div>
                    
                   <br/>
                                            <h1 className='font-semibold text-lg m-2'>Kind of Retreat</h1>
                             <div className='p-4 border-2 rounded  h-auto justify-center'>

            <h1 className='text-lg h-auto'>{kind}</h1><br/>
            <h1 className='text-lg font-semibold'>{nameOfCity}</h1>
            <center><img src={cityPic} alt="Retreats Around The World"  className="w-150 h-150 mt-5  justify-center object-cover" /></center>
            </div>
            <br/>
            <h1 className='font-semibold text-lg m-2'>About the city /region / village / town</h1>
            <h1 className='text-lg h-auto p-4 border-2 rounded'>{city}</h1>
            <br/>
            <h1 className='font-semibold text-lg m-2'>Food That will be Provided</h1>

             <h1 className='text-lg h-auto p-4 border-2 rounded'>{aboutFood} </h1>
                        <center><img src={foodPic} alt="Retreats Around The World"  className="w-150 h-150 mt-5  justify-center object-cover" /></center>

                        <h1 className='font-semibold text-lg m-2'>Airport Information</h1>

            <div className='border-2 rounded p-4'>
                                    <h1 className='text-lg mb-4'>Nearest Airport:&nbsp;{nearestAirport}</h1>

                                    <h1 className='text-lg mb-4'>Flight expenses included:&nbsp;{flightIncluded}</h1>

                                    <h1 className='text-lg mb-4'>Airport Pick up services provided:&nbsp;{airportPickup}</h1>
                                  

                                    </div>
                                    {room1Exists &&
                                    <div>
                                      <h1 className='font-semibold text-lg m-2'>Accommodation Type 1/Package 1</h1>

                                    <div className='border-2 lg:flex sm:grid rounded w-full'>

                                            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  gap-4 p-4 h-auto">

            {imageListRoom1.length > 0 &&  imageListRoom1.slice(0,2).map((imageUrl, index) => (
              <div>
      <img className="w-200 h-200 mt-5  justify-center object-cover cursor-pointer"  src={imageUrl} alt="Retreats Around The World" key={index} onClick={()=>passImageUrl1(index)} />
                
              
              
                  </div>
              
          ))}
                <ImageModal isOpen={openSomething1}  >
                                         <ImageSlider slides={imageListRoom1} index={imageIndex} closeSlider={()=>setOpenSomething1(false)}/>

                  </ImageModal>

                    </div>

                                      <div className='lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 w-full p-4 text-center h-auto'>

                        <h1 className='text-lg h-auto'>${priceRoom1}{currency}&nbsp;/night</h1>
                                                <h1 className='text-lg h-auto'>Total price you pay if you select Room 1: ${totalPriceRoom1}&nbsp;{currency}</h1>
                                                
                                                  <StripeCheckout 
         stripeKey='pk_live_51UKjoV7aU9DNgnpHlTFTW847Ns2CVVSrOZ8XXVx5sgXrkZyaMIZdSw9jp3NmCDMWbNK9RMRogwH7lRLAKmHbSgaB009220tPJm'
         token={makePayment}
         name='Retreats Around The World'
         amount={totalPriceRoom1*100}
        >
        <Button className="bg-lime-700 hover:bg-white text-center sm:w-full sm:justify-center lg:w-60 hover:text-lime-700 md:w-40  text-white  m-2">
         Book this Package
        </Button>

          </StripeCheckout>
          

                                                                       <h1 className='text-lg h-auto'>{accommodation1}</h1>
                                                                       <h1 className='text-lg h-auto'>Include breakfast: {includesRoom1Breakfast}</h1>
                                                                      
                          </div>
                  
                        
                          

            </div>
            </div>
            }
            {room2Exists &&
            <div>
                 <h1 className='font-semibold text-lg m-2'>Accommodation Type 2/Package 2</h1>

                                    <div className='border-2 lg:flex sm:grid rounded w-full'>
                                            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  gap-4 p-4 h-auto">

            {imageListRoom2.length > 0 &&  imageListRoom2.slice(0,2).map((imageUrl, index) => (
              <div>
                <img className="w-200 h-200 mt-5  justify-center object-cover cursor-pointer" src={imageUrl} alt="Retreats Around The World" key={index} onClick={()=>passImageUrl2(index)}/>
                
     
              
                  </div>
              
          ))}
               <ImageModal isOpen={openSomething2}  >
                                         <ImageSlider slides={imageListRoom2} index={imageIndex} closeSlider={()=>setOpenSomething2(false)}/>

                  </ImageModal>


                    </div>

                                      <div className='lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 w-full p-4 text-center h-auto'>

                                                                       <h1 className='text-lg h-auto'>${priceRoom2}&nbsp;{currency}/night</h1>
                                                                    <h1 className='text-lg h-auto'>Total price of Retreat you pay if you select Room 2: ${totalPriceRoom2}&nbsp;{currency}</h1>
 <StripeCheckout 
         stripeKey='pk_live_51UKjoV7aU9DNgnpHlTFTW847Ns2CVVSrOZ8XXVx5sgXrkZyaMIZdSw9jp3NmCDMWbNK9RMRogwH7lRLAKmHbSgaB009220tPJm'
         token={makePayment}
         name='Retreats Around The World'
         amount={totalPriceRoom2*100}
        >
        <Button className="bg-lime-700 hover:bg-white text-center sm:w-full sm:justify-center lg:w-60 hover:text-lime-700 md:w-40  text-white  m-2">
         Book this Package
        </Button>

          </StripeCheckout>
          
                                                                     <h1 className='text-lg h-auto'>{accommodation2}</h1>
                                                                      <h1 className='text-lg h-auto'>Include breakfast: {includesRoom2Breakfast}</h1>
                                                                      </div>

         
                    </div>
                    </div>}
                    {room3Exists &&
                    <div>
                      <h1 className='font-semibold text-lg m-2'>Accommodation Type 3/Package 3</h1>

                                    <div className='border-2 lg:flex sm:grid  rounded w-full'>
                       <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4 h-auto">

            {imageListRoom3.length > 0 &&  imageListRoom3.slice(0,2).map((imageUrl, index) => (
              <div>
                <img className="w-200 h-200 mt-5  justify-center object-cover cursor-pointer" src={imageUrl} key={index} onClick={()=>passImageUrl3(index)} alt="Retreats Around The World" />
                
              
              
                  </div>
              
          ))}
                <ImageModal isOpen={openSomething3}  >
              <ImageSlider slides={imageListRoom3} index={imageIndex} closeSlider={()=>setOpenSomething3(false)}/>

                  </ImageModal>


                    </div>
                                      <div className='lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 w-full p-4 text-center h-auto'>

                        <h1 className='text-lg h-auto'>${priceRoom3}/night&nbsp;{currency}</h1>
                                                <h1 className='text-lg h-auto'>Total Price of Retreat you pay if you select Room 3: ${totalPriceRoom3}&nbsp;{currency}</h1>

                          <StripeCheckout 
         stripeKey='pk_live_51UKjoV7aU9DNgnpHlTFTW847Ns2CVVSrOZ8XXVx5sgXrkZyaMIZdSw9jp3NmCDMWbNK9RMRogwH7lRLAKmHbSgaB009220tPJm'
         token={makePayment}
         name='Retreats Around The World'
         amount={totalPriceRoom3*100}
        >
        <Button className="bg-lime-700 hover:bg-white text-center sm:w-full sm:justify-center lg:w-60 hover:text-lime-700 md:w-40  text-white  m-2">
         Book this Package
        </Button>

          </StripeCheckout>
                        <h1 className='text-lg h-auto'>{accommodation3}</h1>
                      
                      
                        <h1 className='text-lg h-auto'>Include breakfast: {includesRoom3Breakfast}</h1>

                     </div>
                    </div>
                    </div>}
                       {room4Exists &&
                    <div>
                      <h1 className='font-semibold text-lg m-2'>Accommodation Type 4/Package 4</h1>

                                    <div className='border-2 lg:flex sm:grid  rounded w-full'>
                       <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4 h-auto">

            {imageListRoom4.length > 0 &&  imageListRoom4.slice(0,2).map((imageUrl, index) => (
              <div>
                <img className="w-200 h-200 mt-5  justify-center object-cover cursor-pointer" src={imageUrl} key={index} onClick={()=>passImageUrl4(index)} alt="Retreats Around The World" />
                
              
              
                  </div>
              
          ))}
                <ImageModal isOpen={openSomething4}  >
              <ImageSlider slides={imageListRoom4} index={imageIndex} closeSlider={()=>setOpenSomething4(false)}/>

                  </ImageModal>


                    </div>
                                      <div className='lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 w-full p-4 text-center h-auto'>

                        <h1 className='text-lg h-auto'>${priceRoom4}/night&nbsp;{currency}</h1>
                                                <h1 className='text-lg h-auto'>Total Price of Retreat you pay if you select Room 3: ${totalPriceRoom4}&nbsp;{currency}</h1>

                          <StripeCheckout 
         stripeKey='pk_live_51UKjoV7aU9DNgnpHlTFTW847Ns2CVVSrOZ8XXVx5sgXrkZyaMIZdSw9jp3NmCDMWbNK9RMRogwH7lRLAKmHbSgaB009220tPJm'
         token={makePayment}
         name='Retreats Around The World'
         amount={totalPriceRoom4*100}
        >
        <Button className="bg-lime-700 hover:bg-white text-center sm:w-full sm:justify-center lg:w-60 hover:text-lime-700 md:w-40  text-white  m-2">
         Book this Package
        </Button>

          </StripeCheckout>
                        <h1 className='text-lg h-auto'>{accommodation4}</h1>
                      
                      
                        <h1 className='text-lg h-auto'>Include breakfast: {includesRoom4Breakfast}</h1>

                     </div>
                    </div>
                    </div>}
            </div>
            
            <div>
                        <h1 className='font-semibold text-lg m-2'>About the Host</h1>

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
            
              <section>
  
   
  </section>
            {!loggedIn && (
              <p>Please log in to book this retreat</p>
            )}
              
            </div>
            {hostIsUser &&
            <h1>{allRetreats}</h1>
            }
                        
          </div>
          </center>
            <center>      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 h-auto">
          
            {imageList.length > 0 &&  imageList.map((imageUrl, index) => (
              <div>
                <img className="w-60 cursor-pointer md:w-50 lg:w-full items-center  h-70" src={imageUrl} key={index} onClick={()=>passImageUrl(index)} alt="Retreats Around The World" />
                
              
              
                  </div>
              
          ))}
                <ImageModal isOpen={openSomething} >
                        <ImageSlider slides={imageList} index={imageIndex} closeSlider={()=>setOpenSomething(false)}/>


                  </ImageModal>

                    </div>
                    </center>
          </div>
    </div>
  )
}

export default RetreatDetails


