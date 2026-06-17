import React,{useEffect, useState} from 'react'
import { Checkbox } from '@radix-ui/react-checkbox'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from '../Modal.js';
import ModalHost from '../ModalHost.js'
import {auth, googleProvider, db} from '../../firebase.js';
import { collection, addDoc, query, getDocs, where } from "firebase/firestore"; 
import { createUserWithEmailAndPassword,signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import ModalCancellation from '../ModalCancellation.js';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
function SignUpAsHost() {
  const [hostEmail, setHostEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [passwordLengthModal, setPasswordLengthModal] = useState(false);
  const [lastName, setLastName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [username, setUsername] = useState('');
  const [details, setDetails] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [isCheckedCancellation, setIsCheckedCancellation] = useState(false);
  const [payout,setPayout]= useState(false)
  const [hostId, setHostId] = useState('')
  const [value, setValue] = React.useState<Dayjs | null>();
  const [isCheckedVeganRetreat, setIsCheckedVeganRetreat] = useState(false)
  const [isCheckedSoundHealing, setIsCheckedSoundHealing] = useState(false)
  const [isCheckedMeditationRetreat, setIsCheckedMeditationRetreat] = useState(false)
  const [isCheckedCorporateRetreat, setIsCheckedCorporateRetreat] = useState(false)
  const [isCheckedWorkoutRetreat, setIsCheckedWorkoutRetreat] = useState(false)
  const [isCheckedYogaRetreat, setIsCheckedYogaRetreat] = useState(false)
  const [isCheckedHikingRetreat, setIsCheckedHikingRetreat] = useState(false)
  const [isCheckedTerms, setIsCheckedTerms] = useState(false)
  const [isPurpose, setIsPurpose] = useState(false)
  const [cancellation, setCancellation] = useState(false)
  const [isCheckedRecreationRetreat, setIsCheckedRecreationRetreat] = useState(false)
  const [isCheckedOthers, setIsCheckedOthers] = useState(false)
  const [modalCancellationOpen, setModalCancellationOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [isPayputChecked, setIsPayoutChecked] = useState(false)
  const [terms, setTerms] = useState(false);
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [type1, setType1] = useState('')
  const [type2, setType2] = useState('')
  const [type3, setType3] = useState('')
  const [type4, setType4] = useState('')
  const [type5, setType5] = useState('')
  const [type6, setType6] =useState('')
  const [type7, setType7] = useState('')
  const [type8, setType8] = useState('')
  const [type9, setType9] = useState('')  
  const[signedUp, setSignedUp] = useState(false)
  const pic="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/retreat1.jpg?alt=media&token=0c739aa7-357f-4422-b0ff-49d055754ecb"
  
  const closeModal = () => setIsModalOpen(false);
  const closePasswordModal =()=>setPasswordModal(false);
  const closePurposeModal =()=> setIsPurpose(false)
  const closePasswordLengthModal =()=> setPasswordLengthModal(false);
  useEffect(()=>{
      onAuthStateChanged(auth, async (user) => {
          if  (user) {
            console.log('User authstate is signed in with UID:', user.uid);
            console.log(user.email)
            setHostEmail(user.email)
            setHostId(user.uid)
          }
      })

  },[])
  const meditation=(e)=>{
    if(e.target.checked){
      setIsCheckedMeditationRetreat(true)
          setType1('Meditation')

    }
    else{
      setIsCheckedMeditationRetreat(false)
      setType1('None')
    }
  }
  const vegan=(e)=>{
    if(e.target.checked){
      setIsCheckedVeganRetreat(true)
      setType2('Vegan')
    }
    else{
      setIsCheckedVeganRetreat(false)
      setType2('None')
    }
  }
  const changedTerms=(e)=>{
    setIsCheckedTerms(!isCheckedTerms)
   
   
  }
   const corporate=(e)=>{
    if(e.target.checked){
      setIsCheckedCorporateRetreat(true)
      setType4('Corporate Retreate')
      console.log(type4)
    }
    else{
      setIsCheckedCorporateRetreat(false)
      setType4('Not Corporate Retreat')
      console.log(type4)
    }
  }
    const workout=(e)=>{
    if(e.target.checked){
          setType5('Workout Retreat')
          setIsCheckedWorkoutRetreat(true)
    }
    else{
      setType5('Not Workout Retreat')
      setIsCheckedWorkoutRetreat(false)
    }
  }
  const yoga =(e)=>{
    if(e.target.checked){
      setIsCheckedYogaRetreat(true)
      setType7('Yoga')
    }
    else{
      setIsCheckedYogaRetreat(false)
      setType7('Not Yoga Retreat')
    }
  }
  const recreation=(e)=>{
    if(e.target.checked){
      setIsCheckedRecreationRetreat(true)
      setType8('Recreation')
    }
    else{
      setIsCheckedRecreationRetreat(false)
      setType8('Not Recreation')
    }
  }
  const pay=()=>{
    setIsPayoutChecked(!isPayputChecked)  
  }
  const others=(e)=>{
    if(e.target.checked){
      setIsCheckedOthers(true)
          setType9('Others')
    }
    else{
      setIsCheckedOthers(false)
      setType9('Not others')
    }
  }
  const hiking=(e)=> {
    if(e.target.checked){
      setIsCheckedHikingRetreat(true)
      setType6('Hiking')
    }
    else{
      setIsCheckedHikingRetreat(false)
      setType6('Not Hiking')
    }
  }
  const cancel=()=>{
    setIsCheckedCancellation(!isCheckedCancellation)  
  }
    const sound=(e)=>{
      if(e.target.checked){ 
        setIsCheckedSoundHealing(true)
        setType3('Sound Healing')
      }
      else{
        setIsCheckedSoundHealing(false)
        setType3('Not Sound Healing')
      }
    
  }
  const create= async()=>{
      try{
         const emailQuery = query(collection(db, "hosts"), where("hostEmail", "==", hostEmail));
        const emailQuerySnapshot = await getDocs(emailQuery);
        const usernameQuery = query(collection(db, "hosts"), where("hostUsername", "==", username));
        const usernameQuerySnapshot = await getDocs(usernameQuery);

                
        if(emailQuerySnapshot.size > 0){
          alert("You already have an email address registered with us!")
          return;
        }
        else if(usernameQuerySnapshot.size > 0){
          alert("This username has been taken. Please try a new one")
          return;
        }

     
       else if(!isCheckedTerms || !isPayputChecked || !isCheckedCancellation){
          setOpenTermsModal(true);
          return;
        }
       
        else {
         
                 
                                await addDoc(collection(db, "hosts"), {
                                  hostId: hostId,
                                  hostFirstName: firstName,
                                  hostLastName: lastName,
                                  hostIntroduction: introduction,
                                  hostUsername: username,
                                  hostEmail: hostEmail,
                                  hostRetreatDetails: details,
                                  hostPhone: phone,
                                  type1:type1,
                                  type2:type2,
                                  type3:type3,
                                  type4:type4,
                                  type5:type5,
                                  type6:type6,
                                  type7:type7,
                                  type8:type8,
                                  type9:type9,
                                  payout:payout,
                                  cancellation:isCheckedCancellation,
                                  hostProfilePicUrl:"https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/avatar.jpg?alt=media&token=6a6c61e3-dcde-4170-bb9f-b1ecb1c69d40",
                                  createdAt: new Date()
                                }).then(()=>{
                                  setSignedUp(true)
                                  navigate(`/profile/${hostId}`)
                                  
                                             fetch('http://localhost:3000/send-admin-email', {
                                   method: 'POST',
                                  headers: {
                                  'Content-Type': 'application/json',

                     },
                              body:JSON.stringify({ name: "Admin", email: "samanja.cartagena@gmail.com", content: `A new host has just signed up with the name ${firstName} ${lastName} and email ${hostEmail}. Please review their profile and approve their hosting privileges. ` }), 
                              
               });            
                                   fetch('http://localhost:3000/send-email', {
                                   method: 'POST',
                                  headers: {
                                  'Content-Type': 'application/json',

                     },
                              body:JSON.stringify({ name: firstName, email: hostEmail, content: "Welcome to Retreats Around The World, a community for mindful retreats and travelling to recover from the stresses of daily life." }), 
                              
               });
                                })
                 
                           signInWithEmailAndPassword(auth, hostEmail, confirmPassword)
                  .then((userCredential)=>{
                     setIsModalOpen(true);

                    const user = userCredential.user;
                    console.log('User signed in:', user.uid); 
                    navigate(`/profile/${user.uid}`);
                    window.location.reload();

                  })  
                  .catch((error)=>{
                    console.error('Error creating user:', error);
                  });

        }
                  
      
      }
      
      catch(err){
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
        <Modal isOpen={signedUp} onClose={()=>setSignedUp(false)}>
        <div style={{width:'100%',}} className="justify-center items-center text-center p-4 bold text-lg">
                    <br/>

        <h1 className="mt-20">
                Congratulations on SigningUp!
                </h1>
                </div>
        </Modal>
      <Modal isOpen={passwordLengthModal} onClose={closePasswordLengthModal}>
          <div style={{width:'100%', position:'relative', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}} className="justify-center items-center text-center p-4 bold text-lg">
                Password must be at least 6 characters long, Password must contain letters and numbers!
            </div>
            </Modal>
            <Modal isOpen={openTermsModal} onClose={()=> setOpenTermsModal(false)}>
          <div style={{width:'100%', position:'relative', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}} className="justify-center items-center text-center p-4 bold text-lg">
                Please read the terms and conditions, payout policies, cancellation policies and check the boxes to agree before creating a profile!
            </div>
            </Modal>
        <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl sm:text-2xl md:pt-6 lg:text-6xl font-serif font-bold tracking-tight text-white mb-6">
                Transform A Mind with a Retreat.
              </h1>
              <Modal isOpen={terms} onClose={()=> setTerms(false)}>
          <div style={{width:'100%', position:'relative', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}} className="justify-center items-center text-center p-4 bold text-lg">
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
                This document outlines the partnership structure, the minimum of 15% commission fee, and the specific payout trigger (immediately following the cancellation date) as requested. It is styled with an aesthetic suitable for a spiritual healing and travel brand.
                <br/><br/>
                <strong>Partnership Structure:</strong><br/>
                Retreats Around The World (RATW) operates as a platform connecting hosts with guests seeking transformative retreat experiences. Hosts list their retreats on the RATW platform, and guests book directly through the site. RATW provides marketing, customer support, and payment processing services to facilitate these connections.
                <br/><br/>
                <button className="mt-4 px-4 py-2 bg-lime-700 hover:bg-lime-800 text-white rounded-md hover:bg-retreat-forest transition-colors" onClick={()=> window.open('https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/Retreats_Around_The_World_Terms.pdf?alt=media&token=90cd4e50-3d26-4b64-ad8d-40c9fcf8b1b2', '_blank')}>
                Open Terms and Conditions
              </button>

            </div>
            
              </Modal>
              <ModalCancellation isOpen={modalCancellationOpen} onClose={()=> setModalCancellationOpen(false)}>
                     <br/>
              <br/>
              <br/>
              <br/>
              <h2 className="text-xl font-semibold mb-4">Cancellation Policy</h2>
              <p className="text-sm text-muted-foreground">
               <strong>We understand that plans can change at the last minute. But we have to comply with our partners' policies.</strong><br/><br/>
<strong>Third-Party Alignment:</strong> Explicitly states that funds are held and managed according to the specific policies of the partnered hosts or retreat centers.
<br/><br/>
<strong>Guest Responsibility:</strong> Clarifies that guests are responsible for reviewing individual host terms before booking.
<br/><br/>
<strong>Financial Protection:</strong> Includes a strong recommendation for travel insurance to cover potential losses due to partner-specific cancellation windows.

              </p>
              <button className="mt-4 px-4 py-2 bg-lime-700 hover:bg-lime-800 text-white rounded-md hover:bg-retreat-forest transition-colors" onClick={()=> window.open('https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/Cancellation_Policy_Retreats_Around_The_World.pdf?alt=media&token=68caf53d-b471-4bd2-acaa-3bf620a37f63', '_blank')}>
                Open Policies
              </button>
              </ModalCancellation>
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
                <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={()=> setTerms(true)}>
                 Terms and Conditions
                </Button>
                <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={()=>setModalCancellationOpen(true)}>
                 Cancellation Policy
                </Button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
   
        <div className="justify-center items-center grid h-auto">
          <h1 className='font-bold m-4 text-xl'>Create a host Profile</h1>
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
        Phone Number
      </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="Phone Number" onChange={(e)=> setPhone(e.target.value)} />
     <br/><br/>
    <div className="mb-6">
     
       <label className="block text-gray-700 text-sm font-bold mb-2" >
       What kind of retreats will you be hosting? Check all that apply.</label>
      <br/>
      <input type="checkbox" id="veganretreat" checked={isCheckedVeganRetreat} onChange={vegan}/>
      <label >&nbsp;Vegan Retreat</label>
      <br/>
      <input type="checkbox" id="soundhealing" checked={isCheckedSoundHealing} onChange={sound}/>
      <label  >&nbsp;Sound Healing</label>
      <br/>
      <input type="checkbox" id="meditationretreat" checked={isCheckedMeditationRetreat} onChange={meditation}/>
      <label >&nbsp;Meditation Retreat</label><br/>
      <input type="checkbox" id="corporateretreat" checked={isCheckedCorporateRetreat} onChange={corporate}/>
      <label >&nbsp;Corporate Retreat</label><br/>
      <input type="checkbox" id="workout" checked={isCheckedWorkoutRetreat} onChange={workout}/>
      
      <label >&nbsp;Workout Retreat</label>
      <br/>
         <input type="checkbox" id="yogaretreat" checked={isCheckedYogaRetreat} onChange={yoga}/>
      
      <label >&nbsp;Yoga Retreat</label>
      <br/>
       <input type="checkbox" id="hikingretreat" checked={isCheckedHikingRetreat} onChange={hiking}/>
      
      <label >&nbsp;Hiking Retreat</label>
      <br/>
        <input type="checkbox" id="recreationretreat" checked={isCheckedRecreationRetreat} onChange={recreation}/>
      
      <label>&nbsp;Recreation Retreat</label>
      <br/>
      <input type="checkbox" id="others" checked={isCheckedOthers} onChange={others}/>
            <label >&nbsp;Others</label>
            <br/>
            <br/>
                   <label className="block text-gray-700 text-sm font-bold mb-2" >
            What kind of Retreats will you be hosting in details?...</label>
                   <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="details" placeholder="Tell us in details what kind of retreats you would love to host....." onChange={(e)=> setDetails(e.target.value)}></textarea>
       </div>

    </div>
             <input type="checkbox" id="terms"  checked={isCheckedTerms} onChange={changedTerms} />

     <label >&nbsp;By checking this box, I agree to the Terms and Conditions</label><br/>
              <input type="checkbox" id="payout"  checked={isPayputChecked} onChange={pay} />

     <label >&nbsp;By checking this box, I agree to the Payout Terms</label><br/>
              <input type="checkbox" id="cancel" checked={isCheckedCancellation} onChange={cancel} />

     <label >&nbsp;By checking this box, I agree to the Cancellation Policies</label><br/><br/>
      
      
    <div className="flex items-center justify-between">
      <button className="bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={create}>
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