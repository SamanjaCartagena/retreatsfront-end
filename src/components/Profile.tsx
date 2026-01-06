import React,{useEffect, useState} from 'react'
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth} from "../firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { set } from 'date-fns';
export default function Profile() {
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [email,setEmail]=useState('');  

    useEffect(() => {
       onAuthStateChanged(auth, async (user) => {
    if (user)  {
      // User is signed in
      const uid = user.uid;
     const q =query(collection(db, "hosts"), where("id", "==", uid));
      const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data().firstName);
    setFirstName(doc.data().firstName);
    setLastName(doc.data().lastName);
    setEmail(doc.data().email);
  });
      
      console.log('User is signed in with UID:', uid);
    } else {
      // User is signed out

      console.log('No user is signed in.'); 
      
      } 
    }
    )
  
  },[])
  return (
    
    <div className='flex justify-center items-center h-screen flex-col gap-4 text-lg'>
      Your Profile Details:
      <div>
        First Name: {firstName} 
      </div>
      <div>
        Last Name: {lastName}   
      </div>
      <div>
        Email: {email}   
      </div>
    </div>
  )
}

