import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from './ui/textarea';


export default function CreateGuest() {
    const pic="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/oak.jpg?alt=media&token=164a6058-2456-475e-9056-8ab99689599b"
  return (
    <div className="relative h-[80vh] min-h-[1000px] w-full overflow-hidden">
   
    <div className="justify-center  grid h-screen absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pic})` }} >
      
      <div className="w-full max-w-xs items-center justify-center"></div>
     <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className='justify-center items-center text-center p-4 bold text-lg'>Sign up as a Guest</h2>

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
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >
        Sign In
      </button>
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
     
      </div>
      <br/>
       <h2 className="inline-block align-baseline font-bold text-decoration-line text-md cursor-pointer text-blue-500 hover:text-blue-800" >
        Create a Profile
      </h2>
  </form>
    



                                    




            

    </div>
    </div>

  )
}
