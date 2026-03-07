import React,{useEffect, useState} from 'react'
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db, auth,storage} from "../firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import {useParams} from 'react-router-dom'
export default function ProfileSelected() {
    const params = useParams();
    const userId = params.userId;
    const [documentId,setDocumentId]= useState('')
    const [avatarUrl,setAvatarUrl]= useState('')
    const [firstName, setFirstName]= useState('')
    const [lastName, setLastName] = useState('')
    const[email,setEmail] = useState('')
    const [id, setId]= useState('')
    const [details, setDetails] = useState('')
    
  useEffect(()=>{
     
       onAuthStateChanged(auth, async (user) => {

         const q = query(collection(db, "hosts"), where("id", "==", userId));
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
      });
    })
  },[])
  return (
    <div className='relative h-[80vh] min-h-[1000px] w-full overflow-hidden grid' style={{position:'relative', top:'200px;'}} >
      <br/>
      <br/>
        <h1>Profile Selected</h1><br/>
        <h1>{firstName}</h1>
        <br/>
        <h1>{lastName}</h1>
        <img src={avatarUrl} className='w-60 h-60'/>
    </div>
  )
}
