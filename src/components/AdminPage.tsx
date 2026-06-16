import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import pic from '../assets/logoretreat.png'
function AdminPage() {
const params=useParams()
const auth=getAuth()
const userId = params.userId;

   useEffect(()=>{

          onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://google.com
      const uid = user.uid;
  
  
      }
      else{
      }
    }) 
  

   },[])
  return (
    <div>
        <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
   
    <div className="justify-center items-center grid h-screen absolute inset-0 bg-cover bg-center"  >
      
      <div className="w-full max-w-xs items-center justify-center">
    
    <center><h1 className='text-2xl font-bold'>Welcome to the Admin Page!</h1></center>
    <div className='flex mt-5 justify-center items-center'>
  <div className='grid m-5 p-5 border-2 border-solid border-gray rounded'>
    <img src={pic} />
            <Link to={`/profile/${userId}`}>

    <Button className='w-40 bg-lime-700 hover:bg-lime-800 m-2'>Host Admin</Button>
    </Link>
    <Link to="signupasHost">
        <Button className='w-40 bg-lime-700 hover:bg-lime-800 m-2'>Sign Up As a Host</Button>
        </Link>

    </div>
    
    <div className='grid m-5 p-5 border-2 border-solid border-gray rounded'>
    <img src={pic} />
    <Button className='w-40 bg-lime-700 hover:bg-lime-800 m-2'>Guide Admin</Button>
        <Button className='w-40 bg-lime-700 hover:bg-lime-800 m-2'>Sign Up As a Guide</Button>
    
    
    </div>
    <div className='grid m-5 p-5 border-2 border-solid border-gray rounded'>
    <img src={pic} />
     <Button className='w-40 bg-lime-700 hover:bg-lime-800 m-2'>Guest Admin</Button>
        <Button className='w-40 bg-lime-700 hover:bg-lime-800 m-2'>Sign Up As a Guest</Button>
    </div>
    </div>
    
    </div>
    </div>
    </div>
    </div>
  )
}

export default AdminPage