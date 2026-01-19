import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from '../firebase.js';
import pic from '../assets/form.png';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
function Host() {
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
    navigate('/')
    window.location.reload()

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  return (
        <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
   
    <div className="justify-center items-center grid h-screen absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pic})` }}>
      
      <div className="w-full max-w-xs items-center justify-center">
        
      
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className='justify-center items-center text-center p-4 bold text-lg'>Sign in as a Host</h2>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e)=> setPassword(e.target.value)}/>
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={signIn}>
        Sign In
      </button>
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
     
      </div>
      <br/>
       <h2 className="inline-block align-baseline font-bold text-decoration-line text-md cursor-pointer text-blue-500 hover:text-blue-800" onClick={signUpHost}>
        Create a Profile
      </h2>
  </form>
    

  <p className="text-center text-gray-500 text-xs">
    &copy;2025 World of Bots LLC. All rights reserved.
  </p>
</div>    
</div>
    </div>
  )
  }

export default Host