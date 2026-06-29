import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from '../../firebase.js';
import { Button } from "@/components/ui/button";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import Hosts from './Hosts.js'
import { Link } from 'lucide-react';
import Modal from '../Modal.js';
function Host() {
  useEffect(()=>{
   window.scrollTo(0,0)
  },[])
  const auth = getAuth();
  const [doesUserExist, setDoesUserExist] = useState(true);
  const navigate=useNavigate();
  const [email, setEmail]=useState('');
  const [userId, setUserId]=useState('');
  const [password, setPassword]=useState('');
  const pic="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/healers.jpeg?alt=media&token=9dcc58f1-6a84-464b-8d92-d9483e9a49e9"

  const signUpHost=()=>{
    navigate('/signUpAsHost');
  }
  const signIn=()=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate(`/adminpage/${user.uid}`);
    window.location.reload();
    console.log('User signed in with UID:', user.uid);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setDoesUserExist(false);
  });
  }
  const forgot = async() => {
    await sendPasswordResetEmail(auth, email)
  .then(() => {
    alert('Password reset email sent!');
  })
  .catch((error) => {
    alert('Error sending password reset email');  
  });
  }

  return (
    <div>
           <div className="relative h-[60vh] min-h-[600px] w-full overflow-hidden">
   
    <div className="justify-center items-center grid h-screen absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pic})` }}>
      
      <div className="w-full max-w-xs items-center justify-center">
        
      
  

 
</div>


</div>

    </div>
 
    

  




    <Hosts/>
     
    </div>
  )
  }

export default Host