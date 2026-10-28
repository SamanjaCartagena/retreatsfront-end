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
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function RetreatCenterDetails() {
  {  /***Retreat center information extraced from database */}
    const [nameOfCenter, setNameOfCenter] = useState("");
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [kind, setKind] = useState('')
    const [airport, setAirport] = useState('')
    const [inquiryModal, setInquiryModal] = useState(false)
    const [price, setPrice] = useState(0.0)
    const [airportPickup, setAirportPickup] = useState("")
    const [openSomething, setOpenSomething] = useState(false)
    const [openList, setOpenList] = useState(false)
    const [openList1, setOpenList1] = useState(false)
    const [openList2, setOpenList2] = useState(false)
    const [openList3, setOpenList3] = useState(false)
    const [openList4, setOpenList4] = useState(false)
    const [openList5, setOpenList5] = useState(false)
    const [centerRoom1Exists, setCenterRoom1Exists] = useState(false)
    const [centerRoom2Exists, setCenterRoom2Exists] = useState(false)
    const [centerRoom3Exists, setCenterRoom3Exists] = useState(false)
    const [centerRoom4Exists, setCenterRoom4Exists] = useState(false)
    const [centerRoom5Exists, setCenterRoom5Exists] = useState(false)
    const [centerNightRoom1, setCenterNightRoom1] = useState(false)
        const [centerNightRoom2, setCenterNightRoom2] = useState(false)
        const [centerNightRoom3, setCenterNightRoom3] = useState(false)
    const [centerNightRoom4, setCenterNightRoom4] = useState(false)
        const [centerNightRoom5, setCenterNightRoom5] = useState(false)

    const [groupRateRoom, setGroupRateRoom] = useState("")
    const [imageUrl, setImageUrl] = useState('')
   {/**Host information */}
    const [hostId, setHostId] = useState('')
    {/**image information */}
    const [openImageModal, setOpenImageModal] = useState(false)
    const [imageList, setImageList] = useState([]);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [photoIndex1, setPhotoIndex1] = useState(0)
    const [hostIsUser, setHostIsUser] = useState(false)
   { /***Rooms available */} 
   {/***Room 1 */}
        const [imageListRoom1, setImageListRoom1] = useState([])
        const [accommodation1,setAccommodation1] = useState("")
                const [priceRoom1, setPriceRoom1] = useState(0.0)




        const [imageListRoom2, setImageListRoom2] = useState([])
        const [accommodation2,setAccommodation2] = useState("")
        const [priceRoom2, setPriceRoom2] = useState(0.0)
        const [imageListRoom3, setImageListRoom3] = useState([])
        const [accommodation3,setAccommodation3] = useState("")
        const [facilites, setFacilities] = useState("")
        const [priceRoom3, setPriceRoom3] = useState(0.0)
        const [imageIndex, setImageIndex] = useState(0)
        
    {/**Room 4 */}
    const [imageListRoom4, setImageListRoom4] = useState([])
    const [accommodation4, setAccommodation4] = useState("")
    const [priceRoom4, setPriceRoom4] = useState(0.0)

  {/**Room 5 */}
  const [imageListRoom5, setImageListRoom5] = useState([])
  const [accommodation5, setAccommodation5] = useState("")
  const [priceRoom5, setPriceRoom5] = useState(0.0)




        const form = useRef();
        const auth=getAuth()
    const [centerId, setCenterId] = useState('');
            

    
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
    const viewAllPhotos=(i)=>{
      
      setPhotoIndex(i)
  setOpenList(true)
  
}
const passImageUrl=(i)=>{
  setPhotoIndex(i)
  setOpenSomething(true)
}
const passImageUrl1=(i)=>{
  setImageIndex(i)
  setOpenList1(true)
}
const passImageUrl2=(i)=>{
  setPhotoIndex(i)
  setOpenList2(true)
}
const passImageUrl3=(i)=>{
  setPhotoIndex(i)
  setOpenList3(true)
}
     const params = useParams();
    const id = params.id;
    useEffect(() => {
     window.scrollTo(0,0)
     onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if(uid === hostId){
          setHostIsUser(true)
        }
      } else {
        // User is signed out
        // ...
      }
    });
    
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
                setAccommodation1(doc.data().accommodation1)
                setPriceRoom1(doc.data().priceRoom1)
                setAccommodation2(doc.data().accommodation2)
                setPriceRoom2(doc.data().priceRoom2)
                setPriceRoom4(doc.data().priceRoom4)
                setAccommodation3(doc.data().accommodation3)
                setAccommodation4(doc.data().accommodation4)
                setAccommodation5(doc.data().accommodation5)
                setPriceRoom3(doc.data().priceRoom3)
                setPriceRoom5(doc.data().priceRoom5)
                setFacilities(doc.data().facilities)
                setGroupRateRoom(doc.data().groupRateRoom)
                setCenterRoom1Exists(doc.data().centerRoom1Exists)
                setCenterRoom2Exists(doc.data().centerRoom2Exists)
                setCenterRoom3Exists(doc.data().centerRoom3Exists)
                setCenterRoom4Exists(doc.data().centerRoom4Exists)
                setCenterRoom5Exists(doc.data().centerRoom5Exists)
                setCenterNightRoom1(doc.data().centerNightRoom1)
                setCenterNightRoom2(doc.data().centerNightRoom2)
                setCenterNightRoom3(doc.data().centerNightRoom3)
                setCenterNightRoom4(doc.data().centerNightRoom4)
                setCenterNightRoom5(doc.data().centerNightRoom5)

              

              })

            })
                  setFormData({
           user_name: "",
    user_email: "",
    user_message: `Hello, I am interested in attending your retreat called ${nameOfCenter} in ${location}. Please let me know if there is availability and any additional information I should know. Thank you!`,
        })
              const imageListRef = ref(storage, `/centerImages/${centerId}/`);
              listAll(imageListRef).then((res)=>{
                                          res.items.forEach((item)=>{
                                            getDownloadURL(item).then((url)=>{
                                              setImageList((prev)=>[...prev, url]);
                                              
                                            });
                                          });
                                        });
                  
                  const imageListRefRoom1 = ref(storage, `/centerImages/room1/${centerId}/`);
                  listAll(imageListRefRoom1).then((res)=>{
                                        res.items.forEach((item)=>{
                                          getDownloadURL(item).then((url)=>{
                                            setImageListRoom1((prev)=>[...prev, url]);
                                            
                                          });
                                        });
                                      });
                  const imageListRefRoom2 = ref(storage, `/centerImages/room2/${centerId}/`);
                  listAll(imageListRefRoom2).then((res)=>{
                                        res.items.forEach((item)=>{
                                          getDownloadURL(item).then((url)=>{
                                            setImageListRoom2((prev)=>[...prev, url]);
                                            
                                          });
                                        });
                                      });
                  const imageListRefRoom3 = ref(storage, `/centerImages/room3/${centerId}/`);
                  listAll(imageListRefRoom3).then((res)=>{
                                        res.items.forEach((item)=>{
                                          getDownloadURL(item).then((url)=>{
                                            setImageListRoom3((prev)=>[...prev, url]);
                                            
                                          });
                                        });
                                      });
                 const imageListRefRoom4 = ref(storage, `/centerImages/room4/${centerId}/`);
                  listAll(imageListRefRoom4).then((res)=>{
                                        res.items.forEach((item)=>{
                                          getDownloadURL(item).then((url)=>{
                                            setImageListRoom4((prev)=>[...prev, url]);
                                            
                                          });
                                        });
                                      });
                const imageListRefRoom5 = ref(storage, `/centerImages/room5/${centerId}/`);
                  listAll(imageListRefRoom5).then((res)=>{
                                        res.items.forEach((item)=>{
                                          getDownloadURL(item).then((url)=>{
                                            setImageListRoom5((prev)=>[...prev, url]);
                                            
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
            
     
     
        <div className="max-w-full mx-auto text-center">
         <h1 className='text-4xl bold mt-20'> {nameOfCenter}</h1>
         <br/>
         
<center>
<div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3  gap-2   m-4 mt-6 justify-center align-center items-center justify-items-center" >
  
  {imageList.length > 0 &&  imageList.slice(0, 3).map((imageUrl, index) => (
             
       <img className="w-60  md:w-50 h-70 lg:w-1/2 sm:w-full items-center cursor-pointer" src={imageUrl} alt="Retreats Around The World"  onClick={()=>viewAllPhotos(index)} key={index}/>
      
))}
 <ImageModal isOpen={openList}  >
                <ImageSlider slides={imageList} index={photoIndex} closeSlider={()=>setOpenList(false)}/>

                  </ImageModal>
 
</div>
</center>
<div className="container w-full h-full flex lg:flex items-center md:justify-center sm:items-center sm:grid-cols-1  bg-transparent">
 <Button className="bg-lime-700 hover:bg-white text-center sm:grid sm:w-full  lg:w-60  items-center hover:text-lime-700  text-white  m-2"  onClick={()=>viewAllPhotos(0)}>
    View all photos
  </Button>
         <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 sm:grid lg:w-60 text-center text-white m-2 justify-items: right" onClick={()=>setInquiryModal(true)}>Inquire</Button>
   

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
          <h1 className='text-lg font-bold'>{nameOfCenter}</h1>
          <h1 className='text-lg h-auto'>{address}</h1>
                    <h1 className='text-lg h-auto'>{location}</h1>

               
                   <center>
          <div className="text-center w-3/4  lg:grid md:grid-cols-1 sm:grid-cols-1 justify-center align-center p-10 rounded-lg lg:flex sm:grid-cols-1 m-4 gap-4 items-center justify-items-center bg-white">
                                                <p className='w-60 md:w-full sm:w-full p-10'>{kind}</p>

                                    <h1 className='text-lg m-2'><strong>Average price per night:</strong>&nbsp;${price}</h1>

            <div>
                        <div className='border-2 rounded w-full m-4'>   
                          <h1 className='text-lg h-auto font-semibold p-4'>Facilities Provided</h1>
                          <h1 className='text-lg h-auto p-4'>{facilites}</h1>

                      </div>
                      <div className='border-2 rounded w-full m-4 p-4'>   
                          <h1 className='text-lg h-auto font-semibold'>Group Rate</h1>
                          <h1 className='text-lg h-auto'>{groupRateRoom}</h1>

                      </div>
            <div className='border-2 rounded w-full p-4'>
            <h1 className='text-lg font-bold mb-4'>How do you get there?</h1>
                                    <h1 className='text-lg m-2'><strong>Nearest Airport:</strong> {airport}</h1>                            
                                                                        <h1 className='text-lg m-2'><strong>Airport Pickup Service:</strong> {airportPickup}</h1>


                                    </div>
            </div>

            {centerRoom1Exists &&
            <div>
                                                     <h1 className='text-lg h-auto font-semibold'>Room 1</h1>

                              <div className='border-2 p-4 flex'>

                   <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 h-auto w-80% justify-center items-center justify-items-center align-center m-4">

            {imageListRoom1.length > 0 &&  imageListRoom1.slice(0,3).map((imageUrl, index) => (
              
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg h-70 cursor-pointer" src={imageUrl} alt="Retreats Around The World" key={index} onClick={()=>passImageUrl1(index)} />
                
              
              
                  
              
          ))}
          </div>
          
                
                <ImageModal isOpen={openList1}  >
                <ImageSlider slides={imageListRoom1} index={imageIndex} closeSlider={()=>setOpenList1(false)}/>

                  </ImageModal>
                  <br/>
                  <div className='w-full grid'>
                                  <h1 className='text-lg h-auto'>{accommodation1}</h1>
                                  {centerNightRoom1 &&
                                  <h1 className='text-lg h-auto'>Price: ${priceRoom1}</h1>
                                  }

                                  </div>
               

                    
                    </div>
                </div>          
                
          }
            <br/>
            {centerRoom2Exists &&
            <div>
                               <h1 className='text-lg h-auto font-semibold'>Room 2</h1>

         <div className='border-2 p-4 flex '>
                   <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 h-auto w-80% justify-center items-center justify-items-center align-center m-4">

  {imageListRoom2.length > 0 &&  imageListRoom2.slice(0, 3).map((imageUrl, index) => (
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg h-70 cursor-pointer" src={imageUrl} alt="Retreats Around The World"  key={index} onClick={()=>passImageUrl2(index)}/>
      
    
))}
          </div>
           <ImageModal isOpen={openList2} >
                <div className="w-90% h-full justify-center items-center bg-transparent">
                     <ImageSlider slides={imageListRoom2} index={photoIndex} closeSlider={()=>setOpenList2(false)} />


                  </div>
                  </ImageModal>
            <br/>
             <div className='grid w-full'>
                                  <h1 className='text-lg h-auto'>{accommodation2}</h1>
                                  {centerNightRoom2 &&
                                  <h1 className='text-lg h-auto'>Price: ${priceRoom2}/night</h1>
}
                                  </div>
                    
           
        

                  </div>
                  </div>
}
{centerRoom3Exists &&
<div>
                                  <h1 className='text-lg h-auto font-semibold'>Room 3</h1>
                                  <div className='border-2 p-4 flex'>
                                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 h-auto w-80% justify-center items-center justify-items-center align-center m-4">

  {imageListRoom3.length > 0 &&  imageListRoom3.slice(0, 3).map((imageUrl, index) => (
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg h-70 cursor-pointer" src={imageUrl} alt="Retreats Around The World"  key={index} onClick={()=>passImageUrl3(index)}/>
      
    
))}
          </div>
          <ImageModal isOpen={openList3} >
                <div className="w-90% h-full justify-center items-center bg-transparent">
                     <ImageSlider slides={imageListRoom3} index={photoIndex} closeSlider={()=>setOpenList3(false)} />


                  </div>
                  </ImageModal>

             <div className='grid w-full'>

                                  <h1 className='text-lg h-auto'>{accommodation3}</h1>
                                  {centerNightRoom3 &&
                                  <h1 className='text-lg h-auto'>Price: ${priceRoom3}/night</h1>
}
                          
            
                  </div>
                  </div>
                  </div>
}
            <br/>
            {centerRoom4Exists &&
                 <div>
                   <h1 className='text-lg h-auto font-semibold'>Room 4</h1>
                   <div className='border-2 p-4 flex'>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 h-auto w-80% justify-center items-center justify-items-center align-center m-4">

  {imageListRoom4.length > 0 &&  imageListRoom4.slice(0, 3).map((imageUrl, index) => (
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg h-70 cursor-pointer" src={imageUrl} alt="Retreats Around The World"  key={index} onClick={()=>passImageUrl3(index)}/>
      
    
))}
          </div>
             <ImageModal isOpen={openList4} >
                <div className="w-90% h-full justify-center items-center bg-transparent">
                     <ImageSlider slides={imageListRoom4} index={photoIndex} closeSlider={()=>setOpenList4(false)} />


                  </div>
                  </ImageModal>
                  <div className='grid w-full'>
                                  <h1 className='text-lg h-auto'>{accommodation4}</h1>
                                  {centerNightRoom4 &&
                                  <h1 className='text-lg h-auto'>Price: ${priceRoom4}/night</h1>
                                  
                      }
              </div>
             
         
                  </div>
                  </div>
}
               {centerRoom5Exists &&
                  <div>
                   <h1 className='text-lg h-auto font-semibold'>Room 5</h1>
                   <div className='border-2 flex p-4'>
                     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 h-auto w-80% justify-center items-center justify-items-center align-center m-4">

  {imageListRoom5.length > 0 &&  imageListRoom5.slice(0, 3).map((imageUrl, index) => (
      <img className="w-85 md:w-50 lg:w-full items-center rounded-lg h-70 cursor-pointer" src={imageUrl} alt="Retreats Around The World"  key={index} onClick={()=>passImageUrl3(index)}/>
      
    
))}
          </div>
           <ImageModal isOpen={openSomething} >
                        <ImageSlider slides={imageList} index={photoIndex} closeSlider={()=>setOpenSomething(false)}/>


                  </ImageModal>
                              <div className='w-full grid'>
                                  <h1 className='text-lg h-auto'>{accommodation5}</h1>
                                  {centerNightRoom5 &&
                                  <h1 className='text-lg h-auto'>Price: ${priceRoom5}/night</h1>
}
</div>
                            
            </div>
                  </div>
}
            
             
               <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3  gap-2   m-4 mt-6 justify-center align-center items-center justify-items-center" >
  
  {imageList.length > 0 &&  imageList.map((imageUrl, index) => (
             
       <img className="w-60  md:w-50 h-70 lg:w-80 sm:w-full items-center cursor-pointer" src={imageUrl} alt="Retreats Around The World"  onClick={()=>viewAllPhotos(index)} key={index}/>
      
))}
 <ImageModal isOpen={openList}  >
                <ImageSlider slides={imageList} index={photoIndex} closeSlider={()=>setOpenList(false)}/>

                  </ImageModal>
 
</div>

                    

                  
            </div>
            </center>
            
         
          </div>
      
        
</div>
  )
}

export default RetreatCenterDetails