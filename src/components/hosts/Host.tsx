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
        <div className="relative h-[80vh] min-h-[1000px] w-full overflow-hidden">
   
      
      <div className="w-full mt-20 items-center justify-center">
        <Hosts/>
        <Modal isOpen={!doesUserExist} onClose={()=>setDoesUserExist(true)} >
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">User Not Found</h2>
          <p className="mb-4">The email or password you entered is incorrect. Please try again.</p>
          <Button onClick={()=>setDoesUserExist(true)} className="bg-lime-700 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Close
          </Button>
        </div>
      </Modal>
 
    

  



</div>
    </div>
     
    </div>
  )
  }

export default Host