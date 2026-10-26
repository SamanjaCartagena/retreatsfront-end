import React,{useState, useEffect} from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc,serverTimestamp, Timestamp} from "firebase/firestore";
import { db, auth,storage} from "../../firebase.js";

import { useParams, useNavigate } from 'react-router-dom';
import {v4} from 'uuid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import pic from '../../assets/form.png';
import { Button } from '../ui/button.js';
import Modal from '../Modal.js';
import nodemailer from 'nodemailer';
function ListARetreat() {
  {/**Retreat Center Information */}
   const[retreatCenterName, setRetreatCenterName]= useState("")
   const [name, setName] = useState("")
   const[retreatType, setRetreatType] = useState("")
   const[address,setAddress] = useState("")
   const[country,setCountry] = useState("")
   const [startDate, setStartDate] = useState(null)
   const [endDate, setEndDate] = useState(null)
   const [state, setState] = useState("")
   const [currency, setCurrency] = useState("USD");
   const[price,setPrice] = useState(0.00)
   const [value, setValue] = React.useState<Dayjs | null>();
   const [kind,setKind] = useState("")
   const[isTerms, setIsTerms] = useState(false)
   const [hostId, setHostId] = useState("")
   const [documentId,setDocumentId] = useState("")
   const [nearestAirport, setNearestAirport] = useState("")
   const [pickupService, setPickupService] = useState("")
   const [year, setYear] = useState("")
   const [month, setMonth] = useState("")
   const [highlights, setHighlights] = useState("")
   /***Schedule */
   const [aboutFood, setAboutFood] = useState("")
  
  const [pricePerNightRoom1, setPricePerNightRoom1] = useState(false)
  const [pricePerNightRoom2, setPricePerNightRoom2] = useState(false)
  const [pricePerNightRoom3, setPricePerNightRoom3] = useState(false)
  const [pricePerNightRoom4, setPricePerNightRoom4] = useState(false)
  const [pricePerNightRoom5, setPricePerNightRoom5] = useState(false)



   const [type1, setType1] = useState("")
   const [type2, setType2] = useState("")
   const [type3, setType3] = useState("")


   const [hostFirstName, setHostFirstName] = useState("")
   const [host2Exists, setHost2Exists] = useState(false)
   const [aboutHost2, setAboutHost2] = useState("")
   const [host2ProfilePicUrl, setHost2ProfilePicUrl] = useState("")
   const [host3Exists, setHost3Exists] = useState(false)
   const [host2FirstName, setHost2FirstName] = useState("")
   const [host2LastName, setHost2LastName] = useState("")
   const [host3FirstName, setHost3FirstName] = useState("")
   const [host3LastName,setHost3LastName] = useState("")
   const [aboutHost3, setAboutHost3] = useState("")
   const [host4Exists, setHost4Exists] = useState(false)
   const [host4FirstName, setHost4FirstName] = useState("")
   const [host4LastName, setHost4LastName]  = useState("")
   const [aboutHost4, setAboutHost4] = useState("")
   const [chefExists, setChefExists] = useState(false)
   const [chefFirstName, setChefFirstName] = useState("")
   const [chefLastName, setChefLastName] = useState("")
   const [aboutChef, setAboutChef] = useState("")
   const [hostEmail, setHostEmail]  = useState("")
   const [hostLastName, setHostLastName] = useState("")
   const [imageUpload, setImageUpload] = useState(null);
   const [avatarUrl, setAvatarUrl] = useState("");
   const [imageList, setImageList] = useState([]);
   const [imageListChef, setImageListChef] = useState([])
   const [selectedMonth, setSelectedMonth] = useState(dayjs().format('MM/DD/YYYY'));
   /**Add Rooms */
      const [accommodation1, setAccommodation1] = useState("")
      const [accommodation2, setAccommodation2] = useState("")
      const [accommodation3, setAccommodation3] = useState("")
      const [accommodation4, setAccommodation4] = useState("")
      const [accommodation5, setAccommodation5] = useState("")
      const [priceRoom1, setPriceRoom1] = useState(0.0)
      const [priceRoom2, setPriceRoom2] = useState(0.0)
      const [priceRoom3, setPriceRoom3] = useState(0.0)
      const [priceRoom4, setPriceRoom4] = useState(0.0)
      const [priceRoom5, setPriceRoom5] = useState(0.0)
      const [imageListRoom1, setImageListRoom1] = useState([])
      const [imageListRoom2, setImageListRoom2] = useState([])
      const [imageListRoom3, setImageListRoom3] = useState([])
      const [imageListRoom4, setImageListRoom4] = useState([])
      const [imageListRoom5, setImageListRoom5] = useState([])
      /**Hosts Images */
      const [imageListHost2, setImageListHost2] = useState([])
      const [imageListHost3, setImageListHost3] = useState([])
      const [imageListHost4, setImageListHost4] = useState([])
    


      const [welcomeMessage, setWelcomeMessage] = useState("")
      const [totalPriceRoom1, setTotalPriceRoom1] = useState(0.0)
      const [totalPriceRoom2, setTotalPriceRoom2]= useState(0.0)
      const [totalPriceRoom3, setTotalPriceRoom3] = useState(0.0)
      const [totalPriceRoom4, setTotalPriceRoom4] = useState(0.0)
      const [totalPriceRoom5, setTotalPriceRoom5] = useState(0.0)
      const [room1Exists, setRoom1Exists] =useState(false)
      const [room2Exists, setRoom2Exists] = useState(false)
      const [room3Exists, setRoom3Exists] = useState(false)
      const [room4Exists, setRoom4Exists] = useState(false)
      const [room5Exists, setRoom5Exists] = useState(false)
   const [includesRoom1Breakfast, setIncludesRoom1Breakfast] = useState("")
   const [includesRoom2Breakfast, setIncludesRoom2Breakfast] = useState("")
   const [includesRoom3Breakfast, setIncludesRoom3Breakfast] = useState("")
   const [includesRoom4Breakfast, setIncludesRoom4Breakfast] = useState("")
   const [includesRoom5Breakfast, setIncludesRoom5Breakfast] = useState("")
   const [includesWifiRoom1, setIncludesWifiRoom1] = useState("")
   const [includesWifiRoom2, setIncludesWifiRoom2] = useState("")
   const [includesWifiRoom3, setIncludesWifiRoom3] = useState("")
   const [includesWifiRoom4, setIncludesWifiRoom4] = useState("")
   const [includesWifiRoom5, setIncludesWifiRoom5] = useState("")
      const [nameOfCity, setNameOfCity] = useState("")
      const [imageListCity, setImageListCity] = useState([]);
      const [imageListFood, setImageListFood] = useState([])
         const [city,setCity] = useState("")



   const [notIncluded, setNotIncluded] = useState("")
      const [flightIncluded, setFlightIncluded] = useState("")

      const [retreatKindId, setRetreatKindId] = useState(Math.floor(Math.random() * 1000000));
   const params = useParams();
   const userId = params.id;
   const navigate= useNavigate()
   

       const imageListRef = ref(storage, `/retreatimages/${retreatKindId}/`);

    const imageListRef1 = ref(storage, `/retreatimages/room1/${retreatKindId}/`);
        const imageListRef2 = ref(storage, `/retreatimages/room2/${retreatKindId}/`);
        const imageListRef3 = ref(storage, `/retreatimages/room3/${retreatKindId}/`);
        const imageListRef4 = ref(storage, `/retreatimages/room3/${retreatKindId}/`);
        const imageListRefChef = ref(storage,`/retreatimages/chef/${retreatKindId}/` )
        
     const deleteImageCity=(url)=>{
        event.preventDefault()
        const imageRef2 = ref(storage, url);
        deleteObject(imageRef2).then(() => {
          setImageListCity((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
     const deleteImageHost2=(url)=>{
        event.preventDefault()
        const imageRef2 = ref(storage, url);
        deleteObject(imageRef2).then(() => {
          setImageListHost2((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
       const deleteImageHost3=(url)=>{
        event.preventDefault()
        const imageRef2 = ref(storage, url);
        deleteObject(imageRef2).then(() => {
          setImageListHost3((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
       const deleteImageHost4=(url)=>{
        event.preventDefault()
        const imageRef2 = ref(storage, url);
        deleteObject(imageRef2).then(() => {
          setImageListHost4((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
    const deleteImage=(url)=>{
            event.preventDefault()
        const imageRef = ref(storage, url);
        deleteObject(imageRef).then(() => {
          setImageList((prev)=>prev.filter((imageUrl)=>imageUrl!==url));

        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
     const deleteImageFood=(url)=>{
              event.preventDefault()
        const imageRef = ref(storage, url);
        deleteObject(imageRef).then(() => {
          setImageListFood((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
      const deleteImageRoom1=(url)=>{
              event.preventDefault()
        const imageRef = ref(storage, url);
        deleteObject(imageRef).then(() => {
          setImageListRoom1((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
     const deleteImageRoom2=(url)=>{
             event.preventDefault()

      const imageRef = ref(storage, url);
        deleteObject(imageRef).then(() => {
          setImageListRoom2((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
     const deleteImageRoom3=(url)=>{
              event.preventDefault()

      const imageRef = ref(storage, url);
        deleteObject(imageRef).then(() => {
          setImageListRoom3((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
      const deleteImageRoom4=(url)=>{
              event.preventDefault()

      const imageRef = ref(storage, url);
        deleteObject(imageRef).then(() => {
          setImageListRoom4((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     } 
     const deleteImageRoom5=(url)=>{
              event.preventDefault()

      const imageRef = ref(storage, url);
        deleteObject(imageRef).then(() => {
          setImageListRoom5((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
       const deleteImageChef=(url)=>{
        event.preventDefault()
        const imageRef2 = ref(storage, url);
        deleteObject(imageRef2).then(() => {
          setImageListChef((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
          const uploadCityImage=(e)=>{
        e.preventDefault();
       // Create a root reference
       if(imageUpload == null){ return;}
       else{
       
       const imageCityRef = ref(storage, `/retreatimages/${retreatKindId}/${nameOfCity}/${imageUpload.name+v4()}`);
       uploadBytes(imageCityRef, imageUpload).then((snapshot)=>{
         getDownloadURL(snapshot.ref).then((url)=>{
           setImageListCity((prev)=>[...prev, url]);
         }
         );
       });
   
     }  
    }
       const uploadChefImage=(e)=>{
        e.preventDefault();
       // Create a root reference
       if(imageUpload == null){ return;}
       else{
       
       const imageCityRef = ref(storage, `/retreatimages/chef/${retreatKindId}/${imageUpload.name+v4()}`);
       uploadBytes(imageCityRef, imageUpload).then((snapshot)=>{
         getDownloadURL(snapshot.ref).then((url)=>{
           setImageListChef((prev)=>[...prev, url]);
         }
         );
       });
   
     }  
    }
     const uploadHost2Image=(e)=>{
        e.preventDefault();
       // Create a root reference
       if(imageUpload == null){ return;}
       else{
       
       const imageHost2Ref = ref(storage, `/retreatimages/host2/${retreatKindId}/${imageUpload.name+v4()}`);
       uploadBytes(imageHost2Ref, imageUpload).then((snapshot)=>{
         getDownloadURL(snapshot.ref).then((url)=>{
           setImageListHost2((prev)=>[...prev, url]);
         }
         );
       });
   
     }  
    }
      const uploadHost3Image=(e)=>{
        e.preventDefault();
       // Create a root reference
       if(imageUpload == null){ return;}
       else{
       
       const imageHost2Ref = ref(storage, `/retreatimages/host3/${retreatKindId}/${imageUpload.name+v4()}`);
       uploadBytes(imageHost2Ref, imageUpload).then((snapshot)=>{
         getDownloadURL(snapshot.ref).then((url)=>{
           setImageListHost3((prev)=>[...prev, url]);
         }
         );
       });
   
     }  
    }
    const uploadHost4Image=(e)=>{
        e.preventDefault();
       // Create a root reference
       if(imageUpload == null){ return;}
       else{
       
       const imageHost2Ref = ref(storage, `/retreatimages/host4/${retreatKindId}/${imageUpload.name+v4()}`);
       uploadBytes(imageHost2Ref, imageUpload).then((snapshot)=>{
         getDownloadURL(snapshot.ref).then((url)=>{
           setImageListHost4((prev)=>[...prev, url]);
         }
         );
       });
   
     }  
    }
    const uploadImage=(e)=>{
        e.preventDefault();
       // Create a root reference
       console.log("Upload Image");
       if(imageUpload == null) return;
       
       
       const imageRef = ref(storage, `/retreatimages/${retreatKindId}/${imageUpload.name+v4()}`);
       uploadBytes(imageRef, imageUpload).then((snapshot)=>{
         getDownloadURL(snapshot.ref).then((url)=>{
           setImageList((prev)=>[...prev, url]);
         }
         );
       });
   
      }
       const uploadFoodImage=(e)=>{
        e.preventDefault();
       // Create a root reference
       console.log("Upload Image");
       if(imageUpload == null) return;
       
       
       const imageRef = ref(storage, `/retreatimages/food/${retreatKindId}/${imageUpload.name+v4()}`);
       uploadBytes(imageRef, imageUpload).then((snapshot)=>{
         getDownloadURL(snapshot.ref).then((url)=>{
           setImageListFood((prev)=>[...prev, url]);
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
            
            
            const imageRef1 = ref(storage, `/retreatimages/room1/${retreatKindId}/${imageUpload.name+v4()}`);
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
            
            
            const imageRef2 = ref(storage, `/retreatimages/room2/${retreatKindId}/${imageUpload.name+v4()}`);
            uploadBytes(imageRef2, imageUpload).then((snapshot)=>{
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
            
            
            const imageRef3 = ref(storage, `/retreatimages/room3/${retreatKindId}/${imageUpload.name+v4()}`);
            uploadBytes(imageRef3, imageUpload).then((snapshot)=>{
              getDownloadURL(snapshot.ref).then((url)=>{
                setImageListRoom3((prev)=>[...prev, url]);
              }
              );
            });
        
          }
            const uploadImageRoom4=(e)=>{
             e.preventDefault();
            // Create a root reference
            console.log("Upload Image");
            if(imageUpload == null) return;
            
            
            const imageRef4 = ref(storage, `/retreatimages/room4/${retreatKindId}/${imageUpload.name+v4()}`);
            uploadBytes(imageRef4, imageUpload).then((snapshot)=>{
              getDownloadURL(snapshot.ref).then((url)=>{
                setImageListRoom4((prev)=>[...prev, url]);
              }
              );
            });
        
          }
          const uploadImageRoom5=(e)=>{
             e.preventDefault();
            // Create a root reference
            console.log("Upload Image");
            if(imageUpload == null) return;
            
            
            const imageRef5 = ref(storage, `/retreatimages/room5/${retreatKindId}/${imageUpload.name+v4()}`);
            uploadBytes(imageRef5, imageUpload).then((snapshot)=>{
              getDownloadURL(snapshot.ref).then((url)=>{
                setImageListRoom5((prev)=>[...prev, url]);
              }
              );
            });
        
          }
          /**profile host 2 */
   
    const doesHost2Exist=(e)=>{
    if(e.target.value=="Yes"){
    setHost2Exists(true)
  }
  else if(e.target.value =="No"){
    setHost2Exists(false)
  }
  else{
    setHost2Exists(false)
  }
}
 const doesHost3Exist=(e)=>{
    if(e.target.value=="Yes"){
    setHost3Exists(true)
  }
  else if(e.target.value =="No"){
    setHost3Exists(false)
  }
  else{
    setHost3Exists(false)
  }
}
 const doesHost4Exist=(e)=>{
    if(e.target.value=="Yes"){
    setHost4Exists(true)
  }
  else if(e.target.value =="No"){
    setHost4Exists(false)
  }
  else{
    setHost4Exists(false)
  }
}
const doesChefExist=(e)=>{
    if(e.target.value=="Yes"){
    setChefExists(true)
  }
  else if(e.target.value =="No"){
    setChefExists(false)
  }
  else{
    setChefExists(false)
  }
}
      const doesRoom1Exist=(e)=>{
    if(e.target.value=="Yes"){
    setRoom1Exists(true)
  }
  else if(e.target.value =="No"){
    setRoom1Exists(false)
  }
  else{
    setRoom1Exists(false)
  }
}
const doesPricePerNightExist=(e) =>{
  if(e.target.value=="Yes"){
    setPricePerNightRoom1(true)
  }
  else if(e.target.value =="No"){
    setPricePerNightRoom1(false)
  }
  else{
    setPricePerNightRoom1(false)
  }
}
const doesPricePerNightRoom2Exist=(e) =>{
  if(e.target.value=="Yes"){
    setPricePerNightRoom2(true)
  }
  else if(e.target.value =="No"){
    setPricePerNightRoom2(false)
  }
  else{
    setPricePerNightRoom2(false)
  }
}
  const doesPricePerNightRoom3Exist=(e) =>{
  if(e.target.value=="Yes"){
    setPricePerNightRoom3(true)
  }
  else if(e.target.value =="No"){
    setPricePerNightRoom3(false)
  }
  else{
    setPricePerNightRoom3(false)
  }
}
const doesPricePerNightRoom4Exist=(e) =>{
  if(e.target.value=="Yes"){
    setPricePerNightRoom4(true)
  }
  else if(e.target.value =="No"){
    setPricePerNightRoom4(false)
  }
  else{
    setPricePerNightRoom4(false)
  }
}
const doesPricePerNightRoom5Exist=(e) =>{
  if(e.target.value=="Yes"){
    setPricePerNightRoom5(true)
  }
  else if(e.target.value =="No"){
    setPricePerNightRoom5(false)
  }
  else{
    setPricePerNightRoom5(false)
  }
}
    const doesRoom2Exist=(e)=>{
    if(e.target.value=="Yes"){
    setRoom2Exists(true)
  }
  else if(e.target.value =="No"){
    setRoom2Exists(false)
  }
  else{
    setRoom2Exists(false)
  }
}
    const doesRoom3Exist=(e)=>{
    if(e.target.value=="Yes"){
    setRoom3Exists(true)
  }
  else if(e.target.value =="No"){
    setRoom3Exists(false)
  }
  else{
    setRoom3Exists(false)
  }
}
const doesRoom4Exist=(e)=>{
    if(e.target.value=="Yes"){
    setRoom4Exists(true)
  }
  else if(e.target.value =="No"){
    setRoom4Exists(false)
  }
  else{
    setRoom4Exists(false)
  }
}
const doesRoom5Exist=(e)=>{
    if(e.target.value=="Yes"){
    setRoom5Exists(true)
  }
  else if(e.target.value =="No"){
    setRoom5Exists(false)
  }
  else{
    setRoom5Exists(false)
  }
}
   const pricing =(event)=>{
    const doubleValueFloat = parseFloat(event.target.value);
    setPrice(doubleValueFloat)

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
    setPriceRoom3(doubleValueFloat)

   }
     const pricing4 =(event)=>{
    const doubleValueFloat = parseFloat(event.target.value);
    setPriceRoom4(doubleValueFloat)

   }
    const pricing5 =(event)=>{
    const doubleValueFloat = parseFloat(event.target.value);
    setPriceRoom5(doubleValueFloat)

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
   const priceTotalRoom4=(event) =>{
    const doubleValueFloat = parseFloat(event.target.value);
    setTotalPriceRoom4(doubleValueFloat)
   }
    const priceTotalRoom5=(event) =>{
    const doubleValueFloat = parseFloat(event.target.value);
    setTotalPriceRoom5(doubleValueFloat)
   }
     const startAtDate=(e)=>{
    const timestamp = Timestamp.fromDate(new Date(e));
    setMonth(e.format('MMMM'))

    setYear(e.format('YYYY'))
          
    setStartDate(timestamp)
  


}
const endAtDate=(e)=>{
  const timestamp1 = Timestamp.fromDate(new Date(e));
 setEndDate(timestamp1)
}

 


   const host =() => {
       const type = [type1, type2, type3].concat(retreatType).filter(Boolean);

      
         addDoc(collection(db, "retreats"), {
                                         type1: type,
                                         name:name,
                                         retreatCenterName: retreatCenterName,
                                         address: address,
                                         location: country,
                                         price:price, 
                                         id:v4()+userId,
                                         retreatId: retreatKindId,
                                         hostId:hostId,
                                         hostFirstName:hostFirstName,
                                         host2FirstName:host2FirstName,
                                         host2LastName:host2LastName,
                                         host2Exists:host2Exists,
                                         aboutHost2:aboutHost2,
                                         host3Exists:host3Exists,
                                         aboutHost3:aboutHost3,
                                         host3FirstName:host3FirstName,
                                         host3LastName:host3LastName,
                                         host4FirstName:host4FirstName,
                                         host4LastName:host4LastName,
                                         aboutHost4:aboutHost4,
                                         host4Exists:host4Exists,
                                         chefExists:chefExists,
                                         chefFirstName:chefFirstName,
                                         chefLastName:chefLastName,
                                         aboutChef:aboutChef,
                                         hostEmail:hostEmail,
                                         hostLastName:hostLastName,
                                         isDisplayed: true,
                                         startAt: startDate,
                                         endAt: endDate,
                                         kind: kind,
                                         month:month,
                                         year:year,
                                         nearestAirport:nearestAirport,
                                         airportPickup:pickupService,
                                         flightIncluded:flightIncluded,
                                         currency: currency,
                                         createdAt: serverTimestamp(),
                                         accommodation1: accommodation1,
                                         accommodation2:accommodation2,
                                         accommodation3:accommodation3,
                                         accommodation4:accommodation4,
                                         accommodation5:accommodation5,
                                         priceRoom1:priceRoom1,
                                         priceRoom2:priceRoom2,
                                         priceRoom3:priceRoom3,
                                         priceRoom4:priceRoom4,
                                         priceRoom5:priceRoom5,
                                         room1Exists:room1Exists,
                                         room2Exists:room2Exists,
                                         room3Exists:room3Exists,
                                         room4Exists:room4Exists,
                                         room5Exists:room5Exists,
                                         totalPriceRoom1: totalPriceRoom1,
                                         totalPriceRoom2: totalPriceRoom2,
                                         totalPriceRoom3:totalPriceRoom3,
                                         totalPriceRoom4:totalPriceRoom4,
                                         totalPriceRoom5:totalPriceRoom5,
                                         includesRoom1Breakfast:includesRoom1Breakfast,
                                         includesRoom2Breakfast:includesRoom2Breakfast,
                                         includesRoom3Breakfast:includesRoom3Breakfast,
                                         includesRoom4Breakfast:includesRoom4Breakfast,
                                         includesRoom5Breakfast:includesRoom5Breakfast,
                                         includesWifiRoom1:includesWifiRoom1,
                                         includesWifiRoom2:includesWifiRoom2,
                                         includesWifiRoom3:includesWifiRoom3,
                                         includesWifiRoom4:includesWifiRoom4,
                                         includesWifiRoom5:includesWifiRoom5,
                                         pricePerNightRoom1:pricePerNightRoom1,
                                         pricePerNightRoom2:pricePerNightRoom2,
                                         pricePerNightRoom3:pricePerNightRoom3,
                                         pricePerNightRoom4:pricePerNightRoom4,
                                         pricePerNightRoom5:pricePerNightRoom5,
                                         foodPic:imageListFood[0],
                                         aboutFood:aboutFood,
                                         message1:highlights,
                                         nameOfCity:nameOfCity,
                                         aboutCity:city,
                                         pic1: imageList[0],
                                         cityPic: imageListCity[0],
                                         welcomeMessage: welcomeMessage,

                                        
                                         

         }).then(async ()=>{
         {
       await  fetch('https://retreat-server-cc2646f08902.herokuapp.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body:JSON.stringify({ name: hostFirstName, email: hostEmail, content: "Thank you for hosting your retreat with us! We will review your submission and get back to you soon." }), // Convert JS object to JSON string
    });

    }
          navigate('/')

  })
      
      
      

      
      

          }
   useEffect(()=>{
    window.scrollTo(0,0)
    console.log(userId)
       onAuthStateChanged(auth, async (user) => {
         if (user)  {
           // User is signed in
           console.log("host Id is: ", user.uid)
           console.log("userId is"+userId)
           setHostId(user.uid)
          const q =query(collection(db, "hosts"), where("hostId", "==", hostId));
           const querySnapshot = await getDocs(q);
               querySnapshot.forEach((doc) => {
         setDocumentId(doc.id)
         setHostFirstName(doc.data().hostFirstName)
         setHostLastName(doc.data().hostLastName)
         setHostEmail(doc.data().hostEmail)
         console.log("Host first name is "+doc.data().hostFirstName)
               })
              }
              listAll(imageListRef).then((res)=>{
                    res.items.forEach((item)=>{
                      getDownloadURL(item).then((url)=>{
                        setImageList((prev)=>[...prev, url]);
              
                      });
                    });
                  });
                  listAll(imageListRef1).then((res)=>{
                    res.items.forEach((item)=>{
                      getDownloadURL(item).then((url)=>{
                        setImageListRoom1((prev)=>[...prev, url]);
              
                      });
                    });
                  });
                listAll(imageListRef2).then((res)=>{
                    res.items.forEach((item)=>{
                      getDownloadURL(item).then((url)=>{
                        setImageListRoom2((prev)=>[...prev, url]);
              
                      });
                    });
                  });
                  listAll(imageListRef3).then((res)=>{
                    res.items.forEach((item)=>{
                      getDownloadURL(item).then((url)=>{
                        setImageListRoom3((prev)=>[...prev, url]);
              
                      });
                    });
                  });
                     listAll(imageListRef4).then((res)=>{
                    res.items.forEach((item)=>{
                      getDownloadURL(item).then((url)=>{
                        setImageListRoom4((prev)=>[...prev, url]);
              
                      });
                    });
                  });
         
            })
  
            
   },[userId])
  return (
    <div >
     <div className="relative h-[600px] min-h-[600px] w-full overflow-hidden">
      <Modal isOpen={isTerms} onClose={()=>setIsTerms(false)}>
         <div className="p-6 justify-center items-center text-center  h-[700px]">
            <br/>
            <br/>
            <br/>
            <h2 className="text-2xl font-bold mb-4">Please read the terms and conditions</h2>
            <p className="mb-4">
              This PDF includes sections dedicated to:<br/>

<strong>Good Faith Agreements:</strong> Establishing a foundation of honesty, transparency, and fair dealing.<br/>

<strong>Host Responsibilities:</strong> Covering listing accuracy, operational delivery, and legal/safety compliance.<br/>

<strong>Professional Standards:</strong> Guidelines for communication and service quality.<br/>

<strong>Financial Obligations:</strong> Clarity on pricing and booking integrity.<br/>
            </p>
          <Button onClick={()=>window.open('https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/Retreats_Around_The_World_Host_Terms.pdf?alt=media&token=d21b1566-82b2-49cc-b0b5-0b4f225e3e77', '_blank')} className="bg-retreat-forest text-white hover:bg-retreat-cream hover:text-retreat-forest" >
            Open PDF
          </Button>
        </div>
      </Modal>
      
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pic})` }}
      ></div>
          <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
                 <div className="container mx-auto max-w-3xl px-4 md:px-6">
                   <div className="animate-fade-in">
                     <h1 className="text-3xl md:text-3xl sm:text-2xl md:pt-6 lg:text-3xl font-serif font-bold tracking-tight text-white mb-6">
                       Before you host a retreat, please read through our policies and guidelines. 
                     </h1>
                    
                    
       
                    
       
                     <div className="flex flex-col sm:flex-row gap-4">
                       <Button className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={()=>setIsTerms(true)}>
                        Terms and Conditions
                       </Button>
                       <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" >
                       Cancellation Policy
                       </Button>
                       <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" >
                        Funds and Payouts
                       </Button>
                      
                     </div>
                   </div>
                 </div>
               </div>
      </div>
      <div className="grid justify-center  items-center " >
      <form className="bg-white max-w-full min-w-xs shadow-md rounded px-8 pt-6 pb-8  mt-4" >
          <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       First Name of Host1
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text"  value={hostFirstName} onChange={(e)=>setHostFirstName(e.target.value)}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Last Name of Host1
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text"  value={hostLastName} onChange={(e)=>setHostLastName(e.target.value)}/>
    </div>
      <div className='m-4 border-2'>
    <h2 className='text-lg font-bold justify-center m-4'>Is there any other host?</h2>
  <label className='text-lg font-bold justify-center m-4'>Add Another Host? Host 2</label>&nbsp; &nbsp;
  <select onChange={doesHost2Exist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
  </select>
  </div>
  {host2Exists &&
  <div className='border-2 p-4'>
   <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       First Name of Host2
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="First Name of Host 2" onChange={(e)=>setHost2FirstName(e.target.value)}/>
    </div>
     <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Last Name of Host2
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Last Name of Host 2" onChange={(e)=>setHost2LastName(e.target.value)}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       About Host2
      </label>
        <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"  type="text" placeholder="About Host 2" onChange={(e)=>setAboutHost2(e.target.value)}></textarea>

    </div>
     <div>
      <label>Upload at least one pic of your host (required)</label>
              <input type="file" id="profile-pic" className='bg-lime-700 w-60 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                    <Button onClick={uploadHost2Image} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2'>Upload Host Image</Button>

              <br/><br/>
                {imageListHost2.map((url)=>{
      return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                      <Button onClick={()=> deleteImageHost2(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>



      </div>
      
     })}
              </div>
    </div>
  
    
  }
     <div className='m-4 border-2'>
    <h2 className='text-lg font-bold justify-center m-4'>Is there any other host?</h2>
  <label className='text-lg font-bold justify-center m-4'>Add Another Host? Host 3</label>&nbsp; &nbsp;
  <select onChange={doesHost3Exist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
  </select>
  </div>
  {host3Exists &&
  <div className='border-2 p-4'>
   <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       First Name of Host3
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="First Name of Host 2" onChange={(e)=>setHost3FirstName(e.target.value)}/>
    </div>
     <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Last Name of Host3
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="First Name of Host 2" onChange={(e)=>setHost3LastName(e.target.value)}/>
    </div>
      <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       About Host3
      </label>
        <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"  type="text" placeholder="Highlights of Retreat" onChange={(e)=>setAboutHost3(e.target.value)}></textarea>

    </div>
    <div>
            <label>Upload at least one pic of your host (required)</label>

              <input type="file" id="profile-pic" className='bg-lime-700 w-60 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                    <Button onClick={uploadHost3Image} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2'>Upload Host Image</Button>

              <br/><br/>
                {imageListHost3.map((url)=>{
      return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                      <Button onClick={()=> deleteImageHost3(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>



      </div>
      
     })}
              </div>
  </div>
  }
  <div className='m-4 border-2'>
    <h2 className='text-lg font-bold justify-center m-4'>Is there any other host?</h2>
  <label className='text-lg font-bold justify-center m-4'>Add Another Host? Host 4</label>&nbsp; &nbsp;
  <select onChange={doesHost4Exist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
  </select>
  </div>
 {host4Exists &&
  <div className='border-2 p-4'>
   <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       First Name of Host4
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="First Name of Host 2" onChange={(e)=>setHost4FirstName(e.target.value)}/>
    </div>
     <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Last Name of Host4
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="First Name of Host 2" onChange={(e)=>setHost4LastName(e.target.value)}/>
    </div>
      <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       About Host4
      </label>
        <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"  type="text" placeholder="Highlights of Retreat" onChange={(e)=>setAboutHost4(e.target.value)}></textarea>
          
    </div>
     <div>
            <label>Upload at least one pic of your host (required)</label>

              <input type="file" id="profile-pic" className='bg-lime-700 w-60 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                    <Button onClick={uploadHost4Image} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2'>Upload Host Image</Button>

              <br/><br/>
                {imageListHost4.map((url)=>{
      return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                      <Button onClick={()=> deleteImageHost4(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>



      </div>
      
     })}
              </div>
  </div>
  }
   <div className='m-4 border-2'>
    <h2 className='text-lg font-bold justify-center m-4'>Is there a chef?</h2>
  <label className='text-lg font-bold justify-center m-4'>Add a Chef</label>&nbsp; &nbsp;
  <select onChange={doesChefExist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
  </select>
  </div>
  {chefExists &&
  <div className='border-2 p-4'>
   <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       First Name of Chef
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="First Name of Host 2" onChange={(e)=>setChefFirstName(e.target.value)}/>
    </div>
     <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Last Name of Chef
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="First Name of Host 2" onChange={(e)=>setChefLastName(e.target.value)}/>
    </div>
      <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       About Chef
      </label>
        <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"  type="text" placeholder="Chef" onChange={(e)=>setAboutChef(e.target.value)}></textarea>

    </div>
     <div>
            <label>Upload at least one pic of your host (required)</label>

              <input type="file" id="profile-pic" className='bg-lime-700 w-60 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                    <Button onClick={uploadChefImage} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2'>Upload Host Image</Button>

              <br/><br/>
                {imageListChef.map((url)=>{
      return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                      <Button onClick={()=> deleteImageChef(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>



      </div>
      
     })}
              </div>
  </div>
  }
        <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Name of Retreat
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name of Retreat" onChange={(e)=>setName(e.target.value)}/>
    </div>
        <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Name of Retreat Center
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="retreatcenter" type="text" placeholder="Name of Retreat" onChange={(e)=>setRetreatCenterName(e.target.value)}/>
    </div>
          <div className="m-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Type1 of Retreat
      </label>
            <select className="bg-white p-2 rounded-md" onChange={(e)=>setType1(e.target.value)} value={type1}>
              <option value="">Select Type</option>
    <option value="Adventure">Adventure</option>
    <option value="Art">Art</option>
    <option value="Ayurveda">Ayurveda</option>
    <option value="Breathwork">Breathwork</option>
        <option value="Chakras">Chakras</option>

        <option value="Detox">Detox</option>
        <option value="Energy">Energy Healing</option>
        <option value="Horse">Horse Retreat</option>
     <option value="Men">Men's Retreat</option>
    <option value="Meditation">Meditation</option>
    <option value="Mens Retreat">Mens Retreat</option>
    <option value="Martial Arts">Martial Arts</option>
    <option value="Plant Medicine">Plant Medicine</option>
  <option value="Shamanic Journey">Shamanic Journey</option>
  <option value="Sound Healing">Sound Healing</option>
    <option value="Spiritual">Spiritual</option>
        <option value="Surfing">Surfing</option>
        <option value="Views">Views</option>
    <option value="Vegan">Vegan</option>
    <option value="Yoga">Yoga</option>
    <option value="Womens Retreat">Women's Retreat</option>
    <option value="Writing">Writing</option>
               

              </select>
              </div>
               <div className="m-4">

 <label className="block text-gray-700 text-sm font-bold mb-2" >
        Type2 of Retreat
      </label>
            <select className="bg-white p-2 rounded-md" onChange={(e)=>setType2(e.target.value)} value={type2}>
              <option value="">Select Type</option>
    <option value="Adventure">Adventure</option>
    <option value="Art">Art</option>
    <option value="Ayurveda">Ayurveda</option>
    <option value="Breathwork">Breathwork</option>
        <option value="Chakras">Chakras</option>

        <option value="Detox">Detox</option>
        <option value="Energy">Energy Healing</option>
        <option value="Horse">Horse Retreat</option>
     <option value="Men">Men's Retreat</option>
    <option value="Meditation">Meditation</option>
    <option value="Mens Retreat">Mens Retreat</option>
    <option value="Martial Arts">Martial Arts</option>
    <option value="Plant Medicine">Plant Medicine</option>
  <option value="Shamanic Journey">Shamanic Journey</option>
  <option value="Sound Healing">Sound Healing</option>
    <option value="Spiritual">Spiritual</option>
        <option value="Surfing">Surfing</option>
        <option value="Views">Views</option>
    <option value="Vegan">Vegan</option>
    <option value="Yoga">Yoga</option>
    <option value="Womens Retreat">Women's Retreat</option>
    <option value="Writing">Writing</option>
               

              </select>
              </div>
                     <div className="m-4">

               <label className="block text-gray-700 text-sm font-bold mb-2" >
        Type3 of Retreat
      </label>
            <select className="bg-white p-2 rounded-md" onChange={(e)=>setType3(e.target.value)} value={type3}>
              <option value="">Select Type</option>
    <option value="Adventure">Adventure</option>
    <option value="Art">Art</option>
    <option value="Ayurveda">Ayurveda</option>
    <option value="Breathwork">Breathwork</option>
        <option value="Chakras">Chakras</option>

        <option value="Detox">Detox</option>
        <option value="Energy">Energy Healing</option>
        <option value="Horse">Horse Retreat</option>
     <option value="Men">Men's Retreat</option>
    <option value="Meditation">Meditation</option>
    <option value="Mens Retreat">Mens Retreat</option>
    <option value="Martial Arts">Martial Arts</option>
    <option value="Plant Medicine">Plant Medicine</option>
  <option value="Shamanic Journey">Shamanic Journey</option>
  <option value="Sound Healing">Sound Healing</option>
    <option value="Spiritual">Spiritual</option>
        <option value="Surfing">Surfing</option>
        <option value="Views">Views</option>
    <option value="Vegan">Vegan</option>
    <option value="Yoga">Yoga</option>
    <option value="Womens Retreat">Women's Retreat</option>
    <option value="Writing">Writing</option>
               

              </select>
            
          </div>
   <div className="m-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        More about Retreat Type
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="More about Retreat Type" onChange={(e)=>setRetreatType(e.target.value)}/>
    </div>
     <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Address of Retreat
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="Address of Retreat" onChange={(e)=>setAddress(e.target.value)}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Country
      </label>
      <select className="bg-white p-2 rounded-md" onChange={(e)=>setCountry(e.target.value)} value={country}>
        <option value="">Select Location</option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Albania">Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
    <option value="Argentina">Argentina</option>
    <option value="Armenia">Armenia</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option value="Bahamas">Bahamas</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Barbados">Barbados</option>
    <option value="Belarus">Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Belize">Belize</option>
    <option value="Benin">Benin</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivia">Bolivia</option>
    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
    <option value="Botswana">Botswana</option>
    <option value="Brazil">Brazil</option>
    <option value="Brunei">Brunei</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Burkina Faso">Burkina Faso</option>
    <option value="Burundi">Burundi</option>
    <option value="Cabo Verde">Cabo Verde</option>
    <option value="Cambodia">Cambodia</option>
    <option value="Cameroon">Cameroon</option>  
    <option value="Canada">Canada</option>
    <option value="Central African Republic">Central African Republic</option>
    <option value="Chad">Chad</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="Colombia">Colombia</option>
    <option value="Comoros">Comoros</option>
    <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Croatia">Croatia</option>
    <option value="Cuba">Cuba</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czechia (Czech Republic)">Czechia (Czech Republic)</option>
    <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>  
    <option value="Denmark">Denmark</option>
    <option value="Djibouti">Djibouti</option>
    <option value="Dominica">Dominica</option>
    <option value="Dominican Republic">Dominican Republic</option>
    <option value="Ecuador">Ecuador</option>
    <option value="Egypt">Egypt</option>
    <option value="El Salvador">El Salvador</option>
    <option value="Equatorial Guinea">Equatorial Guinea</option>
    <option value="Eritrea">Eritrea</option>
    <option value="Estonia">Estonia</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Fiji">Fiji</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="Gabon">Gabon</option>
    <option value="Gambia">Gambia</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Greece">Greece</option>
    <option value="Grenada">Grenada</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Guinea">Guinea</option>
    <option value="Guinea-Bissau">Guinea-Bissau</option>
    <option value="Guyana">Guyana</option>
    <option value="Haiti">Haiti</option>
    <option value="Holy See">Holy See</option>
    <option value="Honduras">Honduras</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="Iran">Iran</option>
    <option value="Iraq">Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Israel">Israel</option>
    <option value="Italy">Italy</option>
    <option value="Jamaica">Jamaica</option>
    <option value="Japan">Japan</option>
    <option value="Jordan">Jordan</option>
    <option value="Kazakhstan">Kazakhstan</option>
    <option value="Kenya">Kenya</option>
    <option value="Kiribati">Kiribati</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Kyrgyzstan">Kyrgyzstan</option>
    <option value="Laos">Laos</option>
    <option value="Latvia">Latvia</option>
    <option value="Lebanon">Lebanon</option>
    <option value="Lesotho">Lesotho</option>
    <option value="Liberia">Liberia</option>
    <option value="Libya">Libya</option>
    <option value="Liechtenstein">Liechtenstein</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Madagascar">Madagascar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Maldives">Maldives</option>
    <option value="Mali">Mali</option>
    <option value="Malta">Malta</option>
    <option value="Marshall Islands">Marshall Islands</option>
    <option value="Mauritania">Mauritania</option>
    <option value="Mauritius">Mauritius</option>
    <option value="Mexico">Mexico</option>
    <option value="Micronesia">Micronesia</option>
    <option value="Moldova">Moldova</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolia">Mongolia</option>
    <option value="Montenegro">Montenegro</option>
    <option value="Morocco">Morocco</option>
    <option value="Mozambique">Mozambique</option>
    <option value="Myanmar (Burma)">Myanmar (Burma)</option>
    <option value="Namibia">Namibia</option>
    <option value="Nauru">Nauru</option>
    <option value="Nepal">Nepal</option>
    <option value="Netherlands">Netherlands</option>
    <option value="New Zealand">New Zealand</option>
    <option value="Nicaragua">Nicaragua</option>
    <option value="Niger">Niger</option>
    <option value="Nigeria">Nigeria</option>
    <option value="North Korea">North Korea</option>
    <option value="North Macedonia">North Macedonia</option>
    <option value="Norway">Norway</option>
    <option value="Oman">Oman</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Palau">Palau</option>
    <option value="Palestine">Palestine</option>
    <option value="Panama">Panama</option>
    <option value="Papua New Guinea">Papua New Guinea</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippines">Philippines</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Qatar">Qatar</option>
    <option value="Romania">Romania</option>
    <option value="Russia">Russia</option>
    <option value="Rwanda">Rwanda</option>
    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
    <option value="Saint Lucia">Saint Lucia</option>
    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>  
    <option value="Samoa">Samoa</option>
    <option value="San Marino">San Marino</option>
    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Senegal">Senegal</option>
    <option value="Serbia">Serbia</option>  
    <option value="Seychelles">Seychelles</option>
    <option value="Sierra Leone">Sierra Leone</option>
    <option value="Singapore">Singapore</option>
    <option value="Slovakia">Slovakia</option>
    <option value="Slovenia">Slovenia</option>
    <option value="Solomon Islands">Solomon Islands</option>
    <option value="Somalia">Somalia</option>
    <option value="South Africa">South Africa</option>
    <option value="South Korea">South Korea</option>
    <option value="South Sudan">South Sudan</option>
    <option value="Spain">Spain</option>
    <option value="Sri Lanka">Sri Lanka</option>
    <option value="Sudan">Sudan</option>
    <option value="Suriname">Suriname</option>  
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="Syria">Syria</option>
    <option value="Taiwan">Taiwan</option>
    <option value="Tajikistan">Tajikistan</option>
    <option value="Tanzania">Tanzania</option>
    <option value="Thailand">Thailand</option>
    <option value="Timor-Leste">Timor-Leste</option>
    <option value="Togo">Togo</option>
    <option value="Tonga">Tonga</option>
    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
    <option value="Tunisia">Tunisia</option>
    <option value="Turkey">Turkey</option>
    <option value="Turkmenistan">Turkmenistan</option>
    <option value="Tuvalu">Tuvalu</option>
    <option value="Uganda">Uganda</option>
    <option value="Ukraine">Ukraine</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States of America">United States of America</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Uzbekistan">Uzbekistan</option>
    <option value="Vanuatu">Vanuatu</option>
    <option value="Venezuela">Venezuela</option>
    <option value="Vietnam">Vietnam</option>
    <option value="Yemen">Yemen</option>
    <option value="Zambia">Zambia</option>
    <option value="Zimbabwe">Zimbabwe</option>

    </select>
    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
       State of Retreat (if in the US)
      </label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setState(e.target.value)} value={state}>
      <option value="">Select US State</option>

      <option value="Alabama">Alabama</option>
      <option value="Alaska">Alaska</option>
      <option value="Arizona">Arizona</option>
      <option value="Arkansas">Arkansas</option>
      <option value="California">California</option>
      <option value="Colorado">Colorado</option>
      <option value="Connecticut">Connecticut</option>
      <option value="Delaware">Delaware</option>
      <option value="Florida">Florida</option>
      <option value="Georgia">Georgia</option>
      <option value="Hawaii">Hawaii</option>
      <option value="Idaho">Idaho</option>
      <option value="Illinois">Illinois</option>
      <option value="Indiana">Indiana</option>
      <option value="Iowa">Iowa</option>
      <option value="Kansas">Kansas</option>
      <option value="Kentucky">Kentucky</option>  
      <option value="Louisiana">Louisiana</option>
      <option value="Maine">Maine</option>
      <option value="Maryland">Maryland</option>
      <option value="Massachusetts">Massachusetts</option>
      <option value="Michigan">Michigan</option>
      <option value="Minnesota">Minnesota</option>
      <option value="Mississippi">Mississippi</option>
      <option value="Missouri">Missouri</option>
      <option value="Montana">Montana</option>
      <option value="Nebraska">Nebraska</option>
      <option value="Nevada">Nevada</option>
      <option value="New Hampshire">New Hampshire</option>
      <option value="New Jersey">New Jersey</option>
      <option value="New Mexico">New Mexico</option>
      <option value="New York">New York</option>
      <option value="North Carolina">North Carolina</option>
      <option value="North Dakota">North Dakota</option>
      <option value="Ohio">Ohio</option>
      <option value="Oklahoma">Oklahoma</option>
      <option value="Oregon">Oregon</option>
      <option value="Pennsylvania">Pennsylvania</option>
      <option value="Puerto Rico">Puerto Rico</option>
      <option value="Rhode Island">Rhode Island</option>
      <option value="South Carolina">South Carolina</option>
      <option value="South Dakota">South Dakota</option>
      <option value="Tennessee">Tennessee</option>
      <option value="Texas">Texas</option>
      <option value="Utah">Utah</option>
      <option value="Vermont">Vermont</option>
      <option value="Virginia">Virginia</option>
      <option value="Washington">Washington</option>
      <option value="West Virginia">West Virginia</option>
      <option value="Wisconsin">Wisconsin</option>
      <option value="Wyoming">Wyoming</option>
    </select>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Highlights
      </label>
      <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"  type="text" placeholder="Highlights of Retreat" onChange={(e)=>setHighlights(e.target.value)}></textarea>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Total Price of Retreat Cheapest Package, please do not post $ or pound sign (only accepts numbers)
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="0.0" onChange={pricing}/>
   
      <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
       Currency
      </label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setCurrency(e.target.value)} value={currency}> 
        <option value="">Select Currency</option>
        <option value="USD">USD</option>
             
      </select>
    </div>
                  <p>You can add the entire year here  we will add open to discussion</p><br/>

    <div className="mb-4 flex gap-4">

      <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Start Date of Availability
      </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={(e)=>startAtDate(e)}/>
    </LocalizationProvider>
    </div>
    <div>
    <label className="block text-gray-700 text-sm font-bold mb-2" >
       End Date of Availability
      </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={(e)=>endAtDate(e)}/>
        
    </LocalizationProvider>

    
    </div><br/>
 </div>
    
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Tell us something about the Retreat
      </label>
           <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setKind(e.target.value)}></textarea>
   
    </div>
       <div className='border-2 rounded border-solid border-lime-700 p-4'>
      <label className="block text-gray-700 text-lg font-bold mb-2">
        City/Region/Village Information
      </label>
    <div className="m-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Name of City/Region/Village
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" placeholder="Name of City" onChange={(e)=>setNameOfCity(e.target.value)}/>
    </div>
     <div className="m-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       About the City
      </label>
           <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setCity(e.target.value)}></textarea>
    </div>
      <div className="m-4">

<label for="profile-pic">Upload at least one image of the city of Retreat.(Required)</label><br/>
        <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
    
      <Button onClick={uploadCityImage} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload City Image</Button>
    </div>
     {imageListCity.map((url)=>{
      return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                      <Button onClick={()=> deleteImageCity(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>



      </div>
      
     })}
     </div>
            <div className='border-2 rounded border-solid border-lime-700 p-4'>
              <div className='m-4'>
                <label className="block text-gray-700 text-lg font-bold mb-2">
         Food Information
      </label>
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="Describe the food options" onChange={(e)=>setAboutFood(e.target.value)}></textarea>
        </div>
        <label for="profile-pic">Upload at least one image of the food.(Required)</label><br/>
        <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
    
      <Button onClick={uploadFoodImage} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload City Image</Button>
    </div>
     {imageListFood.map((url)=>{
      return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                      <Button onClick={()=> deleteImageFood(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>



      </div>
      
     })}
              

        <div className='m-4 border-2'>
    <h2 className='text-lg font-bold justify-center m-4'>Add Rooms</h2>
  <label className='text-lg font-bold justify-center m-4'>Add Room 1</label>&nbsp; &nbsp;
  <select onChange={doesRoom1Exist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
  </select>
  </div>
    {room1Exists &&
      <div className='border-2 rounded border-solid border-lime-700 p-4'>

     <div className='mb-4'>
      <label>
       About Room 1
      </label>
           <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setAccommodation1(e.target.value)}></textarea>
  </div>
     <div className="mb-4">
  
  <label for="profile-pic">Upload pics of Room 1</label><br/>
          <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
      
        <Button onClick={uploadImageRoom1} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>
      </div>
      {imageListRoom1.map((url)=>{
            return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                            <Button onClick={()=> deleteImageRoom1(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>
      
      
      
            </div>
            
           })}
           <div className="m-4">
            <div>
                    <label className="block text-gray-700 h-auto text-sm font-bold mb-2" >
                      Do you charge per night? Do you have price per night?
       </label>
       <select onChange={doesPricePerNightExist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
  </select>
  {pricePerNightRoom1 &&
  <div>
      <label className="block text-gray-700 h-auto text-sm font-bold mb-2" >
       Price per night for Room 1 or package 1, please do not post $ or pound sign (only accepts numbers)
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="0.0" onChange={pricing1}/>
        </div>
        }

      
      </div>
      <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
       Currency
      </label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setCurrency(e.target.value)} value={currency}> 
        <option value="">Select Currency</option>
        <option value="USD">USD</option>
             
      </select>
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
                 Total Price of Retreat if customer chooses Room 1, please do not post $ or pound sign <strong>(only accepts numbers)</strong></label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder='0.0' onChange={priceTotalRoom1}/>
    </div>
    <div className='m-4'>
    Breakfast Included
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setIncludesRoom1Breakfast(e.target.value)} value={includesRoom1Breakfast}>
            <option value="">Select Value
            </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>


    </div>
       <div className='m-4'>
    Wifi Included
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setIncludesWifiRoom1(e.target.value)} value={includesWifiRoom1}>
            <option value="">Select Value
            </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>


    </div>
    </div>
}
<div className='m-4 border-2'>
    <h2 className='text-lg font-bold justify-center m-4'>Add Rooms</h2>
  <label className='text-lg font-bold justify-center m-4'>Add Room 2</label>&nbsp; &nbsp;
  <select onChange={doesRoom2Exist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
  </select>
  </div>
  {room2Exists &&
      <div className='border-2 rounded border-solid border-lime-700 p-4'>

             <div className='mb-4'>
      <label>
       About Room 2
      </label>
           <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setAccommodation2(e.target.value)}></textarea>
  </div>
           <div className="mb-4">
  
  <label for="profile-pic">Upload pics of Room 2</label><br/>
          <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
      
        <Button onClick={uploadImageRoom2} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>
      </div>
      {imageListRoom2.map((url)=>{
            return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                            <Button onClick={()=> deleteImageRoom2(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>
      
      
      
            </div>
            
           })}
                <div>
                    <label className="block text-gray-700 h-auto text-sm font-bold mb-2" >
                      Do you charge per night? Do you have price per night?
       </label>
       <select onChange={doesPricePerNightRoom2Exist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
  </select>
          {pricePerNightRoom2 &&
          <div className="mb-4">

      <label className="block text-gray-700 text-sm font-bold mb-2" >
              Price per night for Room 2 or package 2, please do not post $ or pound sign (only accepts numbers)

      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="0.0" onChange={pricing2}/>
     </div>
}
      <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
       Currency
      </label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setCurrency(e.target.value)} value={currency}> 
        <option value="">Select Currency</option>
        <option value="USD">USD</option>
             
      </select>
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
          Total Price of Retreat if customer chooses Room 2</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="0.0" onChange={priceTotalRoom2}/>
    </div>
    <div className='m-4'>
    Breakfast Included
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setIncludesRoom2Breakfast(e.target.value)} value={includesRoom2Breakfast}>
            <option value="">Select Value
            </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>


    </div>
      <div className='m-4'>
    Wifi Included
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setIncludesWifiRoom2(e.target.value)} value={includesWifiRoom2}>
            <option value="">Select Value
            </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>


    </div>
    </div>
}
<div className='m-4 border-2'>
    <h2 className='text-lg font-bold justify-center m-4'>Add Rooms</h2>
  <label className='text-lg font-bold justify-center m-4'>Add Room 3</label>&nbsp; &nbsp;
  <select onChange={doesRoom3Exist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
  </select>
  </div>
  {room3Exists &&
      <div className='border-2 rounded border-solid border-lime-700 p-4'>

            <div className='mb-4'>
      <label>
       About Room 3
      </label>
           <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setAccommodation3(e.target.value)}></textarea>
  </div>
           <div className="mb-4">
  
  <label for="profile-pic">Upload pics of Room 3</label><br/>
          <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
      
        <Button onClick={uploadImageRoom3} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>
      </div>
      {imageListRoom3.map((url)=>{
            return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                            <Button onClick={()=> deleteImageRoom4(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>
      
      
      
            </div>
            
           })}
          <label className="block text-gray-700 h-auto text-sm font-bold mb-2" >
                      Do you charge per night? Do you have price per night?
       </label>
       <select onChange={doesPricePerNightRoom3Exist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
    </select>

                

                  {pricePerNightRoom3 &&
                         <div >
      <label className="block text-gray-700 text-sm font-bold mb-2" >
             Price per night for Room 3 or package 3, please do not post $ or pound sign (only accepts numbers)

      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="0.0" onChange={pricing3}/>

      </div>
}
  
      <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
       Currency
      </label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setCurrency(e.target.value)} value={currency}> 
        <option value="">Select Currency</option>
        <option value="USD">USD</option>
             
      </select>
       <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
          Total Price of Retreat if customer chooses Room 3</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="0.0" onChange={priceTotalRoom3}/>
      
    
      <div className='m-4'>
    Breakfast Included
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setIncludesRoom3Breakfast(e.target.value)} value={includesRoom3Breakfast}>
            <option value="">Select Value
            </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>


    </div>
      <div className='m-4'>
    Wifi Included
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setIncludesWifiRoom3(e.target.value)} value={includesWifiRoom3}>
            <option value="">Select Value
            </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>


  
    </div>
    </div>
}
<div className='m-4 border-2'>
    <h2 className='text-lg font-bold justify-center m-4'>Add Rooms</h2>
  <label className='text-lg font-bold justify-center m-4'>Add Room 4</label>&nbsp; &nbsp;
  <select onChange={doesRoom4Exist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
  </select>
  </div>
  {room4Exists &&
      <div className='border-2 rounded border-solid border-lime-700 p-4'>

            <div className='mb-4'>
      <label>
       About Room 4
      </label>
           <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setAccommodation4(e.target.value)}></textarea>
  </div>
           <div className="mb-4">
  
  <label for="profile-pic">Upload pics of Room 4</label><br/>
          <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
      
        <Button onClick={uploadImageRoom4} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>
      </div>
      {imageListRoom4.map((url)=>{
            return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                            <Button onClick={()=> deleteImageRoom4(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>
      
      
      
            </div>
            
           })}
             <label className="block text-gray-700 h-auto text-sm font-bold mb-2" >
                      Do you charge per night? Do you have price per night?
       </label>
       <select onChange={doesPricePerNightRoom4Exist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
    </select>
                         <div className="mb-4">
      {pricePerNightRoom4 &&
      <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
              Price per night for Room 4 or package 4, please do not post $ or pound sign (only accepts numbers)

      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="0.0" onChange={pricing4}/>
      </div>
}
      <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
       Currency
      </label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setCurrency(e.target.value)} value={currency}> 
        <option value="">Select Currency</option>
        <option value="USD">USD</option>
             
      </select>
       <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
          Total Price of Retreat if customer chooses Room 3</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="0.0" onChange={priceTotalRoom4}/>
      
    </div>
      <div className='m-4'>
    Breakfast Included
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setIncludesRoom4Breakfast(e.target.value)} value={includesRoom4Breakfast}>
            <option value="">Select Value
            </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>


    </div>
      <div className='m-4'>
    Wifi Included
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setIncludesWifiRoom4(e.target.value)} value={includesWifiRoom4}>
            <option value="">Select Value
            </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>


    </div>
    </div>
}
<div className='m-4 border-2'>
    <h2 className='text-lg font-bold justify-center m-4'>Add Rooms</h2>
  <label className='text-lg font-bold justify-center m-4'>Add Room 5</label>&nbsp; &nbsp;
  <select onChange={doesRoom5Exist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
  </select>
  </div>
  {room5Exists &&
      <div className='border-2 rounded border-solid border-lime-700 p-4'>

            <div className='mb-4'>
      <label>
       About Room 5
      </label>
           <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setAccommodation5(e.target.value)}></textarea>
  </div>
           <div className="mb-4">
  
  <label for="profile-pic">Upload pics of Room 4</label><br/>
          <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
      
        <Button onClick={uploadImageRoom5} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>
      </div>
      {imageListRoom5.map((url)=>{
            return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                            <Button onClick={()=> deleteImageRoom5(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>
      
      
      
            </div>
            
           })}
             <label className="block text-gray-700 h-auto text-sm font-bold mb-2" >
                      Do you charge per night? Do you have price per night?
       </label>
       <select onChange={doesPricePerNightRoom5Exist}>
    <option className='border-2' value="No">No</option>
    <option className='border-2' value="Yes">Yes</option>
    </select>
                         <div className="mb-4">
      {pricePerNightRoom5 &&
      <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
              Price per night for Room 4 or package 4, please do not post $ or pound sign (only accepts numbers)

      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="0.0" onChange={pricing5}/>
      </div>
}
      <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
       Currency
      </label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setCurrency(e.target.value)} value={currency}> 
        <option value="">Select Currency</option>
        <option value="USD">USD</option>
             
      </select>
       <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
          Total Price of Retreat if customer chooses Room 3</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="0.0" onChange={priceTotalRoom5}/>
      
    </div>
      <div className='m-4'>
    Breakfast Included
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setIncludesRoom5Breakfast(e.target.value)} value={includesRoom5Breakfast}>
            <option value="">Select Value
            </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>


    </div>
      <div className='m-4'>
    Wifi Included
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setIncludesWifiRoom5(e.target.value)} value={includesWifiRoom5}>
            <option value="">Select Value
            </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>


    </div>
    </div>
}
          <div className='m-4'>
      <label>
        Nearest Airport
      </label>
           <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Nearest Airport" onChange={(e)=>setNearestAirport(e.target.value)}/>

    
  </div>
  <div className='m-4'>
      <label>
        Flight Expense Included
      </label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setFlightIncluded(e.target.value)} value={flightIncluded}>
            <option value="">Select Value
            </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
    
  </div>
   <div className='mb-4'>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Provide Airport Pickup Services:
      </label>
      <select className="bg-white p-2 rounded-md" onChange={(e)=>setPickupService(e.target.value)}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      
  </div>
    <div className='mb-4'>
      <label>
        What's not included?
      </label>
           <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write what is not included here..." onChange={(e)=>setNotIncluded(e.target.value)}></textarea>

    
  </div>

    <div className="mb-4">

<label for="profile-pic">Upload at least one image of your retreat center</label><br/>
        <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
    
      <Button onClick={uploadImage} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>
    </div>
     
     {imageList.map((url)=>{
      return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                      <Button onClick={()=> deleteImage(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>



      </div>
      
     })}
     <div className='mb-4'>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Welcome Message
      </label>
      <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="welcome-message" placeholder="Enter your welcome message here..." onChange={(e) => setWelcomeMessage(e.target.value)}></textarea>
     </div>
        
    <Button className="bg-lime-700 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={host}>
        List your center
      </Button>
      </form>
     </div>
    </div>
   
  )

}

export default ListARetreat