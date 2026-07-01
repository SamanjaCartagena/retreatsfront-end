import React, { useRef } from 'react'
import {useEffect, useState} from 'react'
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast} from 'firebase/firestore';
import {db, storage} from '../../firebase.js';  
import ImageModal from '../ImageModal.js';
import {useParams} from 'react-router-dom';
import ImageSlider from '../ImageSlider.js';
import { Card } from '../ui/card.js';
import { Button } from '../ui/button.js';
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";
import { getDownloadURL, listAll, ref, StorageReference, deleteObject } from 'firebase/storage';
import Modal from '../Modal.js';
import { Input } from '../ui/input.js';
import { onAuthStateChanged } from 'firebase/auth';

function RetreatCenterDetails() {
  {  /***Retreat center information extraced from database */}
    const [nameOfCenter, setNameOfCenter] = useState("");
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [kind, setKind] = useState('')
    const [airport, setAirport] = useState('')
    const [inquiryModal, setInquiryModal] = useState(false)
    const [centerId, setCenterId] = useState('')
    const [price, setPrice] = useState(0.0)
    const [airportPickup, setAirportPickup] = useState("")
   {/**Host information */}
    const [hostId, setHostId] = useState('')
    {/**image information */}
    const [openImageModal, setOpenImageModal] = useState(false)
    const [imageList, setImageList] = useState([]);
    const [hostIsUser, setHostIsUser] = useState(false)
        const form = useRef();
    
    const [formData, setFormData] = useState({
          user_name:"",
          user_email:"",
          user_message:""
         })
 
       
    
    
    const { toast } = useToast();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
  const pic="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/download.gif?alt=media&token=535e9111-7cfb-492b-af8b-e128b41472e5"
    
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
      description: `Thank you for your interest in ${nameOfCenter} in ${location}. We will get back to you soon!` ,
    });
    // Reset form
   
                    }
    const viewAllPhotos=()=>{
  setOpenImageModal(true)
  
}
     const params = useParams();
    const id = params.id;
    useEffect(() => {
     window.scrollTo(0,0)
     
    const q1 =query(collection(db, "centers"), where ("id", "==", id));
              getDocs(q1).then((querySnapshot) => {
             
              const retreats: any[] = [];
              querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data().name);
                retreats.push({ ...doc.data() });
                setNameOfCenter(doc.data().retreatCenterName);
                setLocation(doc.data().location)
                setAddress(doc.data().address)
                setKind(doc.data().kind)
                setAirport(doc.data().nearestAirport)
                setHostId(doc.data().hostId)
                setCenterId(doc.data().centerId)
                setPrice(doc.data().price)
                setAirportPickup(doc.data().airportService)
                
              })

            })
                  setFormData({
           user_name: "",
    user_email: "",
    user_message: `Hello, I am interested in attending your retreat called ${nameOfCenter} in ${location}. Please let me know if there is availability and any additional information I should know. Thank you!`,
        })
              const imageListRef = ref(storage, `/centerimages/${centerId}/`);
              listAll(imageListRef).then((res)=>{
                                          res.items.forEach((item)=>{
                                            getDownloadURL(item).then((url)=>{
                                              setImageList((prev)=>[...prev, url]);
                                              
                                            });
                                          });
                                        });
            
}, [id, centerId])
    
   
  return (          
       <div className="relative h-auto min-h-auto w-full overflow-hidden lg:flex md:grid-cols-1 justify-center items-center justify-items-center"  style={{ backgroundColor:'lightGray', color:'black'}}>
         <Modal isOpen={inquiryModal} onClose={()=>setInquiryModal(false)} >
            <form className="bg-white p-6 rounded shadow-md w-96 mt-20" onSubmit={handleSubmit} ref={form}>
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
         <h1 className='text-4xl bold mt-20'>{nameOfCenter}</h1>
         <br/>
         
<center>
<div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:flex  gap-2 w-full m-4 mt-10 justify-center align-center items-center justify-items-center">
  
  {imageList.length > 0 &&  imageList.slice(0, 3).map((imageUrl, index) => (
             
             <Card className="rounded-xl w-100 overflow-hidden border-none shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer " onClick={viewAllPhotos} key={index}>
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />
      
    </Card>
))}

 
</div>
</center>
<div className="w-full h-full flex lg:justify-center  md:justify-center sm:justify-center sm:grid-cols-1 items-center bg-transparent">
 <Button className="bg-lime-700 hover:bg-white text-center sm:w-full sm:justify-center lg:w-60 hover:text-lime-700  text-white  m-2"  onClick={viewAllPhotos}>
    View all photos
  </Button>
         <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 lg:w-60 text-center text-white m-2 justify-items: right" onClick={()=>setInquiryModal(true)}>Inquire</Button>
   

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
          <h1 className='text-2xl font-bold'>{nameOfCenter}</h1>
          <h1 className='text-xl'>{location}</h1>
          <h1 className='text-xl'>{address}</h1>

               
                   <center>
          <div className="text-center w-3/4  lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 justify-center align-center p-10 rounded-lg lg:flex sm:grid-cols-1 m-4 gap-4 items-center justify-items-center bg-white">

            <div>

            <p className='w-60 md:w-full sm:w-full p-10'>{kind}</p>
            <div className='border-2 rounded w-full'>
            <h1 className='text-2xl mb-4'>How do you get there?</h1>
                                    <h1 className='text-xl m-2'><strong>Nearest Airport:</strong> {airport}</h1>
                                                                        <h1 className='text-xl m-2'><strong>Airport Pickup Service:</strong> {airportPickup}</h1>

                                    <h1 className='text-xl m-2'><strong>Average price per night:</strong>&nbsp;${price}</h1>

                                    </div>
            </div>
            <div>

                          

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
            </center>
                          <center>      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 h-auto">

  {imageList.length > 0 &&  imageList.map((imageUrl, index) => (
             <Card className="rounded-xl w-100 flex overflow-hidden border-none m-4 shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer h-80 "  key={index}>
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg h-70" src={imageUrl} alt="Retreats Around The World" />
      
    </Card>
    
))}
          </div>
          </center>
          </div>
      
        
</div>
  )
}

export default RetreatCenterDetails