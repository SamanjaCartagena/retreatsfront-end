import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from '../../firebase.js';
import { Button } from "@/components/ui/button";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import Hosts from './Hosts.js'
import { Link } from 'lucide-react';
import Modal from '../Modal.js';
function Host() {
  
  const auth = getAuth();
  const [doesUserExist, setDoesUserExist] = useState(true);
  const navigate=useNavigate();
  const [email, setEmail]=useState('');
  const [userId, setUserId]=useState('');
  const [password, setPassword]=useState('');
  const pic="https://halohealingtherapies.com/wp-content/uploads/sites/41846/2024/02/beauty-spa-1024x683.jpg"
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
           <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
   
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