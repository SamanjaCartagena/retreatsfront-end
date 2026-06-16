import React,{useEffect, useState} from 'react'
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db, auth,storage} from "../firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SocialMedia from './SocialMedia.js';
import {Link} from 'react-router-dom';
import Modal from './Modal.js';

import {v4} from 'uuid';
import { Card } from './ui/card.js';
import { url } from 'inspector';
export default function Profile() {
  const params = useParams();
  const userId = params.userId;
  console.log("User ID from URL:", userId);
  const [id,setId]=useState('');
  const [onlyUser, setOnlyUser] = useState(false);
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [email,setEmail]=useState('');  
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [documentId, setDocumentId] = useState("")
  const [details, setDetails] = useState("")
  const [hostUserName, setHostUserName] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [facebookLink, setFacebookLink] = useState("")
  const [faceLink, setFaceLink]= useState("")
  const [instagramLink, setInstagramLink] = useState("")
  const [instaLink, setInstaLink] = useState("")
  const [twitterLink, setTwitterLink] = useState("")
  const [twitLink, setTwitLink] = useState("")
  const [pinterestLink, setPinterestLink] = useState("")
  const [hostIntroduction, setHostIntroduction] = useState("")
  const [phone,setPhone] = useState("")
  const [allRetreats, setAllRetreats] = useState([])
  const [retreatDetails, setRetreatDetails] = useState("")
  const [type1, setType1] = useState("")
  const [type2, setType2] = useState("")
  const [type3, setType3] = useState("")
  const [type4, setType4] = useState("")
  const [type5, setType5] = useState("")
  const [type6, setType6] = useState("")
  const [type7, setType7] = useState("")
  const [type8, setType8] = useState("")
  const [type9, setType9] = useState("")
  const [openEditor, setOpenEditor] = useState(false)
  const navigate = useNavigate()
    const imageListRef = ref(storage, `/images/${userId}/`);
    const profileRef = ref(storage, `/profilePic/${userId}/`);
    const deleteImageRef = ref(storage, `/images/${userId}/`);
    const saveChanges =()=>{
      const docRef = doc(db, "hosts", documentId);
      updateDoc(docRef, { hostFirstName: firstName,
        hostLastName: lastName,
        hostEmail: email, 
        hostUsername: hostUserName,
        hostIntroduction: hostIntroduction,
        hostPhone: phone,
        hostRetreatDetails: retreatDetails,
        type1: type1,
        type2: type2,
        type3: type3,
        type4: type4
       });
       setOpenEditor(false);
    }

   const profile=()=>{
    
    const profilePicRef = ref(storage, `/profilePic/${userId}/profile.jpg`);
    uploadBytes(profilePicRef, imageUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        setAvatarUrl(url);
          const docRef = doc(db, "hosts", documentId);

           updateDoc(docRef, {
             profilePicUrl: avatarUrl,
            
                   });
      }
      );
    });
   }
   
 const deleteImage=(url)=>{
   alert("Are you sure you want to delete this image?"+url);
    const imageRef = ref(storage, url);
    deleteObject(imageRef).then(() => {
      setImageList((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
    }).catch((error) => {
      console.error("Error deleting image: ", error);
    });
 }
  const opensocials=()=>{
   setIsModalOpen(true)
  }
  const closeModal =()=>{
    setIsModalOpen(false)
  }

  const submitSocials =() => {
    const docRef = doc(db, "hosts", documentId);
    updateDoc(docRef, {
      facebook: facebookLink,
      instagram: instagramLink,
      twitter: twitterLink,
      pinterest: pinterestLink
    });
    setIsModalOpen(false);
  }
  const uploadImage=()=>{
    // Create a root reference
    console.log("Upload Image");
    if(imageUpload == null) return;
    
    
    const imageRef = ref(storage, `/images/${userId}/${imageUpload.name+v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        setImageList((prev)=>[...prev, url]);
      }
      );
    });

  }
    useEffect(() => {
     
      const loadData = async () => {
     const q =query(collection(db, "hosts"), where("hostId", "==", userId));
      const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    setDocumentId(doc.id)
    setAvatarUrl(doc.data().profilePicUrl)
    setFirstName(doc.data().hostFirstName);
    setLastName(doc.data().hostLastName);
    setEmail(doc.data().hostEmail);
    setId(doc.data().hostId);
    setDetails(doc.data().details);
    setFaceLink(doc.data().facebook);
    setInstaLink(doc.data().instagram);
    setTwitLink(doc.data().twitter);
    setPinterestLink(doc.data().pinterest);
    setHostIntroduction(doc.data().hostIntroduction);
    setPhone(doc.data().hostPhone);
    setRetreatDetails(doc.data().hostRetreatDetails);
    setHostUserName(doc.data().hostUsername);
    setType1(doc.data().type1);
    setType2(doc.data().type2);
    setType3(doc.data().type3);
    setType4(doc.data().type4);
    setType5(doc.data().type5);
    setType6(doc.data().type6);
    setType7(doc.data().type7);
    setType8(doc.data().type8);
    setType9(doc.data().type9);
  });

    const profilePic = ref(storage, `/profilePic/${userId}/profile.jpg`);
      getDownloadURL(profilePic).then((url)=>{
        setAvatarUrl(url);
      }
      );
    
        listAll(imageListRef).then((res)=>{
      res.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setImageList((prev)=>[...prev, url]);

        });
      });
    });
    }
    loadData();
onAuthStateChanged(auth, async (user) => {
  if  (user) {
    console.log('User authstate is signed in with UID:', user.uid);
    if (userId === user.uid) {
    setOnlyUser(true);
        
       

    } else {
      setOnlyUser(false);
    }
    console.log(allRetreats)
  } else {
    console.log('No user is signed in');  
  }
})
  },[])
  return (
    <div className="max-w-4xl pt-40 mx-auto p-4 grid place-items-center">
          {onlyUser && ( 
          <h1 className="text-2xl flex font-bold mb-4">Hi {firstName}, Would you like to list your retreat?</h1>
          )}
          <div className="flexbox gap-4">
           <img src={avatarUrl} alt="Avatar" className="w-60 h-60 mt-4 rounded-full mb-4 justify-center items-center mx-auto object-cover"/>
            {onlyUser && (
              <div>
          <input type="file" id="profile-pic" className='bg-lime-700 w-60 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
          <br/><br/>
          <Button onClick={profile} className='bg-lime-700  w-60 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Profile Picture</Button>
          </div>
            )}
          <br/>
          
          </div>
           <Modal isOpen={openEditor} onClose={()=>setOpenEditor(false)}>
          <div style={{width:'100%',}} className="justify-center mt-20 items-center text-center p-4 bold text-sm">
              <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
             <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
             <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
             <input type="text" placeholder="Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
             <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
             <input type="text" placeholder="Username" value={hostUserName} onChange={(e)=>setHostUserName(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
             <textarea placeholder="Host Introduction" value={hostIntroduction} onChange={(e)=>setHostIntroduction(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
              <textarea placeholder="Retreat Details" value={retreatDetails} onChange={(e)=>setRetreatDetails(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
              <h1 className="text-xl font-bold mb-2">Retreat Types (Check all that apply)</h1>
              <div className="flex m-2 border-2 border-solid border-gray-300 rounded p-4">
              <input type="checkbox" checked={!!type1} onChange={(e)=>setType1(e.target.checked ? 'Meditation' : '')} />
              <label>&nbsp;Meditation</label><br/>
              </div>
                            <div className="flex m-2 border-2 border-solid border-gray-300 rounded p-4">

              <input type="checkbox" checked={!!type2} onChange={(e)=>setType2(e.target.checked ? 'Vegan' : '')} />
              <label>&nbsp;Vegan</label><br/>
              </div>
              <div className="flex m-2 border-2 border-solid border-gray-300 rounded p-4">
              <input type="checkbox" checked={!!type3} onChange={(e)=>setType3(e.target.checked ? 'Sound Healing' : '')} />
              <label>&nbsp;Sound Healing</label><br/>
              </div>
              <div className="flex m-2 border-2 border-solid border-gray-300 rounded p-4">
              <input type="checkbox" checked={!!type4} onChange={(e)=> setType4(e.target.checked ? 'Corporate Retreat' : '')} />
              <label>&nbsp;Corporate Retreat</label><br/>
              </div>
              <div className="flex m-2 border-2 border-solid border-gray-300 rounded p-4">
              <input type="checkbox" checked={!!type5} onChange={(e)=>setType5(e.target.checked ? 'Workout Retreat' : '')} />
              <label>&nbsp;Workout Retreat</label><br/>
              </div>
              <div className="flex m-2 border-2 border-solid border-gray-300 rounded p-4">
              <input type="checkbox" checked={!!type6} onChange={(e)=>setType6(e.target.checked ? 'Hiking' : '')} />
              <label>&nbsp;Hiking</label><br/>
              </div>
              <div className="flex m-2 border-2 border-solid border-gray-300 rounded p-4">
              <input type="checkbox" checked={!!type7} onChange={(e)=>setType7(e.target.checked ? 'Yoga' : '')} />
              <label>&nbsp;Yoga</label><br/>
              </div>
              <div className="flex m-2 border-2 border-solid border-gray-300 rounded p-4">
              <input type="checkbox" checked={!!type8} onChange={(e)=>setType8(e.target.checked ? 'Recreation' : '')} />
              <label>&nbsp;Recreation</label><br/>
              </div>
              <div className="flex m-2 border-2 border-solid border-gray-300 rounded p-4">
              <input type="checkbox" checked={!!type9} onChange={(e)=>setType9(e.target.checked ? 'Others' : '')} />
              <label>&nbsp;Others</label><br/>
              </div>
              <button onClick={saveChanges} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Save Changes</button>

                </div>
                </Modal>
      
    <div className="w-full p-8 h-auto flex justify-center items-center ">
      
      <div className="bg-white  px-8  pb-8 mb-4">      
        <p className="mb-4"><span className="font-bold">First Name:</span> {firstName}</p>
        <p className="mb-4"><span className="font-bold">Last Name:</span> {lastName}</p>
        <p className="mb-4"><span className="font-bold">Username:</span> {hostUserName}</p>
        <p className="mb-4"><span className="font-bold">Email:</span> {email}</p>
        <p className="mb-4"><span className="font-bold">Phone:</span> {phone}</p>
        <p className="mb-4"><span className="font-bold">Introduction:</span> {hostIntroduction}</p>
        <p className="mb-4"><span className="font-bold">Retreat Details:</span> {retreatDetails}</p>
        <p className="mb-4"><span className="font-bold">Retreat Type 1:</span> {type1}</p>
        <p className="mb-4"><span className="font-bold">Retreat Type 2:</span> {type2}</p>
        <p className="mb-4"><span className="font-bold">Retreat Type 3:</span> {type3}</p>  
        <p className="mb-4"><span className="font-bold">Retreat Type 4:</span> {type4}</p>
        <p className="mb-4"><span className="font-bold">Retreat Type 5:</span> {type5}</p>  
        <p className="mb-4"><span className="font-bold">Retreat Type 6:</span> {type6}</p>

        <p className="mb-4"><span className="font-bold">Retreat Type 7:</span> {type7}</p>
        <p className="mb-4"><span className="font-bold">Retreat Type 8:</span> {type8}</p>
        <p className="mb-4"><span className="font-bold">Retreat Type 9:</span> {type9}</p>
                
       <Link to={`/guideadmin/${userId}`}className="mb-2 mt-2" >
          <Button className='bg-lime-700 text-white mt-2 font-bold py-2 w-60 px-4 rounded focus:outline-none focus:shadow-outline'>Become a Guide</Button>

        </Link>
      
        <div className="grid  items-center mt-1">
        
          {onlyUser && (
       <Link to={`/list/${userId}`}className="mb-2 mt-2" >
          <Button className='bg-lime-700 text-white mt-2 font-bold py-2 w-60 px-4 rounded focus:outline-none focus:shadow-outline'>List A Retreat</Button>

        </Link>
        )}
        {onlyUser && (
        <Link to={`/list/${userId}`} className="mb-2 mt-2" >
          <Button className='bg-lime-700  text-white mt-2 font-bold py-2 w-60 px-4 rounded focus:outline-none focus:shadow-outline'>List A Retreat Center</Button>

        </Link>
        )}
        {onlyUser && (
          <Button className='bg-lime-700 w-full text-white mt-2 font-bold py-2 px-4 items-center align-middle w-60 rounded focus:outline-none focus:shadow-outline' onClick={()=>setOpenEditor(true)}>Edit Your Info</Button>
        )}
        
        <br/>
       {onlyUser && (
        <div>
         <label for="pic">Upload pics for display </label><br/>
    <input type="file" className="bg-lime-700 cursor-pointer text-white font-bold py-2 px-4 w-60 rounded focus:outline-none focus:shadow-outline" onChange={(event)=>{setImageUpload(event.target.files[0])}} name="pic" id="pic"/>
       </div>
       )}
       {onlyUser && (
        <div>
    <br/>
         <button onClick={uploadImage} className='bg-lime-700 w-60  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</button>
         </div>
       )}
         <div className="lg:grid-cols-3 gap-4 md:grid md:grid-cols-2 sm:grid-cols-1 mt-4">
      {imageList.map((url)=>{
      return <Card className="w-full h-auto bg-gray-100 p-4 rounded" key={url}>
        <img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                    
                    {onlyUser && (
                      <Button onClick={()=> deleteImage(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>
                    )}
                    </Card>
                    
    
      
      })
    }
    


  

      </div>
      <br/>
       
     

      

      </div>
      

  
      

      </div>
      
     
     </div>
          
        
        
        
      
    </div>
    
   
  
    
    
  )
}

