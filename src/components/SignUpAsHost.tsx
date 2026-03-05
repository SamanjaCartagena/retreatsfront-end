import React from 'react'
import pic1 from '../assets/retreat1.jpg'
import pic2 from '../assets/retreat2.jpg'
import pic3 from '../assets/retreat3.jpg'
import { Checkbox } from '@radix-ui/react-checkbox'
import Modal from './Modal.js';
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
  const [isCheckedRecreationRetreat, setIsCheckedRecreationRetreat] = useState(false)
  const [isCheckedOthers, setIsCheckedOthers] = useState(false)
  

  const closeModal = () => setIsModalOpen(false);
  const closePasswordModal =()=>setPasswordModal(false);
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
    <div className="justify-center items-center grid h-auto">
     <img src={pic1} className='w-200' />      
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

    <p className="indent-8 px-5 py-5">1. What is the purpose of your retreat?
      <br/>
    <span>Whatever you are trying to accomplish through your retreat should remain your focus
      throughout the process. Whether you are trying to bring people together (community engagement) or keep people apart by hosting
      silent getaway retreat. You need to be aligned with the purpose of your retreat while planning,
      brainstorming, and implementing your retreat. Hosting a silent meditation mountain retreat in Montana can be very different
      than a wine retreat in Napa Valley. In order to host a successful retreat, every detail needs to be aligned with the purpose of the retreat. 
    </span>
    </p>
     <p className="indent-8 px-5 py-5">2. Select photos, themes and a name that clearly defines the purpose of the retreat.
      <br/>
    <span>You do not want to mislead people. If its a vegan retreat guests cannot be misled into thinking meat will be available.
      You want to be very clear and definite about the purpose of the retreat. If its a camping retreat with no plans of fishing with your guests
      You do not want people to think there will be fishing activity involved in the retreat. You cannot put a picture of fishing or hiking or kayaking if 
      you do not plan to involve such activities. The theme , the name and the marketing needs to be very clear about the purpose of your retreat.
    </span>
    </p>
     <p className="indent-8 px-5 py-5">3. Set dates, duration and a very clear budget
      <br/>
    <span>
      Dates and duration are the most important factor of a retreat. Also it is always better if you mention
      the money you will be charging your guests very clearly on the first page of your guide, or the flyer. You must
      mention whether flight expenses, cab fares or car rentals are included. If they are not, please mention this. You must mention
      if meals are included, what kind of meals are included. You do not want your retreat guests to be surprised with hidden charges
      or surprise charges. Anything that can mislead your guests or make your guests believe that they have been scammed will
      limit future business acticity with them. You do not want to breach the trust of people who will be putting their safety, their security and their
      health into your hands. 
    </span>
    </p>
    <p className="indent-8 px-5 py-5">3. Secure a location
      <br/>
    <span>
      With Retreats Around the World, you can secure a safe location for your retreat. Our AI technology can find you the right retreat center for you.
      Our AI scrapes through millions of reviews and comes up with the perfect place for your retreat. We have partnered with thousands of retreat centers, Airbnb hosts, home owners,
      hotels and short term rentals all around the world after going through countless reviews and safety features.
      Suppose you want to host an Ayurveda Health retreat in Asia with in house doctors and health practicioners. Our AI will go through all the Ayurveda Retreats available in Asia 
      and will come up with the retreat center that fits your requirements and your guests needs and also your budget. 
    </span>
    </p>
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
    </div>
    
    </>
  )
}

export default SignUpAsHost