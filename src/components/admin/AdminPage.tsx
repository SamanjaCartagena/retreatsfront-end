import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import pic2 from '../../assets/luxury.jpg'
import pic from '../../assets/logoretreat.png'
import pic3 from '../../assets/africa.jpg'
import pic4 from '../../assets/safari.jpg'
function AdminPage() {
  const pic1="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/waterfall.gif?alt=media&token=bd5aa5c6-3af8-422d-b5a9-7010cc9fbc85"
const params=useParams()
const auth=getAuth()
const userId = params.userId;
   useEffect(()=>{
               window.scroll(0,0)

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
    <div className="relative h-[100vh] min-h-[1400px] w-full overflow-hidden">

        <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pic1})` }}
      >   
      <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="animate-fade-in">
              <center><img src={pic} className="justify-center" style={{width:'150px', height:'150px'}}/></center>
              <center><h1 className="text-2xl md:text-2xl sm:text-2xl md:pt-6 lg:text-5xl font-serif font-bold tracking-tight text-white justify-center mb-6">
                Welcome to the Admin Page!
              </h1></center>
                <center>
              <div className="flex flex-col justify-center mt-6 sm:flex-row gap-4">
               <div className='grid m-5 p-5 border-2 border-solid border-gray rounded'>
              <center><h2 className='text-white font-bold'>Admin</h2></center>
                        <Link to={`/adminpage/${userId}/hostdetails`}>

                 <Button className='w-40 bg-white text-lime-700 m-2'>Host Admin</Button>
                 </Link>
                <Link to={`/adminpage/${userId}/signupashost`}>
                  <Button className='w-40 bg-white text-lime-700 m-2'>Sign Up As a Host</Button>
                  </Link>

    </div>
     <div className='grid m-5 p-5 border-2 border-solid border-gray rounded'>
          <center><h2 className='text-white font-bold'>Guide</h2></center>

    <Link to={`/adminpage/${userId}/guideadmin`}>
    <Button className='w-40 bg-white text-lime-700 m-2'>Guide Admin</Button>
    </Link>
        <Link to={`/adminpage/${userId}/guidesignup`}>

        <Button className='w-40 bg-white text-lime-700 m-2'>Sign Up As a Guide</Button>
        </Link>
    
    
    </div>
      <div className='grid m-5 p-5 border-2 border-solid border-gray rounded'>
          <center><h2 className='text-white font-bold'>Guest</h2></center>
        <Link to={`/adminpage/${userId}/guests`}>
     <Button className='w-40 bg-white text-lime-700 m-2'>Guest Admin</Button>
     </Link>
     <Link to={`/adminpage/${userId}/guests`}>
        <Button className='w-40 bg-white text-lime-700 m-2'>Sign Up As a Guest</Button>
        </Link>
    </div>
       <div className='grid m-5 p-5 border-2 border-solid border-gray rounded'>
          <center><h2 className='text-white font-bold'>Retreat Centers</h2></center>

    <Link to={`/adminpage/${userId}/retreatcenters`}>
     <Button className='w-40 bg-white text-lime-700 m-2'>Retreat Center</Button>
     </Link>
     <Link to={`/adminpage/${userId}/listacenter`}>
        <Button className='w-40 bg-white text-lime-700 m-2'>Retreat Center Sign Up</Button>
        </Link>
    </div>
              </div>
              </center>
            </div>
          </div>
        </div>

    </div>
    
    </div>
    <center>
      
        
      <p className='text-black font-bold text-2xl m-4 underline'>     <a href="https://www.awin1.com/cread.php?awinmid=24529&awinaffid=2968735&campaign=FamilySafarisSA&clickref=safari&clickref2=africa&clickref3=lion&ued=https%3A%2F%2Fwww.retreatsaroundtheworld.net"  target="_blank" rel="sponsored">
Host a Retreat on African Safari</a></p></center>
  
    <div className='flex justify-center flex-wrap'>
    <img src={pic2} className="m-4 rounded" style={{height:'400px'}} />
    <img src={pic3} className="m-4 rounded" style={{height:'400px'}} />
    <img src={pic4} className="m-4 rounded" style={{height:'400px'}} />
    </div>

    </div>
    
  )
}

export default AdminPage