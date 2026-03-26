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

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import {v4} from 'uuid';
export default function Profile() {
  const params = useParams();
  const userId = params.userId;
  console.log("User ID from URL Sammy Sammy Sammy:", userId);
   // Log the userId to verify it's being captured
  const [id,setId]=useState('');
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
  const navigate = useNavigate()
    const imageListRef = ref(storage, `/images/${userId}/`);
    const profileRef = ref(storage, `/profilePic/${userId}/`);
    const deleteImageRef = ref(storage, `/images/${userId}/`);
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
     
       onAuthStateChanged(auth, async (user) => {
    if (user)  {
      // User is signed in
      const uid = user.uid;

     const q =query(collection(db, "hosts"), where("id", "==", userId));
      const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    setDocumentId(doc.id)
    setAvatarUrl(doc.data().profilePicUrl)
    setFirstName(doc.data().firstName);
    setLastName(doc.data().lastName);
    setEmail(doc.data().email);
    setId(doc.data().id);
    setDetails(doc.data().details);
    setFaceLink(doc.data().facebook);
    setInstaLink(doc.data().instagram);
    setTwitLink(doc.data().twitter);
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
      console.log('User is signed in with UID:', userId);
    } else {
      // User is signed out

      console.log('No user is signed in.'); 
      
      } 
    }
    )
  
  },[])
  return (
    <div className="max-w-4xl pt-40 mx-auto p-4">
          <h1 className="text-2xl flex font-bold mb-4">Hi {firstName}, Would you like to list your retreat?</h1>

    <div className="w-full p-8 h-auto flex justify-center items-center ">
      <div className="bg-white  px-8 pt-20 pb-8 mb-4">      
        <p className="mb-4"><span className="font-bold">First Name:</span> {firstName}</p>
        <p className="mb-4"><span className="font-bold">Last Name:</span> {lastName}</p>
        <p className="mb-4"><span className="font-bold">Email:</span> {email}</p>
        <SocialMedia isOpen={isModalOpen} onClose={closeModal}>
          <div style={{width:'100%',}} className="justify-center items-center text-center p-4 bold text-sm">
                <input type="text" className='underline m-4 p-4' placeholder='Add Facebook Link' onChange={(e)=>setFacebookLink(e.target.value)}/>
                <input type="text" className='underline m-4 p-4' placeholder='Add Instagram Link' onChange={(e)=> setInstagramLink(e.target.value)}/>
                <input type="text" className='underline m-4 p-4' placeholder='Add Twitter Link' onChange={(e)=>setTwitterLink(e.target.value)}/>
                <input type="text" className='underline m-4 p-4' placeholder='Add Pinterest Link' onChange={(e)=> setPinterestLink(e.target.value)}/>
                <Button type='submit' onClick={submitSocials}>Submit</Button>



            </div>
            </SocialMedia>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={opensocials}>
          Social Media 
        </button>
       <Link to={`/list/${userId}`}className="text-sm underline mt-2 m-5" >
                  <Button>List Your Retreat</Button>

        </Link>
        <Button>Edit your info</Button>
        <br/>
        <br/>
          <label for="profile-pic">Upload profile photo</label><br/>
          <input type="file" id="profile-pic"  onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
          <br/><br/>
          <button onClick={profile} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</button>
          
        
        
      </div> <div className='grid'>
              <img src={avatarUrl} alt="Avatar" className="w-60 h-60 rounded-full mb-4"/>
              <div className='flex ml-10'>
              <a href={`${faceLink}`} target="_blank" ><FacebookIcon className='m-2 cursor-pointer' fontSize="large"/></a>
           <a href={`${instaLink}`} target="_blank" ><InstagramIcon className='m-2 cursor-pointer' fontSize="large"/></a>
            <a href={`${twitLink}`} target="_blank" ><TwitterIcon className='m-2 cursor-pointer' fontSize="large"/></a>
            </div>
            </div>
    </div>
    <div className="mt-10">
        <p className="max-w-full">{details}</p>
    </div>
    <br/>
    <label for="pic">Upload pics for display</label><br/>
    <input type="file" className="mt-4" onChange={(event)=>{setImageUpload(event.target.files[0])}} name="pic" id="pic"/>
         <button onClick={uploadImage} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</button>
         <div className="flex gap-4 mt-4">
      {imageList.map((url)=>{
      return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                     <button onClick={()=> deleteImage(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</button>



      </div>
      
     })}
     </div>
    </div>
  )
}

