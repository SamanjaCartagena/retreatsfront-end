import React from 'react'
import {Link} from 'react-router-dom';

export default function Guest() {
  return (
        <div className="relative h-[80vh] min-h-[1000px] w-full overflow-hidden">

     <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/yoga.jpg?alt=media&token=a7bcfff1-b58c-4c43-bd76-1de74dab9366)` }}
      >
    <div className="justify-center items-center grid h-screen" >
      
      <div className="w-full max-w-xs items-center justify-center">
        
      
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className='justify-center items-center text-center p-4 bold text-lg'>Sign in as a Guest</h2>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
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
      <Link to="/createguest">
       <h2 className="inline-block align-baseline font-bold text-decoration-line text-md cursor-pointer text-blue-500 hover:text-blue-800" >
        Create a Profile
      </h2>
      </Link>
  </form>
    

  <p className="text-center text-gray-500 text-xs">
    &copy;2025 World of Bots LLC. All rights reserved.
  </p>
</div>    
</div>
    </div>
    </div>
  )
}
