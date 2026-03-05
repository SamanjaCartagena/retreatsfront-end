import React,{useEffect, useState} from 'react'
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db, auth,storage} from "../firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";

import { useParams } from 'react-router-dom';
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
          <h1 className="text-2xl flex font-bold mb-4">Profile</h1>

    <div className="w-full p-8 h-auto flex justify-center items-center ">
      <div className="bg-white  px-8 pt-20 pb-8 mb-4">      
        <p className="mb-4"><span className="font-bold">First Name:</span> {firstName}</p>
        <p className="mb-4"><span className="font-bold">Last Name:</span> {lastName}</p>
        <p className="mb-4"><span className="font-bold">Email:</span> {email}</p>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => signOut(auth)}>
          Follow {firstName}
        </button>
        <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => signOut(auth)}>
          List Your Retreats
        </button>
        <br/>
          <input type="file"  onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
          <button onClick={profile} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Profile Picture</button>
          
        
        
      </div>
              <img src={avatarUrl} alt="Avatar" className="w-60 h-60 rounded-full mb-4"/>
    </div>
    <div className="mt-10">
        <p className="max-w-full">Hi! I'm Samia, the founder of Wanderlust Retreat Globe. With a passion for travel and wellness, I created this platform to help you discover transformative retreat experiences around the world. My mission is to connect you with retreats that nourish your mind, body, and spirit in the most inspiring locations. Let's embark on a journey of self-discovery and rejuvenation together!</p>
    </div>
    <input type="file" className="mt-4" onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
         <button onClick={uploadImage} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</button>
         <div className="flex gap-4 mt-4">
      {imageList.map((url)=>{
      return <div ><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/>
                     <button onClick={()=> deleteImage(url)} className='bg-lime-700  text-white font-bold py-2 px-2 ounded focus:outline-none focus:shadow-outline'>Delete Image</button>



      </div>
      
     })}
     </div>
    </div>
  )
}

