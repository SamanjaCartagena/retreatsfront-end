import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from '../../firebase.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Centers from './Centers.js'
import { query } from 'firebase/firestore';


export function RetreatCenters() {
  useEffect(()=>{
      window.scrollTo(0,0)
        
  },[])
 const pic="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/Untitled%20design%20-%202026-03-26T004709.439.png?alt=media&token=99499b8e-8a93-42ed-a374-c01c5baf1900"
  const navigate=useNavigate();
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');

  const signUpHost=()=>{
    navigate('/signUpAsHost');
  }
  const signIn=()=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert('Sign In Successful'+user.email);
    navigate(`/`);
    window.location.reload()

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }
   

  return (
    <div>
        <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
   
    <div className="justify-center items-center grid h-screen absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pic})` }}>
      
      <div className="w-full max-w-xs items-center justify-center">
        
      
  

 
</div>


</div>
    </div>

   
     <Centers/>
    </div>
  )
  }

export default RetreatCenters;