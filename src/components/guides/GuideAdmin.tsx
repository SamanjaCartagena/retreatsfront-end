import React,{useEffect, useState} from 'react'
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db, auth,storage} from "../../firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SocialMedia from '../SocialMedia.js';
import {Link} from 'react-router-dom';
import Modal from '../Modal.js';

import {v4} from 'uuid';
import { Card } from '../ui/card.js';
import { url } from 'inspector';
export default function GuideAdmin() {
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
  const [guideSpecialty, setGuideSpecialty] = useState("")
  const [guideUserName, setGuideUserName] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalForHost, setModalForHost] = useState(false)
  const [guideIntroduction, setGuideIntroduction] = useState("")
  const [phone,setPhone] = useState("")
  const [allRetreats, setAllRetreats] = useState([])
 
  const [openEditor, setOpenEditor] = useState(false)
  const navigate = useNavigate()
    const imageListRef = ref(storage, `/images/${userId}/`);
    const profileRef = ref(storage, `/profilePic/${userId}/`);
    const deleteImageRef = ref(storage, `/images/${userId}/`);
    const saveChanges =()=>{
      const docRef = doc(db, "guides", documentId);
      updateDoc(docRef, { guideFirstName: firstName,
        guideLastName: lastName,
        guideEmail: email, 
        guideUsername:guideUserName,
        guideIntroduction: guideIntroduction,
        guidePhone: phone,
        guideSpecialty: guideSpecialty,
      
       });
       setOpenEditor(false);
    }

   const profile=()=>{
    
    const profilePicRef = ref(storage, `/profilePic/${userId}/profile.jpg`);
    uploadBytes(profilePicRef, imageUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        setAvatarUrl(url);
          const docRef = doc(db, "guides", documentId);

           updateDoc(docRef, {
             guideProfilePicUrl: avatarUrl,
            
                   });
      }
      );
    });
   }
   
 const deleteImage=(url)=>{
   console.log("Are you sure you want to delete this image?"+url);
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

 
  const uploadImage=()=>{
    // Create a root reference
    console.log("Upload Image");
    if(imageUpload == null) return;
    
    
    const imageRef = ref(storage, `/guides/${userId}/${imageUpload.name+v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        setImageList((prev)=>[...prev, url]);
      }
      );
    });

  }
    useEffect(() => {
     
      const loadData = async () => {
     const q =query(collection(db, "guides"), where("guideId", "==", userId));
      const querySnapshot = await getDocs(q);
       if(querySnapshot.size === 0){
          setModalForHost(true)
          return;
        }
        else{
        querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    setDocumentId(doc.id)
    setAvatarUrl(doc.data().profilePicUrl)
    setFirstName(doc.data().guideFirstName);
    setLastName(doc.data().guideLastName);
    setGuideIntroduction(doc.data().guideIntroduction);
    setPhone(doc.data().guidePhone);
    setGuideSpecialty(doc.data().guideSpecialty);
    setGuideUserName(doc.data().guideUsername);
   
  });
}

    const profilePic = ref(storage, `/guideProfilePic/${userId}/profile.jpg`);
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
      setEmail(user.email)
      setId(user.uid)
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
       <Modal isOpen={modalForHost} onClose={()=>setModalForHost(false)}>
            <div style={{width:'100%',}} className="justify-center items-center text-center p-4 bold text-lg">
                    <br/>

             <h1 className="mt-20">
              You are not signed up as a guide!
             </h1>
             <br/>
             <Link to={`/adminpage/${userId}/guidesignup`}>
             <Button className='bg-lime-700 hover:bg-lime-800'>Sign Up as a Guide</Button>
             </Link>
             </div>
       </Modal>
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
             <input type="text" placeholder="Username" value={guideUserName} onChange={(e)=>setGuideUserName(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
             <textarea placeholder="Host Introduction" value={guideIntroduction} onChange={(e)=>setGuideIntroduction(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
              <textarea placeholder="Guide Specialty" value={guideSpecialty} onChange={(e)=>setGuideSpecialty(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
              <h1 className="text-xl font-bold mb-2">Retreat Types (Check all that apply)</h1>
            
                       
       
              <button onClick={saveChanges} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Save Changes</button>

                </div>
                </Modal>
      
    <div className="w-full p-8 h-auto flex justify-center items-center ">
      
      <div className="bg-white  px-8  pb-8 mb-4">      
        <p className="mb-4"><span className="font-bold">First Name:</span> {firstName}</p>
        <p className="mb-4"><span className="font-bold">Last Name:</span> {lastName}</p>
        <p className="mb-4"><span className="font-bold">Username:</span> {guideUserName}</p>
        <p className="mb-4"><span className="font-bold">Email:</span> {email}</p>
        <p className="mb-4"><span className="font-bold">Phone:</span> {phone}</p>
        <p className="mb-4"><span className="font-bold">Introduction:</span> {guideIntroduction}</p>
        <p className="mb-4"><span className="font-bold">Guide Specialty:</span> {guideSpecialty}</p>
       
  
        <div className="grid  items-center mt-1">
        
      
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

