import React from 'react'
import {useEffect, useState} from 'react'
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast} from 'firebase/firestore';
import {db, storage} from '../../firebase.js';  
import ImageModal from '../ImageModal.js';
import {useParams} from 'react-router-dom';
import ImageSlider from '../ImageSlider.js';
import { Card } from '../ui/card.js';
import { Button } from '../ui/button.js';
import { getDownloadURL, listAll, ref, StorageReference, deleteObject } from 'firebase/storage';

function RetreatCenterDetails() {
  {  /***Retreat center information extraced from database */}
    const [nameOfCenter, setNameOfCenter] = useState([]);
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [kind, setKind] = useState('')
    const [airport, setAirport] = useState('')
    const [centerId, setCenterId] = useState('')
   {/**Host information */}
    const [hostId, setHostId] = useState('')
    {/**image information */}
    const [openImageModal, setOpenImageModal] = useState(false)
    const [imageList, setImageList] = useState([]);
    const [hostIsUser, setHostIsUser] = useState(false)
    
  const pic="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/download.gif?alt=media&token=535e9111-7cfb-492b-af8b-e128b41472e5"

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
                setNameOfCenter(doc.data().name);
                setLocation(doc.data().location)
                setAddress(doc.data().address)
                setKind(doc.data().kind)
                setAirport(doc.data().airport)
                setHostId(doc.data().hostId)
                setCenterId(doc.data().centerId)
              })

            })
              const imageListRef = ref(storage, `/centerimages/${centerId}/`);
              listAll(imageListRef).then((res)=>{
                                          res.items.forEach((item)=>{
                                            getDownloadURL(item).then((url)=>{
                                              setImageList((prev)=>[...prev, url]);
                                              
                                            });
                                          });
                                        });
            
}, [id,, centerId])
    
   
  return (          
             <div className="relative h-auto min-h-auto w-full overflow-hidden lg:flex md:grid-cols-1 justify-center items-center justify-items-center"  style={{ backgroundColor:'lightGray', color:'black'}}>

            
        <ImageModal isOpen={openImageModal} onClose={()=>setOpenImageModal(false)} >
          
   <div className="w-full h-full justify-center items-center bg-transparent">
     <ImageSlider slides={imageList} />
    
      </div>
      
     </ImageModal>
     
        <div className="max-w-full mx-auto text-center">
         <h1 className='text-4xl bold mt-4'>{nameOfCenter}</h1>
         <br/>
         
<center>
<div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:flex  gap-2 w-full m-4 mt-10 justify-center align-center items-center justify-items-center">
  
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
            <div className='border-2 rounded w-80'>
            <h1 className='text-2xl mb-4'>How do you get there?</h1>
                                    <h1>Nearest Airport: {airport}</h1>
                                    

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
                        
          </div>
        
</div>
  )
}

export default RetreatCenterDetails