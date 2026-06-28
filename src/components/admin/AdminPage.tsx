import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import pic from '../../assets/logoretreat.png'
function AdminPage() {
  const pic1="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/Untitled%20design%20-%202026-06-21T233311.359.png?alt=media&token=8031d971-2802-45f6-bbb6-65327d9b229f"
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
    <div  style={{ backgroundImage: `url(${pic1})`, backgroundRepeat:'no-repeat', backgroundSize:'100%'}}>
        <div className="relative h-[80vh] min-h-[900px] w-full overflow-hidden" >
   
    <div className="justify-center items-center grid h-screen absolute inset-0 bg-cover bg-center"  >
      
      <div className="w-full max-w-xs items-center justify-center">
        <center><img src={pic} style={{width:'150px', height:'150px'}}/></center>

    <center><h1 className='text-2xl font-bold text-white'>Welcome to the Admin Page!</h1></center>
    <div className='flex mt-5 justify-center md:grid-cols-2 sm:grid-cols-1 items-center'>

  <div className='grid m-5 p-5 border-2 border-solid border-gray rounded'>
    <center><h2 className='text-white font-bold'>Admin</h2></center>
            <Link to={`hostdetails`}>

    <Button className='w-40 bg-white text-lime-700 m-2'>Host Admin</Button>
    </Link>
    <Link to={`signupashost`}>
        <Button className='w-40 bg-white text-lime-700 m-2'>Sign Up As a Host</Button>
        </Link>

    </div>
    
    <div className='grid m-5 p-5 border-2 border-solid border-gray rounded'>
          <center><h2 className='text-white font-bold'>Guide</h2></center>

    <Link to={`guideadmin`}>
    <Button className='w-40 bg-white text-lime-700 m-2'>Guide Admin</Button>
    </Link>
        <Link to={`guidesignup`}>

        <Button className='w-40 bg-white text-lime-700 m-2'>Sign Up As a Guide</Button>
        </Link>
    
    
    </div>
    <div className='grid m-5 p-5 border-2 border-solid border-gray rounded'>
          <center><h2 className='text-white font-bold'>Guest</h2></center>

     <Button className='w-40 bg-white text-lime-700 m-2'>Guest Admin</Button>
     <Link to={`guests`}>
        <Button className='w-40 bg-white text-lime-700 m-2'>Sign Up As a Guest</Button>
        </Link>
    </div>
     <div className='grid m-5 p-5 border-2 border-solid border-gray rounded'>
          <center><h2 className='text-white font-bold'>Retreat Centers</h2></center>

    <Link to={`retreatcenters`}>
     <Button className='w-40 bg-white text-lime-700 m-2'>Retreat Center</Button>
     </Link>
     <Link to={`listacenter`}>
        <Button className='w-40 bg-white text-lime-700 m-2'>Retreat Center Sign Up</Button>
        </Link>
    </div>
    </div>
    
    </div>
    </div>
    </div>
    </div>
  )
}

export default AdminPage