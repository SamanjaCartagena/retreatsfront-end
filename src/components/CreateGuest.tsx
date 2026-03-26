import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {auth} from '../firebase.js';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase.js';
import { createUserWithEmailAndPassword,signInWithPopup, signOut } from 'firebase/auth'
import {useState} from 'react';
import ModalHost from './ModalHost.js'

export default function CreateGuest() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] =useState('')
  const [kind, setKind] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pic="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/sahara-erg-chebbi.jpg?alt=media&token=f7fccad4-349b-46a8-a906-e12e156f9c06"

  const closeModal=()=>{
    setIsModalOpen(false)
  }
     const create= async()=>{
          try{
            if(password===confirmPassword){
                      await createUserWithEmailAndPassword(auth,email,confirmPassword)
                      .then((userCredential)=>{
                        const user = userCredential.user;
                        console.log('User created:', user.uid);
                                      addDoc(collection(db, "guests"), {
                                      id: user.uid,
                                      firstName: firstName,
                                      lastName: lastName,
                                      username: username,
                                      email: email,
                                      kind:kind,
                                      createdAt: new Date()
                                    });
                      })
                      .catch((error)=>{
                        console.error('Error creating user:', error);
                      });
                      
                      setIsModalOpen(true);
    
            }
            else{
            }
            }catch(err){
                console.error(err)
            }
          }
  return (
    <div className="relative h-[80vh] min-h-[1000px] w-full overflow-hidden">
   
    <div className="justify-center  grid h-screen absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pic})` }} >
      
      <div className="w-full max-w-xs items-center justify-center"></div>
     <form className="bg-white shadow-md rounded px-8 pt-6 pb-8  mt-4">
            <h2 className='justify-center items-center text-center p-4 bold text-lg'>Sign up as a Guest</h2>
                <ModalHost isOpen={isModalOpen} onClose={closeModal}>
          <div style={{width:'100%',}}>
                Congratulations on Creating a profile
            </div>
            </ModalHost>
             <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        First Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)}/>
    </div>
         <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Last Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}/>
    </div>
 <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Username
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
    </div>
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
       <label className="block text-gray-700 text-sm font-bold mb-2" >
        Confirm Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e)=> setConfirmPassword(e.target.value)}/>
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
      <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        What kind of retreat are you looking for?
      </label>
      <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setKind(e.target.value)}></textarea>

    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={create}>
        Sign Up
      </button>
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
     
      </div>
    
      <br/>
       <h2 className="inline-block align-baseline font-bold text-decoration-line text-md cursor-pointer text-blue-500 hover:text-blue-800" >
        Sign in
      </h2>
  </form>
    



                                    




            

    </div>
    </div>

  )
}
