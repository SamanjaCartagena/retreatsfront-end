import React from 'react'
import { Checkbox } from '@radix-ui/react-checkbox'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from './Modal.js';
import ModalHost from './ModalHost.js'
import {auth, googleProvider} from '../firebase.js';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase.js';
import { createUserWithEmailAndPassword,signInWithPopup, signOut } from 'firebase/auth'
import {useState} from 'react';


function SignUpAsHost() {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [username, setUsername] = useState('');
  const [retreatTypes, setRetreatTypes] = useState([]);
  const [details, setDetails] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [isCheckedVeganRetreat, setIsCheckedVeganRetreat] = useState(false)
  const [isCheckedHypnoRetreat, setIsCheckedHypnoRetreat] = useState(false)
  const [isCheckedMeditationRetreat, setIsCheckedMeditationRetreat] = useState(false)
  const [isCheckedCorporateRetreat, setIsCheckedCorporateRetreat] = useState(false)
  const [isCheckedHealthRetreat, setIsCheckedHealthRetreat] = useState(false)
  const [isCheckedYogaRetreat, setIsCheckedYogaRetreat] = useState(false)
  const [isPurpose, setIsPurpose] = useState(false)
  const [isCheckedRecreationRetreat, setIsCheckedRecreationRetreat] = useState(false)
  const [isCheckedOthers, setIsCheckedOthers] = useState(false)
  const pic="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/retreat1.jpg?alt=media&token=0c739aa7-357f-4422-b0ff-49d055754ecb"

  const closeModal = () => setIsModalOpen(false);
  const closePasswordModal =()=>setPasswordModal(false);
  const closePurposeModal =()=> setIsPurpose(false)
  const create= async()=>{
      try{
        if(password1===confirmPassword){
                  await createUserWithEmailAndPassword(auth,email,confirmPassword)
                  .then((userCredential)=>{
                    const user = userCredential.user;
                    console.log('User created:', user.uid);
                                  addDoc(collection(db, "hosts"), {
                                  id: user.uid,
                                  firstName: firstName,
                                  lastName: lastName,
                                  introduction: introduction,
                                  username: username,
                                  email: email,
                                  details: details,
                                  veganRetreat:isCheckedVeganRetreat,
                                  hypnoRetreat:isCheckedHypnoRetreat,
                                  meditationRetreat:isCheckedMeditationRetreat,
                                  corporateRetreat:isCheckedCorporateRetreat, 
                                  healthRetreat:isCheckedHealthRetreat,
                                  yogaRetreat:isCheckedYogaRetreat,
                                  recreationRetreat:isCheckedRecreationRetreat,
                                  others:isCheckedOthers,
                                  profilePicUrl:"https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/avatar.jpg?alt=media&token=6a6c61e3-dcde-4170-bb9f-b1ecb1c69d40",
                                  createdAt: new Date()
                                });
                  })
                  .catch((error)=>{
                    console.error('Error creating user:', error);
                  });
                  
                  setIsModalOpen(true);

        }
        else{
           setPasswordModal(true);
        }
        }catch(err){
            console.error(err)
        }
      }
  return (
    <>
     <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
      
      
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pic})` }}
      >
      
        <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl sm:text-2xl md:pt-6 lg:text-6xl font-serif font-bold tracking-tight text-white mb-6">
                Transform A Mind with a Retreat.
              </h1>
                   <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div style={{width:'100%',}}>
                Congratulations on Creating a profile
            </div>
            </Modal>
           <Modal isOpen={passwordModal} onClose={closePasswordModal}>
          <div style={{width:'100%',}}>
                Passwords do not match, Please try again!
            </div>
            </Modal>
                 <ModalHost isOpen={isPurpose} onClose={closePurposeModal}>
          <div style ={{width:'100%', overflowY:'scroll',height:'700px', padding:'20px', textAlign:'left'}}>
                <h2>What is the purpose of your Retreat?</h2><br />
                <p>
                  The true purpose of a retreat is to create a profound "pattern interrupt" in the relentless momentum of everyday life.
                </p><br/>
                <p>
                  It is not simply a vacation to escape reality, but rather a sacred, intentional pause designed to help people reconnect with their deepest self.
                </p>
                <br/>
                <p>
                  When you step away from the noise, obligations, and familiar triggers of your daily routine, you finally create the necessary space for deep healing, startling clarity, and a realignment of your purpose
                </p>
                <br/>
            </div>
            </ModalHost>
        <Modal isOpen={passwordModal} onClose={closePasswordModal}>
          <div style={{width:'100%',}}>
                Passwords do not match, Please try again!
            </div>
            </Modal>


              <p className="text-xl text-white/90 mb-8 max-w-2xl">
               Set out on a journey to Heal, Renew and Transform someone
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={()=> setIsPurpose(true)}>
                 Purpose
                </Button>
                <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6">
                 Influence
                </Button>
                <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6">
                 Secure a Location
                </Button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
   
        <div className="justify-center items-center grid h-auto">
           Create a host Profile
        <div className="max-w-xl">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <br/>
    <div className="mb-4">
       <label className="block text-gray-700 text-sm font-bold mb-2" >
        First Name
      </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" onChange={(e)=> setFirstName(e.target.value)}/>
            <br/>
            <br/>
          
        <label className="block text-gray-700 text-sm font-bold mb-2" >
        Last Name
      </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Last Name" onChange={(e)=> setLastName(e.target.value)}/>
      <br/><br/>
     <label className="block text-gray-700 text-sm font-bold mb-2" >
        Tell us something about yourself
      </label>
                   <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="introduction" placeholder="Tell us something about yourself" onChange={(e)=>setIntroduction(e.target.value)}></textarea>
         <br/><br/>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Username
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e)=> setUsername(e.target.value)}/>
      <br/><br/>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Email
      </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} />
     <br/><br/>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Create Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e)=>setPassword1(e.target.value)}/>
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Confirm Password
      </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e)=>setConfirmPassword(e.target.value)}/>
       <label className="block text-gray-700 text-sm font-bold mb-2" >
       What kind of retreats will you be hosting? Check all that apply.</label>
      <br/>
      <input type="checkbox" id="veganretreat" checked={isCheckedVeganRetreat} onChange={(e)=>setIsCheckedVeganRetreat(true)}/>
      <label >&nbsp;Vegan Retreat</label>
      <br/>
      <input type="checkbox" id="hypnoretreat" checked={isCheckedHypnoRetreat} onChange={(e)=>setIsCheckedHypnoRetreat(true)}/>
      <label  >&nbsp;Hypnotherapy</label>
      <br/>
      <input type="checkbox" id="meditationretreat" checked={isCheckedMeditationRetreat} onChange={(e)=>setIsCheckedMeditationRetreat(true)}/>
      <label >&nbsp;Meditation Retreat</label><br/>
      <input type="checkbox" id="corporateretreat" checked={isCheckedCorporateRetreat} onChange={(e)=> setIsCheckedCorporateRetreat(true)}/>
      <label >&nbsp;Corporate Retreat</label><br/>
      <input type="checkbox" id="healthretreat" checked={isCheckedHealthRetreat} onChange={(e)=> setIsCheckedHealthRetreat(true)}/>
      
      <label >&nbsp;Health Retreat</label>
      <br/>
         <input type="checkbox" id="yogaretreat" checked={isCheckedYogaRetreat} onChange={(e)=>setIsCheckedYogaRetreat(true)}/>
      
      <label >&nbsp;Yoga Retreat</label>
      <br/>
        <input type="checkbox" id="recreationretreat" checked={isCheckedRecreationRetreat} onChange={(e)=>setIsCheckedRecreationRetreat(true)}/>
      
      <label>&nbsp;Recreation Retreat</label>
      <br/>
      <input type="checkbox" id="others" checked={isCheckedOthers} onChange={(e)=> setIsCheckedOthers(true)}/>
            <label >&nbsp;Others</label>
            <br/>
            <br/>
                   <label className="block text-gray-700 text-sm font-bold mb-2" >
            What kind of Retreats will you be hosting in details?...</label>
                   <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="details" placeholder="Tell us in details what kind of retreats you would love to host....." onChange={(e)=> setDetails(e.target.value)}></textarea>\
       </div>

    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={create}>
        Create a Profile
      </button>
     
     </div>
      
      <br/>
      
  </form>
  <p className="text-center text-gray-500 text-xs">
    &copy;2025 World of Bots LLC. All rights reserved.
  </p>
  </div>
</div>  
    
    </>
  )
}

export default SignUpAsHost