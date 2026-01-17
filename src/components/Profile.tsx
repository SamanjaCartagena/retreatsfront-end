import React,{useEffect, useState} from 'react'
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth} from "../firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


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
        
      </div>
              <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="w-60 h-60 rounded-full mb-4"/>
    </div>
    <div className="mt-10">
        <p className="max-w-full">Hi! I'm Samia, the founder of Wanderlust Retreat Globe. With a passion for travel and wellness, I created this platform to help you discover transformative retreat experiences around the world. My mission is to connect you with retreats that nourish your mind, body, and spirit in the most inspiring locations. Let's embark on a journey of self-discovery and rejuvenation together!</p>
    </div>
    </div>
  )
}

